# Content Model — Olayode Racheal Portfolio

> Content is authored **repo-first** as **MDX + structured data files** and rendered statically by the frontend.
> **No database, full content API, CMS, or ingestion pipeline in v1** (see `docs/decisions.md`).

---

## Authoring approach

- **Structured data files** (e.g., TypeScript or JSON) hold non-prose content: project metadata, skills, achievements, experience, contact info, navigation.
- **MDX files** hold prose-rich content: case study bodies and writing posts (with front-matter for metadata).
- Content is edited directly in the repo and rendered by the frontend; a future headless CMS could serve the same schema (see revival condition in `docs/decisions.md`).

---

## Project / Case Study

Each project maps to a case study. A case study communicates:

```
slug                - URL slug (e.g. "aubergine-analytics")
title               - project name
summary             - one-line outcome-led summary (used in Work index & Home)
tags                - relevant technologies
featured            - boolean / ordering for editorial placement
links:
  liveUrl           - live site (validated, optional)
  repoUrl           - public repository (validated, optional)
  images            - screenshots / artifacts (alt text required)
timeline            - when (optional)
role                - what Racheal personally owned

CASE STUDY SECTIONS (MDX body / structured fields):
  problem           - the real challenge and its context
  context           - the environment, constraints, conditions
  role              - what Racheal owned
  constraints       - technical, time, team, resource limits
  thinking          - how the problem was approached and why
  decisions         - key technical decisions, with reasoning
  tradeoffs         - what was consciously given up and why
  implementation    - how it was actually built (architecture, key parts)
  outcome           - measurable results when genuine; never invented
  lessons           - honest reflections
```

**Content quality bar:** never a generic "I used React and Node" description. Every case study must show **problem → context → role → constraints → thinking → decisions → trade-offs → implementation → outcome → lessons**.

---

## Experience / Journey Entry

```
role                - job title
organization        - company / organization
startDate / endDate - dated timeline (accurate)
summary             - concise, outcome-oriented
contributions       - a few concrete, evidence-backed contributions
```

---

## Achievement

```
title                - short, specific win
value                - measurable result when genuine
date
link (optional)      - verifiable reference
```

Achievements live **within About** by default; a dedicated page is considered only if volume justifies it.

---

## Skill

```
name                 - technology / capability
category             - Languages / Frontend / Backend / Data / Tooling
evidence:
  projectSlugs[]     - project(s) that evidence the skill
  noteSlugs[]        - writing post(s) that evidence the skill
```

- **No proficiency bars / percentages** (unverifiable).
- **No leading "years-of-experience-per-stack" marketing.** Duration claims appear only when accurate and genuinely useful; prefer evidence.

---

## Writing Post

```
slug                 - URL slug
title
date
tags                 - topics
excerpt              - short summary for the index
type                 - article | retrospective | lesson | experiment
body                 - MDX
related[optional]    - related posts / projects
```

**Content policy:** one excellent article beats five weak ones. Do not create content merely to populate the section.

---

## Contact / About fields

```
recruiterClarity:
  rolesOfInterest[]   - types of roles sought
  location            - location / timezone
  remote              - remote / hybrid / on-site preference (where applicable)
  workAuthorization   - where applicable
  availability        - where appropriate
  relevantTech[]      - relevant technologies

contactChannels:      - all platforms where convenient (validated, no secrets exposed)
whatsapp:
  number              - real, validated WhatsApp number (Phase 0 input; NO placeholder may ship — ADR-005)
  ctaLabel            - approved copy: "Chat on WhatsApp" / "Chat with me"
  prefilledText       - optional, approved generic opener ("" if no approved copy → plain deep link)
resume:
  pdf                 - first-class, brand-consistent downloadable resume
```

---

## Consistency rule

- Content and marketing copy must be **accurate** — never invent metrics or exaggerate experience.
- Skills link to **real evidence**; every claim is backed by a project, case study, note, or achievement.
- The resume is **kept synchronized** with the site's key claims and dates.

---

## Content Readiness Checklist

> **Everything below is real material that Racheal must supply before implementation.** Nothing on this site is invented, estimated, or extrapolated — per the "evidence over claims" rule and `docs/implementation-plan.md` Phase 0. Each item is a source the build depends on; any field below left blank is treated as **"not ready,"** not "assume a value."

### 1. Positioning / profile facts (site-wide)

- [ ] Roles of interest (recruiter clarity)
- [ ] Location / timezone + remote / hybrid / on-site preference
- [ ] Work authorization, where applicable
- [ ] Availability line
- [ ] Relevant technologies (for recruiter clarity)
- [ ] `hello@` contact preferences + "what happens next / reply window" line
- [ ] Contact channels to list (validated links): email, GitHub, LinkedIn, others
- [ ] **WhatsApp number** (real, validated — for the direct-chat CTA; **no placeholder may ship**)
- [ ] Approved WhatsApp CTA copy ("Chat on WhatsApp" / "Chat with me") and, **if** a prefilled message is wanted, the approved generic opener text (otherwise the plain deep link ships)
- [ ] Portrait (one purposeful image; alt-text description)

### 2. Resume / CV

- [ ] Source of truth for roles, dates, achievements (so PDF and site stay synchronized)
- [ ] Preferred brand treatment for the PDF (uses design system; layout sign-off)

### 3. Experience / journey (About timeline)

- [ ] Each role: title, organization, start date, end date (or "current"), 3–5 concrete, evidence-backed contributions per role
- [ ] Personal layer material: working principles, interests, the story behind the brand

### 4. Skills & achievements

- [ ] Skill list grouped by category (Languages / Frontend / Backend / Data / Tooling)
- [ ] **Evidence per skill**: the case-study slug or writing-post slug that demonstrates it (no skill without evidence)
- [ ] Achievements: each with a specific, verifiable claim — value, date, and/or verifiable link; **no invented metrics** (e.g., no "improved performance 50%" without a real number + source)

### 5. Writing (single publishing surface)

- [ ] At least one genuinely useful post before launch (policy: no filler). For each post:
  - [ ] Title, publish date, type (article / retrospective / lesson / experiment), tags, excerpt
  - [ ] Full body (original, specific, sounds like Racheal)

### 6. The 3 flagship projects — per-project requirements

For **each** of the 3 flagship projects supply all of the following (this is the full case-study source, mirroring the content model):

- [ ] `slug` and `title`
- [ ] One-line, outcome-led `summary` (used on Home + Work index)
- [ ] Tags (technologies)
- [ ] Featured/ordering intent
- [ ] Role — what Racheal personally owned
- [ ] Timeline (start/end or "ongoing")
- [ ] Links: `liveUrl` (if public), `repoUrl` (if public); each **validated**; if not public, state so explicitly
- [ ] Imagery: screenshots / artifacts, each with alt text + aspect ratio
- [ ] **Case-study narrative** covering, in order:
  - [ ] **Problem** — the real challenge and its context
  - [ ] **Context** — environment, constraints, conditions
  - [ ] **My role** — what was owned
  - [ ] **Constraints** — technical, time, team, resource
  - [ ] **Thinking** — how the problem was approached and why
  - [ ] **Technical decisions** — key choices with reasoning ("why this, not that")
  - [ ] **Trade-offs** — what was consciously given up and why
  - [ ] **Implementation** — how it was actually built (architecture, key parts)
  - [ ] **Outcome** — measurable results **only if genuine and accurate** (with source), and/or honest reflection
  - [ ] **Lessons** — honest reflections
- [ ] Optional: architecture sketch/diagram to render

> **Right-to-ship rule:** a project is eligible for the site only when its links, imagery, and full narrative above are supplied and accurate. A thin or placeholder case study will not be shipped.

---

*Content model reflects the approved planning direction.*
