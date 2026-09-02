# Information Architecture — Olayode Racheal Portfolio

> The structure and navigation of the portfolio, consistent with `docs/vision.md`, `docs/brand.md`, and `docs/requirements.md`.

---

## Guiding Principles

- **Proof over claims** — projects and case studies are the strongest evidence and are always reachable.
- **Specific, not universal** — the right opportunity finds the right path without a sprawling header.
- **Focused, not sprawling** — a tight set of primary destinations; supporting proof lives within core pages.
- **Dual-path conversion** — "role" and "build together" are both reachable, with a clear next step.
- **Maintainable** — a shallow, predictable tree that is easy to extend as content grows.

---

## Site Map

```
/
├── /work                      PROJECT SHOWCASE (index of case studies) — highest priority
│   └── /work/[slug]           PROJECT CASE STUDY (per project)
├── /about                     ABOUT + JOURNEY + EXPERIENCE TIMELINE + ACHIEVEMENTS
│   └── (personal layer, values, portrait, recruiter clarity)
├── /writing                   WRITING INDEX (single publishing surface)
│   ├── technical articles
│   ├── project retrospectives
│   ├── engineering lessons
│   └── experiments
│   └── /writing/[slug]         INDIVIDUAL NOTE / ARTICLE
└── /contact                   DUAL-PATH CONVERSION + RESUME DOWNLOAD
```

**Homepage incorporates (no separate pages):**
- **"Now" section** — a small current-focus band on Home.
- **Selected work** — 3 strongest projects with outcome-led descriptions.
- **Recruiter clarity** — a compact, unobtrusive block (roles, location/remote, availability, relevant tech).
- **Writing teaser** — 1–2 recent quality entries.

---

## Navigation Model

### Primary header (desktop)
`Work · About · Writing · Contact`

### Mobile
Collapsible overlay/sheet with the same four destinations + footer sitemap.

### Footer (full sitemap)
- All pages: Work, About, Writing, Contact.
- Actions: theme toggle, PDF resume, social/contact channels.

### Contextual navigation
- Case study pages: "← Back to Work" + related project links.
- Writing pages: "← Back to Writing" + related notes.
- Home: selected-work, Writing teaser, "Now" band, and Contact path route deep into the site.

---

## Content Hierarchy Within Pages

| Page | Primary content (L1) | Secondary (L2) | Tertiary (L3 / meta) |
|---|---|---|---|
| Home | Hero/positioning | Selected work, recruiter clarity, "Now", Writing teaser, contact | Footer, theme, social |
| Work | Project cards | One-line outcome, tech tags | Role, links |
| Case study | Problem → Context → Role → Constraints → Thinking → Decisions → Trade-offs → Implementation → Outcome → Lessons | Architecture, tech stack | Links, meta, related |
| About | Intro + experience timeline | Achievements, personal layer, values, recruiter clarity | Portrait |
| Writing | Index | Articles | Meta, related |
| Contact | Dual-path form | Channels, "what happens next", resume | Fine print |

---

## URL Strategy

- **Clean, lowercase, hyphenated slugs** — e.g. `/work/<slug>`, `/writing/<slug>`.
- Case study slug derived from project `slug` in the content model; writing slug from post `slug`.
- No deep nesting; flat, predictable routes.
- Canonical URLs and sitemap generated for SEO (see `docs/seo.md`).

---

## Content Model Relationships (at a glance)

- **Project** → has many **case study sections** and **evidence** (tech, outcome, links).
- **Skill / Achievement** → links to supporting **project** or **note** (evidence back-reference).
- **Writing post** → standalone content with optional related-links.
- **Contact** → no stored content; submission handled via the backend contact endpoint.

Authoring is **repo-first** and **static**: content lives as MDX + structured data files and is rendered by the frontend (see `docs/architecture.md`). **No database, content API, CMS, or ingestion pipeline in v1.**

---

## Growth Path

As content grows (more projects, more writing), the architecture supports:
- Adding a **standalone Achievements page** if the volume of substantial evidence justifies it.
- Adding project **filtering** only when project count justifies it (per requirements — not v1).
- Introducing a **headless CMS or database** in front of the same content model **if and only when** a concrete requirement justifies it (see `docs/decisions.md` revival condition — no rewrite needed).

---

## Acceptance Criteria (IA)

- Every page reachable in ≤ 2 clicks from Home.
- Header stays at **4 primary destinations** (Work, About, Writing, Contact) — tight and scannable.
- No orphan pages; footer provides a complete sitemap.
- Dual conversion paths are reachable from Home and Contact, with a clear next step.
- Recruiter-critical info is visible on Home and About in an unobtrusive, human way.
- The tree is shallow and predictable; URLs are clean and crawlable.

---

*Information architecture reflects the approved planning direction.*
