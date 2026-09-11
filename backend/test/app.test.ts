import assert from "node:assert/strict";
import { once } from "node:events";
import type { AddressInfo, Server } from "node:net";
import { test } from "node:test";
import { createAppServer } from "../src/app.ts";
import { resolveAllowedOrigins } from "../src/contact/cors.ts";
import { createContactServices } from "../src/contact/handler.ts";
import { SlidingWindowRateLimiter } from "../src/contact/rate-limit.ts";
import type { ContactDelivery, ContactMessage } from "../src/contact/delivery.ts";
import { silentLogger } from "../src/log.ts";

interface BootResult {
  baseUrl: string;
  server: Server;
}

async function bootServer(
  t: { after: (fn: () => void) => void },
  delivery: ContactDelivery,
  rateLimiter?: SlidingWindowRateLimiter,
  allowedOrigins?: string[],
): Promise<BootResult> {
  const services = createContactServices({ delivery, logger: silentLogger, rateLimiter });
  const server = createAppServer({ services, ...(allowedOrigins ? { allowedOrigins } : {}) });
  server.listen(0);
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  await once(server, "listening");
  const address = server.address() as AddressInfo;
  return { baseUrl: `http://127.0.0.1:${address.port}`, server };
}

function recordingDelivery() {
  const sent: ContactMessage[] = [];
  const delivery: ContactDelivery = {
    name: "stub",
    send: async (message) => {
      sent.push(message);
      return { ok: true };
    },
  };
  return { delivery, sent };
}

function failingDelivery(kind: "provider" | "config") {
  const delivery: ContactDelivery = {
    name: "stub-fail",
    send: async () => ({ ok: false, kind }),
  };
  return { delivery };
}

const validPayload = {
  context: "role",
  name: "Amina Lawal",
  email: "amina@example.com",
  message: "Hello, I would like to discuss a backend role with you.",
};

async function postJson(
  baseUrl: string,
  path: string,
  body: unknown,
  options: { contentType?: string; rawBody?: string } = {},
): Promise<Response> {
  const contentType = options.contentType ?? "application/json";
  const raw = options.rawBody ?? JSON.stringify(body);
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": contentType },
    body: raw,
  });
}

test("GET /health returns 200 with status ok", async (t) => {
  const server = createAppServer();
  server.listen(0);
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  await once(server, "listening");
  const address = server.address() as AddressInfo;
  const response = await fetch(`http://127.0.0.1:${address.port}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("POST /api/contact accepts a valid role submission and delivers it", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });

  assert.equal(sent.length, 1);
  const delivered = sent[0];
  assert.ok(delivered);
  assert.equal(delivered.context, "role");
  assert.equal(delivered.name, "Amina Lawal");
  assert.equal(delivered.email, "amina@example.com");
  assert.equal(delivered.message, "Hello, I would like to discuss a backend role with you.");
});

test("POST /api/contact accepts the build path and trims input", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", {
    context: "build",
    name: "  Kola Ade  ",
    email: " kola@example.com ",
    message: "  Let us build a product together.  ",
  });

  assert.equal(response.status, 200);
  const delivered = sent[0];
  assert.ok(delivered);
  assert.equal(delivered.context, "build");
  assert.equal(delivered.name, "Kola Ade");
  assert.equal(delivered.email, "kola@example.com");
  assert.equal(delivered.message, "Let us build a product together.");
});

test("POST /api/contact rejects a missing name", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", { ...validPayload, name: "   " });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: string; fields: Record<string, string> };
  assert.equal(body.error, "validation");
  assert.equal(body.fields["name"], "required");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects a malformed email", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", {
    ...validPayload,
    email: "not-an-email",
  });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { fields: Record<string, string> };
  assert.equal(body.fields["email"], "invalid");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects an invalid context value", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", {
    ...validPayload,
    context: "spam-newsletter",
  });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { fields: Record<string, string> };
  assert.equal(body.fields["context"], "required");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects an oversized message", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", {
    ...validPayload,
    message: "x".repeat(2500),
  });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { fields: Record<string, string> };
  assert.equal(body.fields["message"], "too_long");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects a too-short message (content sanity)", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", { ...validPayload, message: "Hi" });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { fields: Record<string, string> };
  assert.equal(body.fields["message"], "too_short");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects non-string field types", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", { ...validPayload, name: 42 });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { fields: Record<string, string> };
  assert.equal(body.fields["name"], "required");
  assert.equal(sent.length, 0);
});

test("POST /api/contact short-circuits a filled honeypot without delivery", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", {
    ...validPayload,
    website: "http://spam.example",
  });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: string };
  // Generic shape only — never hints that a bot trap was triggered.
  assert.equal(body.error, "validation");
  assert.equal(sent.length, 0);
});

test("POST /api/contact rate-limits beyond the per-client window", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const rateLimiter = new SlidingWindowRateLimiter(60_000, 3);
  const { baseUrl } = await bootServer(t, delivery, rateLimiter);

  const statuses: number[] = [];
  for (let i = 0; i < 4; i += 1) {
    const response = await postJson(baseUrl, "/api/contact", validPayload);
    statuses.push(response.status);
    if (response.status === 429) {
      const body = (await response.json()) as { retryAfterSeconds: number };
      assert.ok(body.retryAfterSeconds >= 1);
      assert.equal(response.headers.get("retry-after"), String(body.retryAfterSeconds));
    }
  }

  assert.deepEqual(statuses, [200, 200, 200, 429]);
  assert.equal(sent.length, 3);
});

test("POST /api/contact returns a safe response when delivery fails and stays alive", async (t) => {
  const { delivery } = failingDelivery("provider");
  const { baseUrl, server } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload);
  assert.equal(response.status, 502);
  const body = (await response.json()) as { error: string };
  assert.equal(body.error, "delivery_failed");
  assert.ok(!JSON.stringify(body).toLowerCase().includes("brevo"), "no provider internals leak");

  const health = await fetch(`${baseUrl}/health`);
  assert.equal(health.status, 200);
  assert.ok(server.listening, "server remains alive after delivery failure");
});

test("POST /api/contact fails closed with 503 when delivery config is missing", async (t) => {
  const { delivery } = failingDelivery("config");
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload);
  assert.equal(response.status, 503);
  const body = (await response.json()) as { error: string };
  assert.equal(body.error, "service_unavailable");
});

test("POST /api/contact rejects non-POST methods with 405", async (t) => {
  const { delivery } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await fetch(`${baseUrl}/api/contact`, { method: "GET" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
});

test("POST /api/contact rejects non-JSON content types", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload, {
    contentType: "text/plain",
    rawBody: "name=foo&email=bar",
  });
  assert.equal(response.status, 415);
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects oversized request bodies", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload, {
    rawBody: JSON.stringify({ message: "x".repeat(20_000) }),
  });
  assert.equal(response.status, 413);
  assert.equal(sent.length, 0);
});

test("POST /api/contact rejects malformed JSON", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery);

  const response = await postJson(baseUrl, "/api/contact", validPayload, { rawBody: "{ not json" });
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: string };
  assert.equal(body.error, "invalid_json");
  assert.equal(sent.length, 0);
});

test("unknown routes still 404", async (t) => {
  const { baseUrl } = await bootServer(t, recordingDelivery().delivery);
  const response = await fetch(`${baseUrl}/nope`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "not found" });
});

test("CORS preflight for an allow-listed origin returns 204 with CORS headers", async (t) => {
  const { baseUrl } = await bootServer(t, recordingDelivery().delivery, undefined, [
    "http://localhost:3001",
  ]);
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "OPTIONS",
    headers: {
      origin: "http://localhost:3001",
      "access-control-request-method": "POST",
      "access-control-request-headers": "content-type",
    },
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:3001");
  assert.equal(response.headers.get("access-control-allow-methods"), "POST, OPTIONS");
  assert.equal(response.headers.get("access-control-allow-headers"), "content-type");
  assert.ok(response.headers.get("access-control-max-age"));
});

test("CORS preflight for a disallowed origin falls through to 405 without ACAO", async (t) => {
  const { baseUrl } = await bootServer(t, recordingDelivery().delivery, undefined, [
    "http://localhost:3001",
  ]);
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "OPTIONS",
    headers: { origin: "http://evil.example" },
  });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
});

test("allow-listed cross-origin POST succeeds and returns ACAO", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery, undefined, ["http://localhost:3001"]);
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost:3001" },
    body: JSON.stringify(validPayload),
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:3001");
  assert.equal(sent.length, 1);
});

test("disallowed origin is processed but never exposed CORS headers", async (t) => {
  const { delivery, sent } = recordingDelivery();
  const { baseUrl } = await bootServer(t, delivery, undefined, ["http://localhost:3001"]);
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://evil.example" },
    body: JSON.stringify(validPayload),
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(sent.length, 1);
});

test("cors helper: env CORS_ALLOWED_ORIGINS overrides localhost defaults", () => {
  const env = {
    CORS_ALLOWED_ORIGINS: "https://portfolio.example.com,  https://staging.example.com ",
  } as NodeJS.ProcessEnv;
  assert.deepEqual(resolveAllowedOrigins(env), [
    "https://portfolio.example.com",
    "https://staging.example.com",
  ]);
});
