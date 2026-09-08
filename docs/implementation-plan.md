# Implementation Plan — Olayode Racheal Portfolio

> Realistic, phase-gated roadmap from the current (**planning-only, empty-repo**) state to production, aligned to the approved **static-first** architecture (see `docs/decisions.md` ADR-001). There is **no CMS, database, or content-API phase** — content is MDX/structured repo data and the backend is the contact endpoint only.
>
> Each phase defines: objective · tasks · dependencies · expected files/directories · acceptance criteria · testing · definition of done · risks.
>
> **Gates:** work does not start until the user states **PLANNING APPROVED**. Content-dependent phases (0, 6, 7, 8) require real material from Racheal per the content readiness checklist in `docs/content-model.md` — nothing is invented.
>
> **Conventions:** frontend in `frontend/`, backend in `backend/` (separate per AGENTS.md). TypeScript throughout. No dependency beyond what each phase justifies.

---

## Phase 0 — Content readiness (pre-implementation)

**Objective:** collect the real material the site depends on, so build phases never block on — or invent — content.

**Tasks**
1. Supply the content readiness checklist items from `docs/content-model.md` (3 flagship projects, experience, achievements, skills+evidence, writing, resume, portrait, recruiter facts).
2. For each flagship project: confirm live URL / public repo (or state "no public link"), screenshots/artifacts with alt text, and the full case-study narrative.
3. Confirm personal facts open to publishing: location/remote/authorization/availability lines, contact channels, socials.
4. **WhatsApp input (ADR-005):** supply the real, validated WhatsApp number; approve CTA copy ("Chat on WhatsApp" / "Chat with me"); approve optional generic prefilled opener (or ship the plain deep link). No placeholder is permitted.
5. **Brevo input (ADR-004):** create the Brevo account, verify the sender, and provide the API key at the right time (supply credentials during Phase 8/13 — never committed to the repo).
6. Approve the design-system tokens and the wordmark direction (see `docs/brand.md` §10) → gates Phase 2/3.

**Dependencies:** none (input from Racheal).

**Expected files:** approved source material only (assets folder created in Phase 2/4 once approved).

**Acceptance criteria:** every content-model field needed by P0 pages has a source; no placeholder content is present.

**Testing:** n/a (review by Racheal). **DoD:** content checklist 100% answered and signed off.

**Risks:** missing project detail/dates/links; mitigations: plan uses placeholders blocked behind Phase 0 sign-off, no invented facts.

---

## Phase 1 — Project initialization

**Objective:** create the repo structure ready for implementation.

**Tasks**
1. Scaffold root: `.gitignore`, `README.md` (done in planning), top-level `frontend/` and `backend/` directories.
2. Initialize **frontend** (Next.js + TypeScript, App Router) inside `frontend/`.
3. Initialize **backend** (Node.js + TypeScript) inside `backend/` — a minimal, dependency-light service.
4. Configure linting, formatting, and type checking in both packages.
5. Set up CI (lint + typecheck + build on push) — implemented before first real feature.

**Dependencies:** Phase 0 (names/placeholders). **Expected files:** `package.json`, `tsconfig.json`, config files in each package; `.gitignore`; CI workflow.

**Acceptance criteria:** both packages type-check, lint, and build with empty placeholders; no secrets in repo; frontend and backend have no shared code.

**Testing:** `npm run lint`, `npm run typecheck`, production build pass. **DoD:** clean scaffold + CI green.

**Risks:** tooling version drift; pin versions. Framework init is a one-time, approved enabler (not the implementation itself).

---

## Phase 2 — Frontend foundation

**Objective:** static-first base all future pages build on.

**Tasks**
1. App Router layout, global styles, CSS tokens/theme (light + dark via `data-theme`), theme bootstrap (no-flash inline script).
2. Self-host + preload the three fonts (Fraunces, Karla, IBM Plex Mono).
3. Base primitives: typography, spacing, radius, border, focus, buttons, links, tags, skip-link.
4. Footer + header shell scaffolding (navigation contract).

**Dependencies:** Phase 1; design-system tokens approved. **Expected files:** `frontend/app/layout.tsx`, `_app`-equivalent global css, fonts, token modules; footer/header components.

**Acceptance criteria:** both themes render; fonts load with `font-display: swap`; skip-link first in DOM; Lighthouse on a stub passes performance/a11y budgets.

**Testing:** visual check both themes & 320px–xl; axe/Lighthouse; `prefers-reduced-motion` respected.

**DoD:** foundation components exist as tokens-driven, typed components; CI green.

**Risks:** FOIT/CLS on fonts — mitigated by preload + `size-adjust` fallbacks.

---

## Phase 3 — Design system implementation

**Objective:** codify `docs/design-system.md` into components.

**Tasks**
1. Implement token layer (CSS custom properties) 1:1 with the design system.
2. Component library for the v1 set: buttons, links, nav, theme toggle, project cards, tags, badges, forms/inputs/textarea, alerts, article/case-study elements, metrics block, footer.
3. Story-ish local preview page/list (or documented component pass) to review all states (hover/focus/active/error/reduced-motion).

**Dependencies:** Phase 2. **Expected files:** `frontend/components/**`, token/theme CSS modules, component tests.

**Acceptance criteria:** every component matches the design system token set; AA contrast verified in both themes (§2 of design system); no unused variants added.

**Testing:** component tests for interactive states; axe on each; contrast assertions where feasible.

**DoD:** all v1 components built from tokens, accessible, responsive.

**Risks:** scope creep into unplanned variants — constrained to the v1 list.

---

## Phase 4 — Content infrastructure

**Objective:** the repo-first content pipeline (the architecture's core).

**Tasks**
1. Define typed content schemas matching `docs/content-model.md` (project, experience, achievement, skill, writing post, site config).
2. Author MDX processor + structured-data loaders (front-end reads files at build time).
3. Front-matter schema + validation (build-time validation rejects bad content).
4. Utilities: slug normalization, date handling, evidence cross-linking (skill → project/note).

**Dependencies:** Phase 2; Phase 0 content samples. **Expected files:** `frontend/content/**`, schema/loader modules, validation script.

**Acceptance criteria:** a sample project + post render from MDX/data; invalid content fails the build; cross-links (projects ↔ skills ↔ notes) resolve.

**Testing:** loader unit tests; build fails on malformed content.

**DoD:** content authoring is file-editing only (no rebuild of components needed for text changes).

**Risks:** MDX ecosystem churn — pin versions; keep components in the MDX scope minimal.

---

## Phase 5 — Homepage

**Objective:** the positioning page (§2 of `docs/ux.md`).

**Tasks:** hero; selected-work (3); "Now" band; recruiter clarity line; writing teaser; contact CTA; metadata (title/description/OG).

**Dependencies:** Phases 3–4; flagship project content from Phase 0. **Expected files:** homepage route + its sections.

**Acceptance criteria:** who/what/why readable < 10s above fold; both conversion CTAs visible without scroll fatigue; all sections link somewhere or state a claim evidenced elsewhere.

**Testing:** Lighthouse; axe; visual pass both themes/mobile.

**DoD:** homepage complete and meets §2 journey.

**Risks:** hero copy drift from positioning — lock copy to vision core message.

---

## Phase 6 — Work & case studies

**Objective:** the strongest evidence layer.

**Tasks:** `/work` index (editorial order, 3 projects); `/work/[slug]` template rendering the case-study chapters; case-study components (chapter markers, metrics block, code, imagery); related + "Back to Work" links; metadata + structured data per project.

**Dependencies:** Phase 4; full case-study narratives from Phase 0. **Expected files:** work routes, case-study components.

**Acceptance criteria:** each project shows the full problem→lessons narrative; no dead ends; images alt-tagged; responsive on mobile; structured data valid.

**Testing:** per-case-study render checks; SEO schema validation; a11y pass.

**DoD:** all 3 case studies live and pass content-quality bar.

**Risks:** thin evidence → Phase 0 requirement (only ship what the content supports).

---

## Phase 7 — About & Writing

**Objective:** trust and authority surfaces.

**Tasks (About):** intro, dated experience timeline, achievements, evidence-linked skills, personal layer, portrait, recruiter clarity, resume link.
**Tasks (Writing):** index (air) + `/writing/[slug]` article page with end-matter related links; metadata/BlogPosting schema.

**Dependencies:** Phase 4; Phase 0 biography/writing material. **Expected files:** about + writing routes/components.

**Acceptance criteria:** About reads human, not an ATS dump; skills link to evidence; achievements verifiable; Writing index only lists quality entries.

**Testing:** content validation; schema checks; axe.

**DoD:** About + at least 1 real writing post live (policy: no filler).

---

## Phase 8 — Contact & backend

**Objective:** the conversion point + its backend.

**Tasks (frontend):** contact route with dual form paths (role/build) + secondary **WhatsApp CTA** (Contact + footer); validated form client-side; success/failure/rate-limited states; direct channels; "what happens next"; accessible WhatsApp link (`aria-label`, external-app indication, deep link from Phase 0 number only — no placeholder).
**Tasks (backend):** `POST /api/contact` endpoint — server validation, honeypot, rate limiting, explicit errors, structured logging; **`ContactDelivery` adapter interface with a `BrevoDelivery` implementation** (ADR-004); env-only config (`BREVO_API_KEY`, sender/recipient vars); deployment config (env injection, HTTPS, headers).

**Dependencies:** Phase 1 (backend init) + Phase 4; Phase 0 WhatsApp/Brevo inputs. **Expected files:** contact route + WhatsApp CTA; backend endpoint, delivery adapter (+ interface), tests; deploy config; env-var docs (see ADR-004).

**Acceptance criteria:** full matrix of valid/invalid/oversized/rate-limited cases behaves per `docs/ux.md` §7; no secrets in frontend or repo; endpoint is the only backend route; a **test Brevo send is verified**; the delivery adapter is proven swappable (mock/alternate implementation passes the same interface contract); WhatsApp deep link renders only with a validated number and meets a11y checks in Contact + footer.

**Testing:** backend unit/integration tests (validation, rate limit, error mapping, adapter contract); end-to-end submit against a Brevo sandbox/test setup then a real verified send; manual pass incl. WhatsApp link on mobile/desktop.

**DoD:** contact works end-to-end securely via both channels (form → Brevo → email; WhatsApp deep link); no placeholders ship.

**Risks:** Brevo sender verification/credentials handling → gated on Racheal's Phase 0/8 input (no committed secrets); spam tuning after launch (documented baseline).

---

## Phase 9 — Resume artifact

**Objective:** first-class, brand-consistent, downloadable resume.

**Tasks:** design resume to brand (typography/color from design system); PDF export; keeper of truth = site claims kept in sync; reachable from Contact, footer, and About.

**Dependencies:** Phase 0 resume source; brand assets. **Expected files:** resume source (e.g., HTML/CSS print or design source) + generated PDF.

**Acceptance criteria:** PDF accurate, current, matches site claims/dates; recognizable as Racheal's brand.

**Testing:** print/export review; small file size; links verified.

**DoD:** downloadable, current PDF shipped.

---

## Phase 10 — SEO

**Objective:** discovery + structured data (per `docs/seo.md`).

**Tasks:** per-page metadata (title strategy), canonical URLs, OG/Twitter cards, `robots.txt`, XML sitemap, JSON-LD (Person on home; SoftwareApplication per case study; BlogPosting per post).

**Dependencies:** content routes exist (Phases 5–8). **Expected files:** metadata module, sitemap generator, robots, OG image asset.

**Acceptance criteria:** every public page has unique title/description/canonical; sitemap lists all indexable routes; schema validates.

**Testing:** schema validator; crawl of the built site; Lighthouse SEO.

**DoD:** site fully metadata-complete and crawler-clean.

---

## Phase 11 — Accessibility & performance hardening

**Objective:** meet WCAG AA + budgets (Lighthouse ≥ 90; LCP < 2.5s, INP < 200ms, CLS < 0.1 mobile).

**Tasks:** full keyboard/focus pass; contrast re-verification; reduced-motion audit; touch targets; form a11y; image optimization, font/code-splitting, minimal client JS, dark-theme no-flash; Core Web Vitals profiling.

**Dependencies:** all pages exist. **Expected files:** audits/documents + fixes.

**Acceptance criteria:** axe clean on all pages; Lighthouse ≥ 90 (perf/a11y/SEO/best-practices) light + dark; CWV targets met on mobile.

**Testing:** axe/Lighthouse CI gate; manual keyboard-only pass.

**DoD:** a11y + performance budgets enforced in CI.

---

## Phase 12 — Testing & QA

**Objective:** regression safety before launch.

**Tasks:** unit tests (content loaders, backend endpoint), integration (build + render), E2E smoke (nav, theme, contact happy & error paths), cross-browser + 320px–xl responsive check.

**Dependencies:** completed features. **Expected files:** test suites + QA notes.

**Acceptance criteria:** core flows pass automated + manual QA matrix.

**Testing:** CI runs test suites; manual QA checklist signed off.

**DoD:** green suite + completed QA matrix.

---

## Phase 13 — Deployment & final audit

**Objective:** ship to production.

**Tasks:** static-site deploy config (CDN/static host) + backend deploy (env-only secrets, incl. `BREVO_API_KEY` + sender/recipient vars); **Brevo production sender verified + test send confirmed**; HTTPS + security headers; analytics on contact (delivery + spam); broken-link scan (incl. WhatsApp deep link target); final Lighthouse/axe; content update runbook (how to add/edit MDX).

**Dependencies:** Phases 10–12. **Expected files:** deployment config, runbook (docs).

**Acceptance criteria:** production URL live; forms deliver; no broken links; budgets met in prod; update runbook tested end-to-end.

**Testing:** post-deploy smoke; monitoring baseline.

**DoD:** production launched + post-launch checklist complete.

**Risks:** deployment/provider specifics; DNS/certs — schedule with a buffer.

---

## Effort notes

- P0 content-gathering runs in parallel from day one — it is the critical path.
- Phases 2–4 are the foundation; 5–9 can proceed in order once foundations land.
- The plan contains **no CMS, database, content API, or ingestion infrastructure**; the revival condition in `docs/decisions.md` governs any future change.

*Plan replaces the earlier, rejected draft (which included CMS/admin phases and pre-dated the static-first decision).*