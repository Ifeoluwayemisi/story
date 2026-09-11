import { createServer } from "node:http";
import type { Server, ServerResponse } from "node:http";
import {
  createContactServices,
  handleContactRequest,
  type ContactServices,
} from "./contact/handler.ts";
import { CORS_PREFLIGHT_HEADERS, corsHeadersFor, resolveAllowedOrigins } from "./contact/cors.ts";

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  extraHeaders?: Record<string, string>,
): void {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...extraHeaders,
  });
  res.end(JSON.stringify(body));
}

export interface AppDeps {
  /** Injectable contact services (tests pass mocks; production uses defaults). */
  services?: ContactServices;
  /** CORS allow-list; defaults to localhost dev ports or env CORS_ALLOWED_ORIGINS. */
  allowedOrigins?: string[];
}

export function createAppServer(deps: AppDeps = {}): Server {
  const services = deps.services ?? createContactServices();
  const allowedOrigins = deps.allowedOrigins ?? resolveAllowedOrigins(process.env);

  return createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");

    if (url.pathname === "/api/contact") {
      const cors = corsHeadersFor(req, allowedOrigins);

      // CORS preflight: answer for allow-listed browsers only.
      if (req.method === "OPTIONS" && cors) {
        res.writeHead(204, {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "no-store",
          ...cors,
          ...CORS_PREFLIGHT_HEADERS,
        });
        res.end();
        return;
      }

      if (req.method !== "POST") {
        sendJson(res, 405, { ok: false, error: "method_not_allowed" }, { allow: "POST", ...cors });
        return;
      }
      void handleContactRequest(req, res, services, cors);
      return;
    }

    if (req.method === "GET" && url.pathname === "/health") {
      sendJson(res, 200, { status: "ok" });
      return;
    }

    sendJson(res, 404, { error: "not found" });
  });
}
