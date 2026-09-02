# SEO Strategy — Olayode Racheal Portfolio

> SEO is a **first-class** requirement (anti-vision rule #10): performance, accessibility, and search discoverability are not afterthoughts. Static-first rendering naturally supports strong SEO. Content is served as **static MDX / structured repo data** (no CMS/DB in v1).

---

## Metadata

Each page and content item carries complete, unique metadata:
- `title` — accurate, specific, per-page (never duplicated verbatim across pages).
- `description` — a human, specific summary per page.
- Canonical URL.
- Open Graph (title, description, image, type).
- Twitter/X cards.
- `robots` directives (index/follow; no indexing of private/irrelevant routes).

**Title strategy:**
- Home: `Racheal — Product-minded Full-Stack Software Engineer`
- Work: `Work & Projects — Racheal`
- Case study: `<Project> — Case Study | Racheal`
- Writing: `Writing — Racheal`
- Article: `<Title> | Racheal`
- About/Contact: `About Racheal`, `Contact Racheal`

---

## Sitemap & robots

- XML sitemap of all public, indexable pages.
- `robots.txt` allowing crawl of public content.
- No orphan or noindex'd pages left dangling.

---

## Structured data

- **Person schema** (name, jobTitle, url, sameAs for LinkedIn/GitHub).
- **Project/SoftwareApplication** (or CreativeWork) schema per case study.
- **Article/BlogPosting** schema per writing post.
- Clear, valid JSON-LD; no invented data.

---

## Image alt text & media

- Meaningful alt text on every image (decorative images marked appropriately).
- Descriptive filenames; correct format/sizing and lazy-loading for performance.
- Open Graph image sized correctly.

---

## URL structure

- Clean, lowercase, hyphenated slugs (see `docs/information-architecture.md`).
- Flat, predictable routes: `/work/<slug>`, `/writing/<slug>`.
- Canonical URLs everywhere.

---

## Content & keywords (authority approach)

- **Writing** is the primary SEO/authority surface: original, specific technical articles, retrospectives, and lessons. **One excellent article beats five weak ones** — quality over volume, per the content policy.
- Case studies use natural, specific language (real technologies, real decisions) — keywords emerge from genuine content, not stuffing.
- Recruiter / role content (role types, relevant technologies, location) is written **for humans first** while remaining discoverable; **not** an ATS keyword dump.
- No invented metrics; accurate, evidence-backed claims.

---

## Performance & Core Web Vitals

- **Static generation/SSG** default → fast TTFB and reliable rendering.
- LCP < 2.5s, INP < 200ms, CLS < 0.1 (mobile).
- Minimal client JS; optimized images; no render-blocking third-party scripts.
- Dark theme without flash-of-wrong-theme (no measurable CLS on theme switch).

---

## Accessibility & SEO interplay

- Semantic HTML, correct heading hierarchy, descriptive link text, alt text — all serve both accessibility and search quality.

---

*SEO reflects the approved planning direction; exact metadata implemented at build time (no code written in planning).*
