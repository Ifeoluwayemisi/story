// CORS handling for /api/contact (docs/environment.md, ADR-002).
// The browser blocks a cross-origin form POST unless the backend answers the
// preflight and returns Access-Control-* headers. Origins are allow-listed so
// any other web origin is answered without CORS headers — its browser then
// refuses the request, which is what we want for a public contact endpoint.

export const DEFAULT_ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001"] as const;

// Comma-separated CORS_ALLOWED_ORIGINS overrides the localhost dev defaults;
// production sets this to the real frontend origin(s), e.g.
// https://portfolio.example.com.
export function resolveAllowedOrigins(env: NodeJS.ProcessEnv = process.env): string[] {
  const raw = env.CORS_ALLOWED_ORIGINS;
  if (!raw) return [...DEFAULT_ALLOWED_ORIGINS];
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function normalize(origin: string): string {
  return origin.trim().toLowerCase().replace(/\/+$/, "");
}

export function isOriginAllowed(origin: string, allowed: string[]): boolean {
  const needle = normalize(origin);
  return allowed.some((entry) => normalize(entry) === needle);
}

export function corsHeadersFor(
  req: { headers: { origin?: string | string[] | undefined } },
  allowed: string[],
): Record<string, string> | null {
  const origin = req.headers.origin;
  if (typeof origin !== "string" || origin.length === 0) return null;
  if (!isOriginAllowed(origin, allowed)) return null;
  return { "access-control-allow-origin": origin, vary: "Origin" };
}

export const CORS_PREFLIGHT_HEADERS = {
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "7200",
} as const;
