# Decision Log — Olayode Racheal Portfolio

> **Canonical decision record.** All planning documents reference this file (`docs/decisions.md`) for architecture decisions and the revival condition. Each decision is recorded in ADR style: context, problem, decision, alternatives considered, reasoning, consequences.
>
> If a future decision contradicts one recorded here, it must be recorded as a new, superseding ADR in this log — never silently edited into an old one.

| ADR | Title | Status |
|---|---|---|
| ADR-001 | Static-first portfolio architecture | Accepted |
| ADR-002 | Backend limited to contact functionality | Accepted |
| ADR-003 | No database / CMS / content API in v1 (+ revival condition) | Accepted |
| ADR-004 | Contact delivery via Resend (behind a delivery adapter) | Accepted |
| ADR-005 | WhatsApp direct contact path (frontend-only, secondary CTA) | Accepted |

---

## ADR-001 — Static-first portfolio architecture

**Date:** 2026-09 (planning phase)
**Status:** Accepted

### Context

The portfolio is a personal developer site: content-heavy (case studies, writing, profile) and read-mostly. Content is owned, edited, and published by one person (Racheal) using repo-first authoring. The site's goals are credibility, conversion, and maintainability — not interactive data products.

The previous planning audit set an anti-over-engineering principle: infrastructure must pay for itself; features answer *who benefits, why, and at what cost*.

### Problem

What is the right architecture for a portfolio that must be fast, accessible, strongly indexable, cheap to maintain, and easy for one person to update — without defaulting to a full-stack SPA or a headline infra stack "because it's a developer portfolio"?

### Decision

**V1 is static-first.**

- **Frontend:** Next.js + TypeScript (App Router), rendering static pages (static generation) from **MDX + structured repo data**.
- **Backend:** Node.js + TypeScript, limited to functionality that genuinely requires server-side processing — in v1, the validated contact endpoint (see ADR-002).
- Frontend and backend remain separated (per AGENTS.md), but the backend is deliberately small.
- No database, content API, CMS, or ingestion pipeline in v1 (see ADR-003).

### Alternatives considered

1. **Full-stack app with a content API and database** — rejected. Adds hosting, schema, migrations, auth, and operational burden for content that is static by nature. Violates "infrastructure must pay for itself."
2. **Pure static site generator (no backend at all)** — rejected as the *complete* answer only because the contact form requires server-side handling (secure delivery of form data without exposing keys to the frontend). Static hosting alone cannot do that safely.
3. **Client-side-only contact (mailto / form with keys in frontend)** — rejected on security; the approved architecture requires a validated backend endpoint (see `docs/requirements.md`).
4. **Headless CMS from day one** — rejected for v1; repo-first authoring is simpler and sufficient. Kept as the first revival path (ADR-003).

### Why static-first wins

- **Performance & SEO:** static rendering gives fast TTFB, reliable Core Web Vitals, and clean crawlability for free (see `docs/seo.md`).
- **Security:** the static site exposes no application secrets; the only server surface is the contact endpoint.
- **Availability:** the content site can be served from a CDN/static host; backend failure does not take down the site.
- **Maintainability:** content updates are file edits (MDX/data) — no admin UI, no migrations, no schema-versioning churn.
- **Cost & operational simplicity:** no database to manage, no auth, no content pipeline. Fits a one-editor personal portfolio.
- **Right-size:** the portfolio's primary job (demonstrate evidence, convert visitors) is fully served without a content service.

### Consequences

- Case-study and writing content lives as MDX + structured data files in the repo.
- Frontend renders statically at build time; interaction (theme toggle, contact form states) is client-side but posts to the backend.
- A future content service can be introduced **in front of the same schema** without a rewrite (see ADR-003).
- Build tooling (MDX processing, content typing) must be set up in the frontend, but stays dependency-light.

### What we deliberately are NOT building (v1)

- No content database.
- No full content API.
- No CMS / admin UI.
- No content ingestion pipeline.
- No server-side content serving.
- No feature built "just because it's possible on a dev portfolio."

---

## ADR-002 — Backend limited to contact functionality

**Date:** 2026-09 (planning phase)
**Status:** Accepted

### Context

The contact form is the site's primary conversion point (dual path: "I have a role" / "Let's build together"). A form that merely opens `mailto:` cannot deliver structured, validated, spam-mitigated, reliably routed messages without exposing delivery credentials to the browser.

### Why a backend is still justified

- Delivery requires a server (or trusted server-side service) to send mail / forward to a channel using credentials that **must not** reach the frontend.
- The frontend must remain a static artifact with zero secrets.
- Validation, rate limiting, and abuse handling must happen at a boundary the client cannot bypass.

### What the backend owns

Exactly one endpoint in v1: **`POST /api/contact`** (shape/route name decided at implementation).

It owns:
- **Validation** — re-validates all external input server-side (required fields, format — email, lengths, allowed values) independent of client-side checks; rejects malformed/oversized payloads explicitly.
- **Abuse protection** — rate limiting per client (sliding-window per IP, with consideration for shared-NAT false positives), a honeypot field, request size limits, and basic heuristics (e.g., min content sanity).
- **Explicit error handling** — structured success/failure responses; no internal error strings or stack traces leak to the client.
- **Delivery coordination** — forwards a sanitized, validated message to the delivery provider via the **delivery adapter** (interface in the backend; Resend implementation in v1 — see ADR-004), using server-side-only credentials.
- **Observability** — server-side logging of submissions (without storing message content longer than needed) to track spam rates and delivery failures.

### What the backend does NOT own

- It does **not** serve portfolio content (case studies, writing, profile) — that is static MDX/repo data rendered by the frontend.
- It does **not** operate a database — no stored inbox, no user records (see ADR-003).
- It does **not** run authentication or sessions.
- It does **not** expose any endpoints beyond the contact flow in v1 (minimal attack surface).

### Validation expectations

- All fields server-validated: name, email (format + reasonable length), message (bounded length), optional context/interest selector (must match an allowed set).
- Client shows friendly inline errors; server returns *its own* explicit, safe error codes/messages; never echoes raw internal exceptions.
- Cross-field/behavioral checks (honeypot, timing) applied without frustrating genuine visitors.

### Rate limiting / abuse protection

- Per-client rate limit (e.g., an IP/time-window cap with a documented ceiling chosen at implementation based on expected traffic) plus a honeypot field an automated bot will fill.
- Requests exceeding limits get an explicit, still-usable response (not an opaque failure).
- Failed-validation and blocked attempts are logged server-side for tuning; thresholds are not hardcoded client-visible values.

### Security expectations

- **No secrets in the frontend.** API keys, tokens, and credentials exist only as backend environment variables, injected at deploy time.
- HTTPS end-to-end; appropriate security headers configured.
- Output escaping for the forwarded message to prevent injection into the delivery channel.
- Minimal attack surface: a single endpoint, no unnecessary routes, dependencies kept current (`npm audit` clean).

### Deployment implications

- The backend is deployed separately from the static site (e.g., a small Node service or serverless function) with its own environment variables.
- The static site stays serving even if the backend is down; the contact form degrades with explicit user-facing messaging (no silent failure).
- Monitoring covers: submission volume, spam-blocked rate, delivery success/failure — to tune limits and catch breakage.
- No database or long-lived state required; the backend can be stateless.

---

## ADR-003 — No database / CMS / content API in v1 (+ revival condition)

**Date:** 2026-09 (planning phase)
**Status:** Accepted

### Context

Portfolio content is static, authored by one person, and rendered at build time. A database/CMS/content API adds hosting, state, schema management, auth/admin surface, and operational cost — none of which a read-mostly, one-editor personal site needs today.

### Decision

**No database, no CMS, no full content API, no ingestion pipeline in v1.** Content lives as **MDX + structured data files in the repository**, rendered statically (see ADR-001). A future content service must be introduced only when the **observable revival condition** below is met — and, when introduced, it should sit in front of the existing content schema so the change is a boundary migration, not a rewrite.

### Revival condition (concrete, measurable)

The decision to introduce persistent content infrastructure (headless CMS, database, or content API) is triggered when **one or more** of the following conditions holds **for a sustained period** — sustained meaning the condition is true for at least **two consecutive months**, or recurs in **three or more months within a rolling year**. A single spike (e.g., a one-off content push) does not trigger this.

**1. Content volume.** The repo maintains **≥ 12 live case studies** **or** **≥ 20 published writing posts**.

*Why:* at that volume, long MDX assets accumulate, schema drift and cross-linking churn grow, and the cost of front-matter/global-data changes starts to outweigh single-file authoring. Below it, repo-first remains clearly cheaper.

**2. Multiple editors.** Any person in addition to Racheal (not counting infrequent one-off PR contributions) regularly edits content — e.g., a writing collaborator or editor making **≥ 2 content edits per month** over the sustained window.

*Why:* with multiple authors, branching/merge friction and the need for review tooling begin to justify a content layer.

**3. Publishing workflow requirements git+CI cannot reasonably serve.** Any of: **scheduled publishing** (content must go live at a specific date/time unattended), **staged drafts with reviewer approval**, or an **editorial review queue** that pull-request review cannot sensibly reproduce.

*Why:* these are operational needs, not volume needs; they are directly observable and not satisfiable by repo-first publishing alone.

**4. Operational difficulty with repo-first publishing.** Content updates **routinely take more than 30 minutes each due to tooling/build friction** — defined as at least **3 occurrences in one quarter** — or a **content-only change requires a build longer than 10 minutes**.

*Why:* measures "content becomes operationally difficult to maintain in-repo" with a threshold tied to the editor's time, not vibes.

**5. Dynamic user/content requirements.** The site must **publicly present user-generated or programmatically written content** (comments, submissions, live feeds), require **per-visitor personalization or login**, or require an **admin UI to publish reliably from a phone/tablet while away from a computer** (observed need, e.g., authoring while traveling).

*Why:* these are genuine dynamic needs that static MDX cannot meet; each is an observable feature requirement.

**6. Meaningful persistent data.** The product itself must store data that persists across sessions and must be read back to function — beyond ephemeral contact submissions. Examples: a live "Now" feed driven from an app, dynamic public metrics, or an in-product inbox for contact conversations.

*Why:* "anything that requires a database" is real only when the data has to survive and be queried; a contact form's transient submissions do not qualify.

### Why these thresholds

- Every condition is **observable and measurable** (counts, time-based, feature-based) — no vague "when the portfolio grows."
- Each maps to a concrete operational state where the cost of repo-first authoring genuinely exceeds the cost of a content layer.
- A **sustained** requirement prevents overreacting to a single event.
- The conditions are **independent**: volume, collaborators, workflow, operational pain, and dynamism each justify revival on their own.

### What happens when the condition is met

1. **Re-evaluate, don't auto-migrate:** confirm the triggering condition still holds and that its cost is real.
2. **Prefer the least invasive boundary:** introduce a **repo-backed headless CMS** or content repository serving the **existing content schema** (see `docs/content-model.md`), keeping the frontend rendering pipeline intact.
3. **Introduce a database only if** the data is genuinely dynamic/relational (revival conditions 5–6); for static-ish content a CMS without a database is the first step.
4. Keep the change **behind the same schema** — the website (URLs, rendering, SEO) does not require a rewrite.

### Consequences

- Content stays portable: MDX/structured files can be imported into any future CMS.
- No migration debt is created in v1; the content model is the stable contract.
- The site remains trivial to host, secure, and fast.
- When revival triggers, the work is a boundary migration with defined data, not a rewrite.

---

## ADR-004 — Contact delivery via Resend (behind a delivery adapter)

**Date:** 2026-09 (planning phase)
**Status:** Accepted

### Context

The contact form (ADR-002) must deliver validated messages to Racheal's email. Delivery requires an email provider whose credentials never reach the frontend. The provider is a third-party dependency and may change; the application must not be coupled to it.

### Decision

- Use **Resend** as the email delivery provider for the contact form in v1.
- Introduce a **delivery adapter / interface** in the backend: the contact endpoint talks to a `ContactDelivery` interface; a **ResendDelivery** implementation is the only provider implementation in v1.
- **No database** is introduced for delivery (no message persistence).

### Delivery flow

```
POST /api/contact (validated input)
    → rate limit / honeypot checks
    → ContactDelivery.send(...)          (interface)
    → ResendDelivery (Resend API, env-only API key)
    → Racheal's inbox
```

### Required environment variables (server-side only)

| Variable | Purpose | Notes |
|---|---|---|
| `RESEND_API_KEY` | Resend API authentication | **Never** exposed to the frontend; injected at deploy |
| `CONTACT_FROM_EMAIL` | Sender address (Resend-verified domain) | Must be on a verified Resend sending domain / authorized sender |
| `CONTACT_FROM_NAME` | Sender display name (e.g., "Racheal Portfolio") | Optional but recommended |
| `CONTACT_TO_EMAIL` | Racheal's receiving inbox | The delivery target |

Optional, if set at implementation: `CONTACT_RATE_LIMIT_*` tuning values. No variable is hardcoded; **no placeholder credentials may ship** — the backend fails closed if required variables are absent at startup.

### Sender/domain verification requirements

- The `CONTACT_FROM_EMAIL` domain must be **verified in Resend** (DNS records confirmed by Racheal during Phase 8 / Phase 13 deployment).
- Until verified, test sends against a sandbox/test address; production sending is not enabled on unverified senders.
- Uses Resend's **from-address / recipient allow-list** behavior appropriately (single-person portfolio: one verified sender, one recipient).

### Failure handling

- Resend errors are **mapped, not leaked** — the endpoint returns an explicit, safe error to the visitor (no Stack traces, no provider error bodies, no secrets).
- Delivery outcome (sent / rejected / provider error) is **logged server-side** for monitoring; message body is not stored beyond the provider's own delivery lifecycle.
- Frontend shows a clear failure state with a direct-channel fallback (see ADR-005).

### Security considerations

- `RESEND_API_KEY` is an env var **server-side only**; never in frontend code, build output, or the repo.
- The adapter is the **only** outbound integration beyond the delivery provider; minimal attack surface maintained (single contact endpoint).
- Rate limiting + honeypot apply before any delivery call (ADR-002); provider calls happen only after input passes validation.
- Dependencies pinned and audited; HTTPS end-to-end.

### Consequences

- Swapping providers later means implementing a new `ContactDelivery` implementation — the endpoint, validation, and UX are unchanged.
- Resend account, domain verification, and API key are Phase 0 / Phase 8 operational inputs (Racheal supplies the key + verified domain; **no values are invented or committed**).
- No messages are persisted anywhere owned by us in v1.

---

## ADR-005 — WhatsApp direct contact path (frontend-only, secondary CTA)

**Date:** 2026-09 (planning phase)
**Status:** Accepted

### Context

Visitors may prefer a direct, immediate chat channel. A second contact channel — direct WhatsApp — gives a low-friction alternative without adding server surface. The portfolio therefore offers **two distinct contact paths**: the validated form (primary) and direct WhatsApp (secondary).

### Decision

- Add **WhatsApp as a secondary direct-contact path** via a deep link (`https://wa.me/<number>`), rendered as a "Chat on WhatsApp" / "Chat with me" link/button.
- **WhatsApp requires no backend** — it is a frontend-only deep link to a conversation with Racheal.
- Treat it as a **secondary CTA**, never a competing primary conversion path. No intrusive floating widget.
- The WhatsApp number is **real content from Racheal** (Phase 0 checklist — see `docs/content-model.md`). No placeholder may ship; the link is invalid until a verified number is supplied.

### UX / CTA hierarchy

- **Primary:** the validated contact form (role / build paths).
- **Secondary:** WhatsApp direct chat — placed in the Contact experience and **at least one other strategically appropriate location** (the site footer, with About as an alternative if approved).
- Copy: "Chat on WhatsApp" or "Chat with me" — clear, human, and truthful about being a chat channel.
- Button/link carries **accessible labeling** (e.g., `aria-label="Chat with me on WhatsApp"`) and an **external-app/link indication** where useful (icon + text; opening WhatsApp is an external-app action: `rel`/target handling chosen at implementation).
- Not a floating widget; never obscures content on any viewport.

### Prefilled message strategy (documented, not invented)

- If a prefilled message is used (optional), it goes through `https://wa.me/<number>?text=<encoded>` with a short, **generic, non-personal** opener (e.g., a topic descriptor), defined with Racheal's copy approval during Phase 0.
- Strategy: keep it short, generic, user-editable, and free of invented personal specifics — the visitor writes their own details.
- If no approved copy exists, ship the **plain deep link with no preview text** rather than invent one.

### Consequences

- Contact surfaces present two channels: form (primary, backend) and WhatsApp (secondary, No backend).
- Frontend contact config must hold the validated WhatsApp number (site config data — see `docs/content-model.md`); the number is published only once Racheal supplies it.
- No persistence, no backend involvement, no provider coupling for the WhatsApp path.

### Contact path summary (final)

```
Contact form:  Next.js → Node/TS backend → validation + honeypot/rate limiting → Resend adapter → email
Direct chat:   Next.js → WhatsApp deep link → direct conversation
```

No database. No CMS. No contact-message persistence unless a future architectural decision explicitly introduces it.

---

*Decision log maintained as the authoritative source for architecture decisions and the revival condition. Referenced as `docs/decisions.md` throughout the planning documents.*