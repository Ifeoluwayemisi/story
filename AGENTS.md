# Racheal Portfolio — AI Development Instructions

## Project

This is Racheal's personal developer portfolio.

The portfolio is designed to communicate:
- technical ability
- product thinking
- engineering depth
- personality
- professional credibility

## Architecture

Frontend:
Next.js + TypeScript

Backend:
Node.js + TypeScript

The frontend and backend must remain separated.

## Planning First

Before implementing a feature:

1. Check the relevant documentation in /docs.
2. Follow the approved architecture.
3. Do not introduce new architecture without explaining the reason.
4. Do not add dependencies unnecessarily.

## Development Rules

- TypeScript must be used throughout the application.
- Prefer simple, maintainable solutions.
- Avoid unnecessary abstraction.
- Avoid duplicated logic.
- Keep components focused.
- Keep business logic out of UI components.
- Validate external input.
- Handle errors explicitly.
- Do not expose secrets to the frontend.

## Design Rules

The visual identity defined in:

docs/brand.md
docs/design-system.md

must be treated as authoritative.

Do not introduce random colors, fonts, animations, or UI patterns.

## API Rules

Backend business logic must remain in the backend.

The frontend communicates with the backend through defined API endpoints.

## Security

Never hardcode:
- API keys
- passwords
- database credentials
- tokens
- private environment variables

## Testing

After implementing a feature:

1. Run type checking.
2. Run linting.
3. Run relevant tests.
4. Verify the feature manually when appropriate.

## Change Management

Do not modify unrelated files.

Do not rewrite existing architecture without approval.

If a requirement conflicts with the architecture, stop and explain the conflict.

## Planning Status

Current status:

IMPLEMENTATION — PLANNING APPROVED

Planning is approved; implementation proceeds sequentially through `docs/implementation-plan.md`.

Progress:

- Phase 1 (project initialization) COMPLETE — frontend/ (Next.js 16) and backend/ (Node.js 22 native TS) scaffolded, both type-check/lint/build/test/format-green, CI at `.github/workflows/ci.yml`, environment-variable contract in `docs/environment.md` with `.env.example` templates (backend + frontend).
- Phase 2 (frontend foundation) COMPLETE — token layer + light/dark `data-theme` themes in `app/globals.css`, fonts (Fraunces/Karla/IBM Plex Mono), skip-link/header/footer shell with sticky nav + theme toggle, primitives (button, inline/external link, tag), dev-gated homepage stub, metadata. All format/lint/typecheck/build checks green; production SSR smoke-tested.
- Phase 3 (design system implementation) COMPLETE — v1 component library built from tokens: shared icon set + `lib/navigation`; primitives upgraded (button states/loading, link, tag with href); root navigation (sticky header with inline nav + theme toggle + `nav-js` progressive-enhancement menu button); accessible mobile-nav dialog sheet (focus trap, Esc, scroll lock, no-JS fallback per `docs/ux.md`); form primitives (field/label/input/textarea/select with context-wired ids, error/hint announcement, `--control-fill` token); ui components (badge, project card, metrics, alerts via `color-mix` tints from status tokens, chapter marker, code block, prose); dev-gated component review surface at `/components` (404 in production). All format/lint/typecheck/build checks green; production SSR smoke-tested (landmarks + nav shell present, dev surface properly 404s).
- Phase 4 (component refinements pass) COMPLETE — token audit against `docs/design-system.md` §2 (all values 1:1, drift-free); contrast verification of 23 token pairs × both themes against WCAG AA (one real fix found + applied: dark-theme `--interactive` text @2.56:1 → hover-text/border switched to `--link`, value-identical in the light theme so §6 spec unchanged); global `:focus-visible` ring (2px, `--interactive`/`--link`, offset 2px) confirmed in place across all interactives; `prefers-reduced-motion` collapse exists; added print stylesheet (monochrome fidelity per `docs/brand.md` §8, interactive chrome hidden, black-on-white, hairline rules). All format/lint/typecheck/build checks green; production SSR smoke-tested (landmarks intact, `/components` still 404).
- Phase 5 (homepage) COMPLETE — built the real homepage from the authoritative Portfolio Content Source of Truth: new `lib/home-content.ts` (typed, real-only data), `ButtonLink` primitive (shares exported button classes with `<Button>` so they cannot drift), `ui/section-heading.tsx` (ChapterMarker label + h2 + description/aside), `ProjectCard` no longer renders an empty placeholder frame without an image, and `app/page.tsx` rewritten (Hero with recruiter-facts specimen → Selected Work → Now band → restrained Evidence grid → About preview incl. B.NSc. UNILAG line → Writing teaser [verbatim Medium article] → Contact CTA; static page metadata added). Footer dev-placeholder replaced with real email + "Remote & hybrid · Lagos / Ogun State". Follow-up: owner supplied project imagery (`frontend/public/projects/{sabiget,alafia,lumora}.png`, 16:9 native) and approved adding Lumora as a 4th Selected Work card (GESP/UNICEF recognition; description kept to verifiable claims, no tags yet); Selected Work is now SabiGet, Alafia, Lumora, MyGuestly AI (image-less) in a 2-col grid. All format/lint/typecheck/build checks green; production SSR smoke-tested (200, no dev placeholder, 3 `<img>` tags + alts, PNGs served 200 image/png; `/components` and `/work/lumora` 404). Known limitations for the report: inline home links to `/work`, `/about`, `/writing`, `/contact` and project-card hrefs to `/work/<slug>` route to pages built in Phases 6–8 (404 until then); no MyGuestly AI imagery yet; Lumora also appears in the Evidence strip (duplication — trim later if owner prefers); WhatsApp omitted (no number approved).
- Phase 6 (work & case studies) COMPLETE — `/work` index (editorial 2-col card grid, reuses homepage project data) + `/work/[slug]` case-study template with `generateStaticParams` (SabiGet, Alafia, Lumora, MyGuestly AI all SSG'd): header block (Back to Work link, title, summary, role, tags, imagery when supplied), the 10-chapter narrative (mono chapter markers + h2 + prose column at 70ch, Metrics evidence block for genuine outcomes only), end matter ("More case studies" via the other projects' cards + contact nudge → `/contact`). Content authored in `lib/work-content.ts` strictly from the verified source-of-truth claims (SabiGet: idempotent checkout, server-authoritative Paystack lifecycle, no GPS claims; Alafia: deterministic explainable triage, faster-whisper Python microservice, 60/40 capability matching, explicitly not a diagnostic, no blood/wallet claims; MyGuestly: TOTP QR gate, Cloudinary signed uploads, token rotation, no concurrency/load claims); no invented metrics/links/timelines (only genuine metrics: Lumora 2nd place + UNICEF recognition). Lumora's case study is deliberately thin (build details pending owner input — nothing invented); per-project JSON-LD (SoftwareApplication) + `generateMetadata` (title per `docs/seo.md`, description = summary); unknown slugs 404 via `notFound()`. Dev-gated `/components` review page's raw `<a href="/work">` switched to `<Link>` (lint rule once `/work` became a real route). All format/lint/typecheck/build checks green; production SSR smoke-tested (`/work`, `/work/{sabiget,alafia,lumora,myguestly-ai}` = 200; unknown slug + `/components` = 404; chapters/JSON-LD/imaged/alts/back-link + related cards verified). Homepage `/work` + all card hrefs now resolve. Known limitations for the report: no live/repo URLs or timelines supplied (fields omitted), Lumora narrative pending, MyGuestly AI has no imagery, `/about`, `/writing`, `/contact` links still 404 until Phases 7–8, home "View all work" & "Use the contact page" resolve except `/contact`.
- Phase 7 (About & Writing) COMPLETE — `/about` (intro → Journey [Cyncra intern · current, TechCrush Lagos City Lead] → Achievements [GESP 2nd + UNICEF, both → Lumora case study] → Skills with evidence links to `/work/<slug>` per token, grouped by category → "How I work" principles → Recruiter facts block + CTAs) and `/writing` index (single genuine entry: the DataFlow Medium article, Badge type marker + tags + "Read on Medium") + `/writing/[slug]` internal-post template (BlogPosting schema, Back-to-Writing, 404 until real posts exist — the Medium article stays external by design). Writing source of truth consolidated in `lib/writing-content.ts` (home teaser now reads from it; `featuredWriting` removed from `lib/home-content.ts`). About content in `lib/about-content.ts`, strictly from the verified source of truth — no dates/portrait/resume yet (supplied → shipped), no invented roles or skills. All format/lint/typecheck/build checks green; production SSR smoke-tested (`/about`, `/writing`, `/` = 200; `/writing/<slug>` and `/contact` 404; evidence links + recruiter block + home "All writing" link verified). Known limitations for the report: `/about` journey lacks dates until owner supplies timeline; no portrait or resume yet (omitted, not placeholder); `/writing` has one external entry only (medium.com), internal posts can be added to the data module when bodies are supplied; `/contact` still 404 until Phase 8.
- Phase 8 (contact & backend) COMPLETE — `/contact` (dual-path role/build form reusing the form primitives + Alert/Button/InlineLink; radio cards with `has-[:focus-visible]` rings; client + server validation; honeypot `website` visually hidden/`aria-hidden`/`tabIndex -1`, short-circuits with a generic 400, never revealed) posting to the Node backend `POST /api/contact` (`frontend/lib/contact-config.ts` source of truth: reply promise "Your message goes directly to Racheal. She typically replies within 1–2 business days."; WhatsApp CTA with owner-supplied number `+2349152026763` via `wa.me` intl-digits + URLSearchParams-encoded approved prefill — button + footer link, no visible plain number; `NEXT_PUBLIC_CONTACT_API_URL`). Backend (`backend/src/contact/{delivery,validate,rate-limit,brevo,handler}.ts`, native `node:http`, no new deps): JSON-only (415), 16 KiB body cap (1 MiB drain), server validation (context ∈ role|build, name ≤100, email ≤254 + format, message 10–2000), sliding-window rate limit 60 s × 10/IP × 10k keys with sweep (compile-time constants, no env var; raised from 3 → 10 after a live test showed the 3-cap throttled real retries from the shared loopback IP) + `Retry-After` on 429, honeypot, structured logs via `src/log.ts` (stable event names, SHA-256-hashed IPs, never message body/API key/stack traces), `ContactDelivery` interface → `BrevoDelivery` (fetch, `POST https://api.brevo.com/v3/smtp/email`, reply-to = visitor, escaped text+HTML, fails closed 503 when `BREVO_API_KEY`/`CONTACT_*_EMAIL` absent, provider errors → 502, no message persistence); responses `200 {ok:true}` / `400` (validation with field codes, invalid_json) / `413` / `415` / `429` (`rate_limit` + `retryAfterSeconds`) / `502` / `503`, `405`+`Allow: POST` + `404`, headers `no-store` + `nosniff`. Follow-up (live browser test): added a CORS allow-list for `/api/contact` (`backend/src/contact/cors.ts` — preflight 204, allow-listed origins only, `CORS_ALLOWED_ORIGINS` env overrides localhost defaults `http://localhost:3000,http://localhost:3001`; the browser was blocking the cross-origin form POST), and the dev/start scripts now load `backend/.env` automatically via `--env-file-if-exists` (the running process had been 503-failing because `.env` was never loaded). Tests: backend **33/33** (the 28 above + CORS preflight/allow-list/ACAO-on-POST/disallowed-origin + env-override helper); real Brevo delivery confirmed locally with the owner-supplied key (`{"ok":true}` in live POSTs); format/lint/typecheck/build green in both apps; frontend has no test script (reported). Prod smoke: `/contact` + all routes 200, dev `/components` + unknown slugs 404, `/health` 200, full API matrix verified (validation fields, generic honeypot 400, 429 after 3/IP with `Retry-After`, 503 fail-closed without creds, 405 GET/DELETE, 415, malformed JSON 400), WhatsApp href + fields verified in SSR HTML, no Brevo secrets in built JS chunks. Docs finalized: `docs/environment.md` (rate-limit constants row, delivery-status note, rule 5 owner-content update), `docs/decisions.md` (ADR-002 route shaping, ADR-004 rate-limit constants + request-time fail-closed, ADR-005 supplied number/prefill), `README.md`. Known limitations for the report: real delivery was verified locally with the owner-supplied key, but a live send must be re-confirmed once the site is deployed with a Brevo-verified production sender (ADR-004); frontend must be built with `NEXT_PUBLIC_CONTACT_API_URL` set at deploy; production must set `CORS_ALLOWED_ORIGINS` to the real frontend origin(s); form is client-JS only (no-JS visitor uses the always-rendered direct email/WhatsApp links); rate limit 10/60 s is generous for humans, shared per-IP (loopback collides with smoke tests), and tunable as a code constant if real traffic needs more.
- Phase 9 (resume artifact) NEXT — per `docs/implementation-plan.md`.

Rules that remain in force during implementation:

- The approved architecture and design system are authoritative; do not redesign the product.
- Never invent real content (projects, metrics, testimonials, employment history, contact info, achievements). Real content must come from the owner.
- Development-only placeholders must be clearly marked and must never ship.
- Do not commit secrets; use documented environment variables and `.env.example` without real credentials.