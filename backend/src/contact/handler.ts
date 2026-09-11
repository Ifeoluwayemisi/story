// POST /api/contact request handling (docs/requirements.md F3, ADR-002).
// Owns the full server-side flow: body size cap, content-type check, JSON
// parse, rate limiting, honeypot, validation, then delivery. Never leaks
// internals — every response is an explicit, safe JSON shape.

import { createHash } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { BrevoDelivery } from "./brevo.ts";
import type { ContactDelivery } from "./delivery.ts";
import { SlidingWindowRateLimiter } from "./rate-limit.ts";
import { isHoneypotFilled, validateContactPayload } from "./validate.ts";
import { createLogger, type Logger } from "../log.ts";
import type { LogFields } from "../log.ts";

// Body cap: a contact payload is a few KB; 16 KiB rejects oversized payloads.
export const CONTACT_MAX_BODY_BYTES = 16 * 1024;

export interface ContactServices {
  delivery: ContactDelivery;
  logger: Logger;
  rateLimiter: SlidingWindowRateLimiter;
}

export interface ContactServicesOverrides {
  delivery?: ContactDelivery;
  logger?: Logger;
  rateLimiter?: SlidingWindowRateLimiter;
}

export function createContactServices(overrides: ContactServicesOverrides = {}): ContactServices {
  const env = process.env;
  let delivery = overrides.delivery;
  if (!delivery) {
    delivery = new BrevoDelivery({
      apiKey: env.BREVO_API_KEY,
      fromEmail: env.CONTACT_FROM_EMAIL,
      fromName: env.CONTACT_FROM_NAME,
      toEmail: env.CONTACT_TO_EMAIL,
    });
  }
  return {
    delivery,
    logger: overrides.logger ?? createLogger(),
    rateLimiter: overrides.rateLimiter ?? new SlidingWindowRateLimiter(),
  };
}

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  extraHeaders?: Record<string, string>,
): void {
  const headers: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...extraHeaders,
  };
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

// Hard cap on how much we will drain from an oversized body before giving up.
// Keeps a hostile infinite stream from holding the connection, while letting a
// finite oversized request receive a proper 413 instead of a socket reset.
const DRAIN_CAP_BYTES = 1_048_576;

function readBody(req: IncomingMessage, limit: number): Promise<Buffer | "too_large"> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let size = 0;
    let oversize = false;
    let drained = 0;
    let settled = false;

    req.on("data", (chunk: Buffer) => {
      if (settled) return;
      if (oversize) {
        drained += chunk.length;
        if (drained > DRAIN_CAP_BYTES) {
          settled = true;
          resolve("too_large");
          req.destroy();
        }
        return;
      }
      size += chunk.length;
      if (size > limit) {
        oversize = true;
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (settled) return;
      settled = true;
      if (oversize) {
        resolve("too_large");
        return;
      }
      resolve(Buffer.concat(chunks));
    });

    req.on("error", () => {
      if (settled) return;
      settled = true;
      resolve(Buffer.alloc(0));
    });
  });
}

function clientKey(req: IncomingMessage): string {
  const raw = req.socket.remoteAddress ?? "unknown";
  return raw.startsWith("::ffff:") ? raw.slice(7) : raw;
}

// Truncated hash so logs carry an anonymous per-client identifier, not the raw IP.
function anonymizeIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function bodyIsJson(req: IncomingMessage): boolean {
  const contentType = req.headers["content-type"];
  return (
    typeof contentType === "string" &&
    contentType.trimStart().toLowerCase().startsWith("application/json")
  );
}

export async function handleContactRequest(
  req: IncomingMessage,
  res: ServerResponse,
  services: ContactServices,
  corsHeaders?: Record<string, string> | null,
): Promise<void> {
  const { delivery, logger, rateLimiter } = services;
  // Present for browser POSTs from an allow-listed frontend origin; set before
  // any sendJson so every response carries the CORS headers.
  if (corsHeaders) {
    for (const [name, value] of Object.entries(corsHeaders)) {
      res.setHeader(name, value);
    }
  }
  const ip = clientKey(req);
  const log = (event: string, fields?: LogFields) =>
    logger(event, { ipKey: anonymizeIp(ip), ...fields });

  // Content type must be JSON (a bot posting form-encoded never reaches logic).
  if (!bodyIsJson(req)) {
    log("contact.unsupported_content_type");
    sendJson(res, 415, { ok: false, error: "unsupported_media_type" });
    return;
  }

  const body = await readBody(req, CONTACT_MAX_BODY_BYTES);
  if (body === "too_large") {
    log("contact.body_too_large");
    sendJson(res, 413, { ok: false, error: "payload_too_large" });
    return;
  }

  let input: unknown;
  try {
    input = JSON.parse(body.toString("utf8"));
  } catch {
    log("contact.invalid_json");
    sendJson(res, 400, { ok: false, error: "invalid_json" });
    return;
  }

  // Rate limit before any further work: cheap, per-client, sliding window.
  const rate = rateLimiter.check(ip);
  if (!rate.allowed) {
    log("contact.rate_limited", { retryAfterSeconds: rate.retryAfterSeconds });
    sendJson(
      res,
      429,
      { ok: false, error: "rate_limit", retryAfterSeconds: rate.retryAfterSeconds },
      { "retry-after": String(rate.retryAfterSeconds) },
    );
    return;
  }

  if (isHoneypotFilled(input)) {
    log("contact.honeypot_rejected");
    sendJson(res, 400, { ok: false, error: "validation", fields: {} });
    return;
  }

  const result = validateContactPayload(input);
  if (!result.ok) {
    log("contact.validation_rejected", { fields: Object.keys(result.errors).join(",") });
    sendJson(res, 400, { ok: false, error: "validation", fields: result.errors });
    return;
  }

  try {
    const outcome = await delivery.send(result.data);
    if (outcome.ok) {
      log("contact.delivery_success", { delivery: delivery.name });
      sendJson(res, 200, { ok: true });
      return;
    }
    if (outcome.kind === "config") {
      log("contact.delivery_config_missing", { delivery: delivery.name });
      sendJson(res, 503, { ok: false, error: "service_unavailable" });
      return;
    }
    log("contact.delivery_failure", { delivery: delivery.name });
    sendJson(res, 502, { ok: false, error: "delivery_failed" });
  } catch {
    log("contact.delivery_unknown", { delivery: delivery.name });
    sendJson(res, 502, { ok: false, error: "delivery_failed" });
  }
}
