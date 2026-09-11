# Environment Configuration Contract

Single source of truth for every environment variable in this project across local
development and production. Read this before adding, removing, or renaming any
environment variable.

Related decisions: `docs/decisions.md` (ADR-004 contact delivery via Brevo,
ADR-005 WhatsApp as content), `docs/content-model.md` (contact site-config),
`docs/implementation-plan.md` (deployment, Phase 13).

## Classification

Every value a developer might be tempted to put in an environment variable falls
into exactly one of three classes. They have different rules.

### Secrets

Credentials that grant access (API keys, passwords, tokens, private server
credentials). The Brevo API key (`BREVO_API_KEY`) is in this class; any future
private server credentials will be too.

Rules:

- Live on the backend only. Never shipped to, or readable from, the browser.
- Never prefixed with `NEXT_PUBLIC_` (that prefix is inlined into the browser bundle).
- Never committed to the repository. Injected at deploy time by the deployment
  platform (or held in git-ignored `.env` locally).

### Public configuration

Non-secret values the frontend genuinely needs at runtime/build time. `Portfolio`
currently has exactly one: the backend contact endpoint URL
(`NEXT_PUBLIC_CONTACT_API_URL`).

A value may only use the `NEXT_PUBLIC_` prefix if exposing it to the browser is
harmless by design. Never prefix a secret with `NEXT_PUBLIC_`.

### Personal content

Racheal's personal data intended to be displayed: WhatsApp number, public email,
social/profile links. These are neither secrets nor configuration.

Rules:

- Represented as content/config in the repository (`content-model.md` site-config),
  not as environment variables.
- Supplied and validated by Racheal (owner). Never invented or hardcoded by
  developers (the WhatsApp number was supplied during Phase 8).
- Sent to the browser because the design displays them; that is expected and safe,
  but the values must be real owner-provided data.
- A missing value simply means "don't render it" (e.g. no WhatsApp CTA).

## Global rules

1. Secrets stay server-side: the backend reads them from its own process
   environment at runtime; the frontend never sees them.
2. The frontend environment is limited to public configuration (class 2) only,
   and any `NEXT_PUBLIC_` variable must be non-secret.
3. `.env.example` files are committed and contain safe placeholders only. Real
   values exist only in git-ignored `.env`/`.env.local` or in the deployment
   platform's environment.
4. The backend fails closed on missing secrets: contact delivery is disabled with
   an explicit startup/request error until the required variables are present.
   The health endpoint does not require any env var beyond `PORT`.
5. No real credentials ever appear in this repository. Owner-approved personal
   content intended for display (WhatsApp number, public email, social/profile
   links) is site content in the repo per ADR-005; private contact details the
   design does not display stay server-side or out of the repo.

## Backend variables

Read from the backend process environment at runtime. Backend: `backend/`.

| Variable | Purpose | Required | Dev / Prod | Secret? | Example | Consumed | Deploy config |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `PORT` | HTTP port the server listens on | Optional (default `5010`) | Dev: default ok. Prod: set only if the platform does not inject it | No | `5010` | `backend/src/server.ts` | Set if your host does not provide its own port |
| `BREVO_API_KEY` | Brevo API key authorizing contact-email delivery (ADR-004) | Required in production; contact disabled without it | Dev: real key or omit (contact off). Prod: required | **Yes** | `xkeysib-xxxxxxxxxxxx` | `backend` ContactDelivery/Brevo adapter (Phase 8) | Must be injected at deploy (secret store); never a repo value |
| `CONTACT_FROM_EMAIL` | Sender address; must be a verified Brevo sender | Required to send | Dev: Brevo sandbox sender. Prod: verified-sender address | Not a secret (appears in outgoing mail), but server-side config | `hello@example.com` | same Brevo adapter (Phase 8) | Set at deploy |
| `CONTACT_FROM_NAME` | Sender display name on outgoing contact email | Optional, recommended | Dev / Prod | No | `Your Name` | same Brevo adapter (Phase 8) | Optional |
| `CONTACT_TO_EMAIL` | Delivery target — Racheal's inbox | Required to send | Dev / Prod | Personal (private), keep server-side | `you@example.com` | same Brevo adapter (Phase 8) | Set at deploy; real value from Racheal Phase 0 |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of frontend origins allowed to POST `/api/contact` (browser CORS allow-list) | Optional — defaults to localhost dev origins; set in production | Dev: default ok. Prod: required so the deployed frontend can post | No — public configuration | `https://portfolio.example.com` | `backend` contact CORS (`src/contact/cors.ts`) | Set at deploy to the real frontend origin(s) |

Rate-limit settings for the contact endpoint are **compile-time constants, not
environment variables** (ADR-004): window 60 s, max 10 requests / IP, max 10,000
tracked IPs with periodic sweep, defined in `backend/src/contact/rate-limit.ts`.
No `CONTACT_RATE_LIMIT_*` env var exists or is planned; tuning means a code
change followed by redeploy.

## Frontend variables

Read at build time (any `NEXT_PUBLIC_` is inlined into the bundle).

| Variable | Purpose | Required | Dev / Prod | Secret? | Example | Consumed | Deploy config |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_API_URL` | Base URL of the backend contact endpoint used by the contact form | Required when the form is live (Phase 8) | Dev: `http://localhost:5010`. Prod: deployed backend URL, set at build | No — public configuration | `http://localhost:5010` | `frontend` contact form (Phase 8) | Set in frontend hosting env at build/deploy |

## WhatsApp number & other personal content — decision

**The WhatsApp number is site content, not an environment variable and not a
secret.**

Rationale:

- It is a piece of personal content (a phone number the design renders as a
  clickable CTA), so it lives in the content layer — `whatsapp.number`,
  `whatsapp.ctaLabel`, `whatsapp.prefilledText` in the contact site-config data
  (`docs/content-model.md`), consistent with ADR-005.
- Env vars are for machine configuration; a displayed phone number is not machine
  configuration. Keeping it in content lets it be validated, audited, and edited
  with the rest of the site content.
- It is not a secret — the browser must display it — but it must be
  owner-provided (Phase 0). An empty value means the CTA is not rendered.

The same applies to the public contact email and any social/profile links: content,
not env.

## Where each variable is consumed

| Variable | Consumer |
| --- | --- |
| `PORT` | `backend/src/server.ts` |
| `BREVO_API_KEY` | `backend` Brevo delivery adapter (Phase 8) |
| `CONTACT_FROM_EMAIL` | `backend` Brevo delivery adapter (Phase 8) |
| `CONTACT_FROM_NAME` | `backend` Brevo delivery adapter (Phase 8) |
| `CONTACT_TO_EMAIL` | `backend` Brevo delivery adapter (Phase 8) |
| `CORS_ALLOWED_ORIGINS` | `backend` contact CORS allow-list (`src/contact/cors.ts`) |
| `NEXT_PUBLIC_CONTACT_API_URL` | `frontend` contact form (Phase 8) |
| WhatsApp number | `frontend` site-content/config (Phase 4+), rendered in contact CTA |

## Requirements matrix

| Variable | Required | Default | Secret? | Consumed at |
| --- | --- | --- | --- | --- |
| `PORT` | No | `5010` | No | runtime, `backend/src/server.ts` |
| `BREVO_API_KEY` | Yes (for delivery; endpoint fails closed without it) | — | **Yes** | runtime, `backend/src/contact/brevo.ts` |
| `CONTACT_FROM_EMAIL` | Yes (to send) | — | No | runtime, `backend/src/contact/brevo.ts` |
| `CONTACT_FROM_NAME` | No | — | No | runtime, `backend/src/contact/brevo.ts` |
| `CONTACT_TO_EMAIL` | Yes (to send) | — | No | runtime, `backend/src/contact/brevo.ts` |
| `CORS_ALLOWED_ORIGINS` | No (`http://localhost:3000`, `http://localhost:3001` defaults) | `http://localhost:3000,http://localhost:3001` | No | request time, `backend/src/contact/cors.ts` |
| `NEXT_PUBLIC_CONTACT_API_URL` | Yes when the form is live | — | No | build time, `frontend` contact form |
| WhatsApp number + CTA | No (render CTA only when supplied) | — | No — personal content | content/config, `frontend/lib/contact-config.ts` |

See `docs/content-model.md` for the WhatsApp number and other personal content.

## Contact delivery status

- **After Phase 8:** code and integration are tested (backend test suite incl. a
  mocked Brevo adapter, 33 tests); the endpoint fails closed with `503`/`service_unavailable`
  when `BREVO_API_KEY`/`CONTACT_*_EMAIL` are absent.
- **Real delivery (Phase 8 follow-up):** a live send via the real Brevo API key
  returned `{"ok":true}` in a local production smoke (owner-supplied credentials
  in `backend/.env`). Delivery must be re-confirmed once the site is deployed
  with the production `CONTACT_FROM_EMAIL` verified sender.

## Repository `.env.example` files

Committed templates with harmless placeholders only (no real values); the running
environment is git-ignored:

- `backend/.env.example` → copy to `backend/.env` locally.
- `frontend/.env.example` → copy to `frontend/.env.local` locally.

Production values are injected by the deployment platform (see Phase 13).