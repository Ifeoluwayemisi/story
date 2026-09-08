# Product Requirements — Olayode Racheal Portfolio

> This portfolio is designed and treated as a **real digital product**, not a static résumé website. Its job is to **demonstrate** capability, build credibility, convert the right visitors to a conversation, and remain **maintainable**.
>
> Guiding skepticism: every feature must answer *who benefits, why it exists, and at what cost*. Features that only sound impressive are rejected. Leadership is **shown through work** (ownership, decisions, outcomes, collaboration), never claimed as a title.

---

## Product Goals (recap from vision)

1. Demonstrate engineering craft, product sense, and ownership with **evidence**.
2. Convert the right visitors — recruiters, leads, clients, peers — to a conversation.
3. Be distinctive and editorial without being loud or gimmicky.
4. Be fast, accessible, secure, and maintainable (static-first).

---

## CORE PAGES

| # | Page / Route | Purpose | Priority |
|---|---|---|---|
| 1 | Home (`/`) | Positioning in action — hero, selected proof, "Now" band, path through the site | P0 |
| 2 | Work (`/work`) | Project showcase — the strongest evidence | P0 |
| 3 | Project Case Study (`/work/[slug]`) | Deep evidence per project | P0 |
| 4 | About / Journey (`/about`) | Who Racheal is + experience timeline + achievements + personal layer | P0 |
| 5 | Writing (`/writing` + `/writing/[slug]`) | One publishing surface: technical articles, retrospectives, lessons, experiments | P1 |
| 6 | Contact (`/contact`) | Dual-path conversion + resume download | P0 |

**Priority rationale:** Work, Case Studies, About, and Contact are the conversion backbone (P0). Writing builds credibility, differentiation, and SEO depth (P1).

**Removed (per approved IA):** standalone Lab, How I Build, Now, and Achievements pages. Their function is absorbed:
- Lab-style experiments → **Writing**.
- "How I Build" thinking → **inside case studies** and **About**.
- "Now" → a **small homepage section** (no separate page).
- Achievements → **within About** unless content volume later justifies a dedicated page.

---

## NAVIGATION

**Goal:** effortless orientation; the right opportunity finds the right path; a tight, focused header.

**Primary nav (desktop header):**
`Work · About · Writing · Contact`

**Rationale / trade-off:**
- Four destinations, dominated by evidence (Work) and conversion (Contact).
- Personality/credibility (About, Writing) is served without leading the site.
- Removed How I Build, Lab, Now, and Achievements from the header and as pages.

**Footer nav:** full sitemap (all pages) + contact channels + resume + theme toggle + copyright.

**Mobile:** a clean, accessible menu (overlay or sheet); same destinations; no hidden footers.

**Breadcrumbs / context:** case study and writing pages get a small back-link ("← Back to Work / Writing"); no full breadcrumb trail needed for a site this shallow.

**Acceptance criteria:**
- Every top-level page reachable in ≤ 2 clicks from Home.
- Nav reflects current section; keyboard-focusable; non-JS fallback (nav usable without JS).
- No orphan pages; every route linked somewhere.

---

## HOMEPAGE REQUIREMENTS

**Why it exists:** the first impression and the positioning statement made concrete. It must intrigue, build instant credibility (especially for recruiters in < 10 seconds), and route the right visitor onward — without being a résumé.

**Who benefits:** every visitor; most importantly first-time recruiters, leads, and peers deciding in seconds.

**Priority:** P0. **Complexity:** Medium.

**Structure (sections):**
1. **Hero / positioning** — name + a single, specific headline (the core message), a one-line value statement, and clear CTAs ("View my work" · "Contact me"). Distinctive wordmark/monogram and editorial typography. No fake terminal, no aspirational title claim.
2. **Selected work** — 3 strongest projects with one-line, outcome-led descriptions. Each links to its case study. *Proof, front and center — the strongest evidence, highest priority.*
3. **Recruiter clarity (unobtrusive)** — a compact, human-framed line or small block covering roles of interest, location / remote / work authorization, availability, and relevant technologies. Clear but not an ATS dump.
4. **"Now" band** — a single, current-focus line (recency/authenticity). Small homepage section, not a page.
5. **Writing teaser** — 1–2 recent, high-quality entries. *Depth + personality.*
6. **Contact path** — a short closing with clear CTAs and next steps. *Conversion.*

**Acceptance criteria:**
- Above the fold, a visitor understands **who you are, what you build, and why you're worth reading about** in < 10 seconds.
- Recruiter-critical information (roles, location, remote availability) is visible without burying the narrative.
- No element is decorative; every block links somewhere or states a claim backed elsewhere.
- Both conversion paths are reachable without scrolling far.
- Passes performance/a11y budgets on mobile.

---

## PROJECT SHOWCASE REQUIREMENTS

**Why it exists:** the primary evidence layer — a curated, scannable index of what Racheal has built. **Work is the strongest evidence and receives the highest priority.**

**Who benefits:** recruiters/leads scanning for capability; peers looking for craft.

**Priority:** P0. **Complexity:** Low–Medium.

**V1 scope:** **3 projects** (curated quality over quantity, per planning). Expand later.

**Index items show:**
- Title + role
- A one-line outcome (business/user value)
- Relevant tech tags
- Link to full case study
- Visual/thumbnail with alt text

**Interaction:** no filtering at this scale; each project links directly to its case study.

**Acceptance criteria:**
- Each project is readable in one glance (title, role, outcome, tags).
- Every item has a visible link to its case study; no dead ends.
- Ordering is editorial (featured/strongest first), not arbitrary.

---

## PROJECT CASE STUDY REQUIREMENTS

**Why it exists:** the core of "proof over claims." This is where Racheal demonstrates problem-solving, ownership, technical decisions, trade-offs, and outcomes — the differentiator from a résumé. **This is the highest-value content on the site.**

**Who benefits:** engineering leads, peers, and clients who need depth to be convinced; recruiters seeking evidence.

**Priority:** P0. **Complexity:** High.

**Structure (per case study), driven by the content model:**
- **Problem** — the real challenge and its context
- **Context** — the environment, constraints, and conditions
- **My role** — what Racheal personally owned
- **Constraints** — technical, time, team, resource constraints
- **Thinking** — how the problem was approached and why
- **Technical decisions** — key choices, with reasoning ("why this, not that")
- **Trade-offs** — what was consciously given up and why
- **Implementation** — how it was actually built (architecture, key parts)
- **Outcome** — measurable results when genuine; lessons learned
- **Lessons** — honest reflections

**Content quality bar:**
- **Never degenerate into "I used React and Node."** Every case study must show problem, context, thinking, decisions, trade-offs, implementation, outcome, and lessons.
- Technical depth is present but framed for mixed audiences (outcome-led first, technical detail available).
- Metrics/outcomes are included **only when genuine and accurate** — never invented or exaggerated.

**Acceptance criteria:**
- Covers the full structure above (problem → context → role → constraints → thinking → decisions → trade-offs → implementation → outcome → lessons).
- Technical claims are specific and verifiable, not vague.
- Accesses on mobile; images have alt text; readable without JS enhancement.
- Each case study is served from static MDX content with proper SEO metadata.

---

## ABOUT REQUIREMENTS

**Why it exists:** the personal, human layer — who Racheal is, her journey, and her values. Builds trust and memorability that a project list cannot.

**Who benefits:** recruiters evaluating fit, peers, clients, and anyone forming a personal connection.

**Priority:** P0. **Complexity:** Medium.

**Includes:**
- A warm, honest, specific introduction (writing that sounds like Racheal).
- The **journey / experience timeline** (title + org + dates + concrete contributions).
- **Achievements** — proof & wins (primary home for achievements; dedicated page only if volume later justifies it).
- **Recruiter clarity** — roles of interest, location / remote / work authorization, availability, relevant technologies. Clear but unobtrusive.
- A personal layer: interests, inspirations, working principles, and the story/values behind the brand — multidimensional, per planning.
- Portrait (one purposeful image).
- Leadership shown through ownership, decisions, communication, outcomes — never an aspirational title.

**Acceptance criteria:**
- Reads human and authentic; no corporate filler.
- Recruiter-critical details are present, clear, and human-framed — not an ATS résumé dump.
- Personal layer appears naturally, not as a bullet of hobbies.
- Links to Work and Writing where relevant.

---

## EXPERIENCE REQUIREMENTS

**Why it exists:** professional credibility, shown as a story rather than a flat list.

**Who benefits:** recruiters, hiring managers, and leads assessing track record.

**Priority:** P0. **Complexity:** Medium.

**Approach:** a **dated timeline within About/Journey** (professional roles) — ordered, concise, outcome-oriented. Entries: role, organization, dates, a few concrete contributions/outcomes.

**Acceptance criteria:**
- Chronologically clear; **dated** (title + company + dates); each entry has concrete, evidence-backed contributions.
- Shows ownership and progression without overstating.
- Accessible structure (semantic list/timeline); readable on mobile.

---

## ACHIEVEMENTS REQUIREMENTS

**Why it exists:** hard, scannable proof that complements projects — the "receipts" that convert skeptics fast.

**Who benefits:** recruiters, hiring managers, and clients who judge claims by outcomes.

**Priority:** P1 (primary home: **within About**). **Complexity:** Low.

**Includes:** measurable wins — e.g., results, recognition, certifications, shipped outcomes, notable contributions — each a short, verifiable claim.

**Placement rationale:** Achievements live **within About** by default. A **dedicated page is only justified later if there is enough substantial evidence** to support one; otherwise avoid a thin, standalone page.

**Acceptance criteria:**
- Every achievement is specific and verifiable (numbers, dates, links where possible).
- No vague "improved performance" claims without a value; no invented metrics.
- Accessible and scannable.

---

## SKILLS REQUIREMENTS

**Why it exists:** quick capability assessment for recruiters and peers — **only as evidence-supported**, never an unchecked self-scorecard (anti-"résumé dump" rule).

**Who benefits:** recruiters scanning for specific technologies; peers assessing depth.

**Priority:** P1. **Complexity:** Low.

**Approach:**
- Skills presented as **tags/categories**, each linkable to the project(s) or note(s) that evidence it.
- **No proficiency bars / percentage meters** (arbitrary, unverifiable, cliché).
- Grouped sensibly (Languages, Frontend, Backend, Data, Tooling).
- **Do not lead with "years of experience per stack."** Include experience-duration claims **only when accurate and genuinely useful**; prefer concrete evidence over arbitrary numerical claims.

**Acceptance criteria:**
- Every listed skill is linked to at least one piece of evidence.
- No self-rated bars/percentages; no leading "years per stack" marketing.
- Scannable and accessible.

---

## CONTACT REQUIREMENTS

**Why it exists:** the site's primary conversion point. Hands the visitor a clear, low-friction way to start a conversation — for **either** a role or a project — with an explicit next step, plus a direct secondary chat channel.

**Who benefits:** recruiters, hiring managers, and clients ready to act (and Racheal, who receives qualified leads).

**Priority:** P0. **Complexity:** Medium–High (backend endpoint + validation + security + delivery adapter).

**Two distinct contact channels (approved):**

1. **Contact form (primary)** — role / build paths via the validated form → Node/TS backend → Brevo → Racheal's email.
2. **Direct WhatsApp (secondary)** — `wa.me` deep link → direct conversation. **No backend involved.** See `docs/decisions.md` ADR-005.

**Structure (form channel):**
- Two clear in-form paths: **"I have a role"** / **"Let's build together"** with a **validated contact form** (name, email, message, optional context selection).
- Direct channels also listed (all platforms where convenient), resolved/validated; **no secrets exposed**.
- Resume/contact details alongside.
- A clear **"what happens next"** line (e.g., reply window, what to expect) so visitors know the next step.

**WhatsApp channel (secondary CTA):**
- Rendered as a clear link/button — copy **"Chat on WhatsApp"** or **"Chat with me"**.
- Placement: in the Contact experience and **at least one other strategically appropriate location** (the site footer; About as the approved alternative).
- Accessible labeling (e.g., `aria-label="Chat with me on WhatsApp"`) and an external-app/link indication where useful.
- **Not** an oversized floating widget; never obscures content.
- The number is a **real value Racheal provides in Phase 0** (see `docs/content-model.md` readiness checklist). No placeholder may be hardcoded or ship; the link stays disabled until verified.
- Any prefilled WhatsApp message uses only **approved, generic, non-personal copy** (documented strategy in ADR-005); without approved copy, ship the plain deep link with no preview text.

**Backend requirement (per approved architecture):** the form submits to the **Node/TS backend** (validated endpoint), **never** a client-only handler with keys in the frontend. The contact form is the primary justification for the backend in v1. Delivery goes through a **delivery adapter interface** behind which **Brevo** implements email sending (ADR-004). WhatsApp requires no backend.

**Brevo / delivery requirements (ADR-004):** backend-only env vars (`BREVO_API_KEY`, sender + recipient config); sender verified in Brevo before production sending; provider errors mapped to safe user-facing errors (no leaked internals); delivery logged server-side; no message persistence.

**Acceptance criteria:**
- Submission is validated (format, length, required fields) with clear inline errors.
- Backend validates input and returns explicit errors; handles failures gracefully.
- No API keys/credentials reach the frontend; env vars server-side only.
- Confirmation state shown on success/failure; accessible to assistive tech.
- Spam/abuse mitigated (rate limiting / honeypot — see Security).
- A demo/targeted Brevo send is verified in a test environment before launch.
- WhatsApp CTA: present in Contact **and** one other approved location; accessible; no floating widget; deep link built from the Phase 0 number — never a shipped placeholder.

---

## RESUME / CV REQUIREMENTS

**Why it exists:** a first-class, downloadable deliverable for traditional application flows and recruiters.

**Who benefits:** recruiters, HR systems, and hiring managers that require a file.

**Priority:** P0 (first-class deliverable). **Complexity:** Low.

**Approach:**
- **Easy to find** — reachable from Contact and the footer (and, in context, from About).
- **Downloadable** — a clean PDF download.
- **Visually consistent with the brand** — designed to the same typography/color treatment; not a generic Word-made PDF.
- **Kept synchronized with the portfolio** — mirrors the site's key claims, dates, and evidence.
- **Useful to recruiters** — clear, scannable, dated, with relevant skills and outcomes.
- The website remains the primary story; the PDF is a supporting, first-class artifact (not a footnote).

**Acceptance criteria:**
- Downloadable PDF is accurate, current, and matches the site's key claims and dates.
- Designed to the brand (typography, color, layout) — recognizable as Racheal's.
- Link is clear and accessible; file is reasonably sized.

---

## WRITING / NOTES

**Justified? Yes — one publishing surface only.**

**Why:** it demonstrates depth, reinforces the "curious/intelligent" personality, improves SEO, and gives a repeat-visit reason. It is low-cost (MDX in the repo) and high-signal.

**Who benefits:** peers (craft), recruiters/leads (perceived authority), search engines (discovery).

**Priority:** P1. **Complexity:** Medium.

**Scope:** the **single** publishing surface may contain:
- Technical articles
- Project retrospectives
- Engineering lessons
- Experiments

**Content policy:**
- **Do not create content merely to make the section look populated.** One excellent article is better than five weak ones.
- Quality, authenticity, and specificity over volume.

**Acceptance criteria:**
- Posts are original, specific, and sound like Racheal.
- Proper SEO metadata, headings, readable typography, a11y.
- Listed index + individual article routes.

---

## TESTIMONIALS

**Justified? Conditional — only with real, consenting, specific references.**

**Why:** social proof can be powerful for clients/recruiters. **Why not automatically:** fake or vague testimonials are worse than none and violate the "no claims without evidence" rule.

**Who benefits:** clients and hiring managers weighing trust.

**Priority:** P2 / deferred. **Complexity:** Low.

**Acceptance criteria (if included):**
- Every testimonial is real, with consent, from a named, verifiable source.
- Specific and evidence-linked (ties to a project/outcome); never generic praise.
- Accessible, attributed, and current (not stale).

---

## INTERACTIVE FEATURES WORTH BUILDING

| Feature | Why it exists | Who benefits | Priority | Complexity |
|---|---|---|---|---|
| **Validated contact form (backend)** | Primary conversion; secure, role vs project distinction; main justification for the backend | Recruiters, clients | P0 | Medium–High |
| **Brevo delivery adapter (backend)** | Email delivery behind an interface; provider not coupled to the app; env-only credentials (ADR-004) | Racheal | P0 | Low–Medium |
| **WhatsApp direct chat (frontend only)** | Secondary, low-friction direct contact path; no backend involved (ADR-005) | Recruiters, clients | P1 | Low |
| **Manual light/dark theme toggle** | User control + distinctive dark mode; explicit choice (anti-auto) | All visitors | P0 | Low–Medium |
| **Subtle scroll-reveal / entrance motion (a11y-aware)** | Delight + focus; respects reduced-motion | All | P1 | Low |
| **Skill/achievement → evidence linking** | Proof over claims, cross-navigation | Recruiters, peers | P1 | Low |
| **Related-content links** ("Continue reading / next project") | Encourages depth & dwell | Peers, leads | P2 | Low |

### Features that should be skeptic-proof (only build if they pay for themselves)
- **Project filtering** — only if the project count grows past ~6 and categories genuinely help discovery; **not needed at 3 projects** (skip for v1).
- **Email via client-side mailto only** — rejected in favor of the validated backend form.
- **Word/search on Writing** — unnecessary for a small set of posts; rely on the index.

---

## FEATURES THAT SHOULD EXPLICITLY NOT BE BUILT

Rejected because they sound impressive but don't improve the portfolio (aligning with Racheal's anti-vision):

1. **A database for portfolio content** — content is static MDX / structured repo data; see `docs/decisions.md` (revival condition).
3. **A full content API** — no server-side content serving needed for static content.
4. **A CMS/admin UI (v1)** — content is repo-first; a headless CMS is a later path only if justified.
5. **A content ingestion pipeline** — no DB/API to ingest into.
6. **Fake terminal / code-typing / Matrix / `0101` decoration** — dev cliché, no user value.
7. **Proficiency bars / rating meters for skills** — arbitrary, unverifiable.
8. **Gratuitous animation** — parallax excess, floating blobs, glassmorphism, marquee noise, decorative spark motifs.
9. **Standalone Lab / How I Build / Now pages** — folded into Writing, case studies/About, and the homepage "Now" band respectively.
10. **Standalone Achievements page** — lives within About unless volume justifies a dedicated page.
11. **Blog search / heavy CMS-backed blog** — overbuilt for a small set of notes.
12. **Project filtering (at v1 scale)** — no discovery benefit for 3 projects.
13. **Multi-language / i18n** — unnecessary; no business reason given.
14. **Newsletter signup** — no audience/business need yet.
15. **Live chat / chatbot** — no support need; adds complexity and noise.
16. **Dark auto-detection** — manual toggle chosen deliberately.
17. **Client-side-only contact for email (mailto/form without backend)** — violates the approved architecture + security. The WhatsApp deep link is the **single approved client-side channel** (secondary, direct chat, no email delivery — ADR-005); it is not an email substitute.
18. **Public API/analytics dashboard** — serves no visitor need.
19. **Leading "years of experience per stack" marketing** — numeric claims only when accurate and genuinely useful; prefer evidence.

**Skeptic rule applied:** every rejected feature failed at least one of *"who benefits?"*, *"is it evidence?"*, *"does it serve the conversion/credibility goals?"*, or *"is the infrastructure warranted?"*.

---

## FUNCTIONAL REQUIREMENTS

- F1: Serve all pages: Home, Work, Case Studies, About/Journey, Writing, Contact.
- F2: Portfolio content is **static** — authored as MDX / structured repo data and rendered by the frontend (no database, content API, CMS, or ingestion pipeline).
- F3: Contact form with dual path (role/project), full validation + inline errors, success/failure states, backend handling — the primary backend use case.
- F3a: Contact delivery via a **delivery adapter interface**, implemented by **Brevo** (ADR-004); env-only credentials; sender verified; provider errors mapped to safe responses.
- F3b: **WhatsApp** direct chat CTA (secondary) in Contact and at least one other approved location; accessible, no floating widget; deep link built from the Phase 0 number only (ADR-005).
- F4: Manual light/dark theme toggle, persisted.
- F5: **PDF resume download** (first-class deliverable, brand-consistent).
- F6: Skills and achievements link to supporting evidence.
- F7: Related-content links on case studies/writing.
- F8: Accessible navigation (desktop header, mobile menu, footer sitemap).
- F9: Recruiter clarity (roles, location / remote, availability, relevant tech) present on Home and About in an unobtrusive, human way.
- F10: Content is updateable by editing MDX/data files (repo-first) with minimal friction.

---

## NON-FUNCTIONAL REQUIREMENTS

- **Architecture:** **static-first**. Next.js + TypeScript frontend; Node.js + TypeScript backend limited to functionality requiring server-side processing (contact form) — see `docs/decisions.md`.
- **Performance:** Core Web Vitals in good ranges (LCP < 2.5s, INP < 200ms mobile); Lighthouse performance ≥ 90. Static generation/SSR default; minimal client JS.
- **Availability:** reliable hosting; graceful handling of backend/API failure (frontend degrades, explicit errors).
- **Maintainability:** few dependencies; simple, static-first architecture; content updates in minutes; documented (docs/ + AGENTS.md).
- **Testability:** core logic and the contact endpoint are testable; type-checked and linted.
- **Scalability (content):** the content model permits growth to more projects/writing and a future headless CMS **without a rewrite** (see revival condition).

---

## ACCESSIBILITY REQUIREMENTS

- WCAG 2.1 **AA** target.
- Semantic HTML; logical reading/DOM order; one `<h1>` per page.
- Full keyboard navigation; visible focus states.
- All interactive elements labeled (forms, icons, links).
- Images have meaningful alt text; non-decorative.
- Color contrast meets AA in **both** light and dark themes.
- `prefers-reduced-motion` respected; no info conveyed by motion alone.
- ARIA used only where native HTML is insufficient.
- Accessible validation/error messaging and theme toggle.

---

## PERFORMANCE REQUIREMENTS

- LCP < 2.5s, INP < 200ms, CLS < 0.1 (mobile).
- Static generation/SSG default; minimal client JS.
- Optimized images (format, sizing, lazy-loading, alt).
- Minimal blocking resources; no render-blocking third-party scripts.
- Fast TTFB via static hosting/caching.
- Dark theme has no measurable paint regressions (no flash of wrong theme).

---

## SECURITY REQUIREMENTS

- **No secrets in the frontend.** API keys, tokens, DB credentials, and private env vars exist **only** server-side (backend).
- **Delivery credentials (e.g., `BREVO_API_KEY`):** backend env vars only; never in the frontend, build output, or repo; sender verified in Brevo before production sending (ADR-004).
- **WhatsApp needs no backend** — it is a frontend deep link; no provider credentials exist for it (ADR-005).
- Contact endpoint **validates all external input**; rejects malformed/oversized payloads.
- **Explicit error handling**; no internal errors or stack traces leaked to the client.
- **Rate limiting / spam mitigation** on the contact endpoint (e.g., honeypot, throttling).
- Dependencies kept current; no vulnerable packages (audit).
- Output escaping to prevent stored/XSS injection from content.
- Minimal attack surface: the backend exposes only the contact endpoint in v1 (no unnecessary routes).
- HTTPS throughout; security headers configured.

---

## RESPONSIVE REQUIREMENTS

- Fluid, mobile-first layout; degrades gracefully from desktop to small mobile (≈320px).
- No horizontal overflow; touch-friendly targets (≥ 44px).
- Navigation collapses to an accessible mobile menu.
- Typography and spacing scale with viewport; tables/complex case-study content become readable on mobile.
- Images and case-study media responsive with correct aspect ratios.
- Both light and dark themes remain accessible and performant across breakpoints.

---

## USER STORIES

- As a **recruiter**, I can quickly confirm Racheal's relevant skills, experience, and role/location/availability so I can decide to reach out.
- As an **engineering lead**, I can read a case study's problem, thinking, decisions, and trade-offs so I can judge depth.
- As a **client/founder**, I can see outcomes and contact Racheal for a project in one step.
- As a **peer**, I can read Writing and case studies to assess craft and taste.
- As **Racheal**, I can update content by editing MDX/data files and redeploying (static-first, minimal friction).

---

## ACCEPTANCE CRITERIA (product level)

- Every P0 page meets its content + conversion requirements.
- Contact form works end-to-end securely and cleanly.
- Portfolio content is fully static (no DB/API/CMS/ingestion in v1).
- The full site passes performance, a11y, responsive, and security checks.
- Resume is a first-class, brand-consistent, current deliverable.
- Recruiter-critical information is clear but unobtrusive (not an ATS dump).
- Content is maintainable via repo-first updates.
- It looks and reads distinctive, not templated.

---

## OUT OF SCOPE (v1)

Standalone Lab/How-I-Build/Now/Achievements pages, database for content, full content API, CMS, content ingestion pipeline, newsletter, live chat, i18n, blog search, project filtering, dark auto-detection, proficiency meters, developer-theatrics animation, client-side-only contact, analytics dashboards, leading "years-per-stack" marketing. Each has a stated reason above.

---

*Requirements reflect the approved planning direction.*
