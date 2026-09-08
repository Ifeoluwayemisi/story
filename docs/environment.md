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
- Supplied and validated by Racheal during Phase 0 content sign-off. Never
  invented or hardcoded by developers.
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
5. No real credentials, phone numbers, or personal contact details ever appear in
   this repository.

## Backend variables

Read from the backend process environment at runtime. Backend: `backend/`.

| Variable | Purpose | Required | Dev / Prod | Secret? | Example | Consumed | Deploy config |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `PORT` | HTTP port the server listens on | Optional (default `3001`) | Dev: default ok. Prod: set only if the platform does not inject it | No | `3001` | `backend/src/server.ts` | Set if your host does not provide its own port |
| `BREVO_API_KEY` | Brevo API key authorizing contact-email delivery (ADR-004) | Required in production; contact disabled without it | Dev: real key or omit (contact off). Prod: required | **Yes** | `xkeysib-xxxxxxxxxxxx` | `backend` ContactDelivery/Brevo adapter (Phase 8) | Must be injected at deploy (secret store); never a repo value |
| `CONTACT_FROM_EMAIL` | Sender address; must be a verified Brevo sender | Required to send | Dev: Brevo sandbox sender. Prod: verified-sender address | Not a secret (appears in outgoing mail), but server-side config | `hello@example.com` | same Brevo adapter (Phase 8) | Set at deploy |
| `CONTACT_FROM_NAME` | Sender display name on outgoing contact email | Optional, recommended | Dev / Prod | No | `Your Name` | same Brevo adapter (Phase 8) | Optional |
| `CONTACT_TO_EMAIL` | Delivery target — Racheal's inbox | Required to send | Dev / Prod | Personal (private), keep server-side | `you@example.com` | same Brevo adapter (Phase 8) | Set at deploy; real value from Racheal Phase 0 |
| `CONTACT_RATE_LIMIT_*` | Optional rate-limit tuning for the contact endpoint (ADR-002/004) | Optional, deferred to Phase 8 | Dev / Prod | No | n/a (decide at implementation) | `backend` contact router (Phase 8) | Optional |

## Frontend variables

Read at build time (any `NEXT_PUBLIC_` is inlined into the bundle).

| Variable | Purpose | Required | Dev / Prod | Secret? | Example | Consumed | Deploy config |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_API_URL` | Base URL of the backend contact endpoint used by the contact form | Required when the form is live (Phase 8) | Dev: `http://localhost:3001`. Prod: deployed backend URL, set at build | No — public configuration | `http://localhost:3001` | `frontend` contact form (Phase 8) | Set in frontend hosting env at build/deploy |

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
| `NEXT_PUBLIC_CONTACT_API_URL` | `frontend` contact form (Phase 8) |
| WhatsApp number | `frontend` site-content/config (Phase 4+), rendered in contact CTA |

## Required-by-environment matrix

| Variable | Local dev | Production |
| --- | --- | --- |
| `PORT` | optional (default `3001`) | optional (host-injected or set) |
| `BREVO_API_KEY` | optional (contact off without it) | required |
| `CONTACT_FROM_EMAIL` | optional | required |
| `CONTACT_FROM_NAME` | optional | optional |
| `CONTACT_TO_EMAIL` | optional | required |
| `NEXT_PUBLIC_CONTACT_API_URL` | recommended (`http://localhost:3001`) | required at build |

## Repository `.env.example` files

Committed templates with harmless placeholders only (no real values); the running
environment is git-ignored:

- `backend/.env.example` → copy to `backend/.env` locally.
- `frontend/.env.example` → copy to `frontend/.env.local` locally.

Production values are injected by the deployment platform (see Phase 13).