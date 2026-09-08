# UX System — Olayode Racheal Portfolio

> Behavioral layer complementing `docs/design-system.md` (visuals) and `docs/requirements.md` (product requirements). This document defines **how** the site behaves: navigation, journeys, reading experiences, form flows, theme handling, and accessibility behavior. Implementation must follow these flows; where requirements and this document disagree, requirements wins until a contradiction is resolved.

---

## 1. Navigation

### Desktop (≥ `lg`)
- Top header: wordmark (links Home) left; primary nav **Work · About · Writing · Contact**; theme toggle at far right.
- **Active state:** exact route match shows an active marker (accent dot + hairline underline). Section never highlighted by color alone — label receives a weight change too.
- **Sticky:** header sticks on scroll (`position: sticky`), `--paper` background, hairline bottom rule. Content scrolls beneath; no translucency/blur.
- **No secondary nav row in v1.** Breadcrumbs are not used on flat pages; case-study/writing pages provide a "← Back to Work / Writing" back-link instead.

### Mobile (< `lg`)
- Four destinations collapse into a **modal/overlay menu** (full-height, `--paper`, hairline partition). Opener is a labelled menu button ("Open menu" / "Close menu" with `aria-expanded`).
- Menu opens over content; focus moves into the menu; **focus trapped** while open; `Esc` closes and restores focus to the opener.
- The menu is **usable without JS** (fallback: if JS fails, the primary header remains as a horizontal scrolling or wrapped link row — no orphaned navigation) and with keyboard/assistive tech.
- Theme toggle stays reachable in the mobile panel.

### Footer (all breakpoints)
- Full sitemap: Work, About, Writing, Contact + resume link + contact channels + theme toggle + colophon. Footer navigation is redundant with the header so no link is ever orphaned.

### Behavior rules
- Every top-level page reachable in ≤ 2 clicks from Home; every route linked (header or footer).
- All nav links operable by keyboard; focus order = DOM order.
- No link depends on hover to become discoverable.

---

## 2. Homepage

### Purpose
Answer five things, in this order, without becoming a six-section generic template:
1. **Who I am** — "Racheal — product-minded full-stack software engineer."
2. **What I build** — one specific, evidence-led line (the core message).
3. **Strongest evidence** — 3 selected projects, outcome-led.
4. **Credibility** — quiet, underpinned by the work shown; a compact recruiter clarity line.
5. **Next action** — a clear CTA to Work or Contact.

### Journey (intended path)
1. **Hero / positioning** (first viewport): name + one-line positioning ("Product-minded full-stack software engineer"), a single supporting line, CTAs "View my work" · "Contact me". Distinct wordmark present. **No** terminal, no title claims.
2. **Selected work** (immediately below): 3 strongest projects as cards — title, one-line outcome, tags → each opens its case study. *The strongest evidence is the first deep content a visitor meets.*
3. **Now band** (single, small): one current-focus line ("Currently: <one line, e.g., building X / open to Y">). Small homepage section, **not** a page.
4. **Recruiter clarity (unobtrusive):** a compact, human line/block: roles of interest · location / remote / authorization / availability · relevant tech. Linked to About for depth.
5. **Writing teaser:** 1–2 recent entries (title, date, one-line excerpt) → Writing.
6. **Contact path:** short closing line + "Start a conversation" CTA → Contact.

### Behavior
- Above the fold, a visitor must grasp who/what/why-to-read in < 10 seconds.
- Scroll reveals are subtle (§7 of design system); no element is decorative — every block links or states a claim evidenced elsewhere.
- Both conversion paths reachable without deep scrolling.

---

## 3. Work (project index)

- **Discovery model:** an editorial list/index, not a filtered dashboard. At 3 projects, **no filtering** (re-affirmed in requirements).
- **Ordering:** editorial — strongest/featured first; an explicit `featured`/order field in content controls placement (see `docs/content-model.md`).
- **Card behavior:** whole-card link to case study; accessible name = project title; keyboard-focusable; hover raises surface + moves arrow (no decorative motion).
- Each card shows: title, role, one-line outcome, tech tags, thumbnail (alt text).
- **Case-study entry:** a clear "Read the case study" affordance (arrow + label) so intent is obvious.

---

## 4. Case studies (/work/[slug])

### Reading experience
A structured long-form narrative with a consistent editored layout:

1. **Header block** — title (display), one-line outcome summary, role, timeline, tech tags; live/repo links where genuine (validated).
2. **Chapter sequence** (scroll narrative, mono chapter markers):
   - Problem → Context → Role → Constraints → Thinking → Technical decisions → Trade-offs → Implementation → Outcome → Lessons
   - Each chapter an H2 with a mono marker ("01 · Problem"); the story flows, not a table dump.
3. **Evidence inline:** architecture sketch/notes, code excerpts (mono, styled), and a **metrics/evidence block** for genuine outcomes only (mono label + display value, hairline grid).
4. **End matter:** honest "Lessons" chapter; related-project + "Back to Work" links; contact nudge ("Similar problems? Let's talk." → Contact).

### Behavior
- Font size comfortable (body-lg, measure ≤ 70ch); reading column centered-left, no side-rail noise.
- Long sections use internal anchors ("On this page" mini-nav **only if** the case study is very long — optional, P2).
- No parallax, no reading-progress theatrics; a subtle top-of-page item is acceptable (P2) but not required.
- Images lazy-load, have alt text, correct aspect ratios.

---

## 5. About

- **Evidence-led, not exhaustive autobiography.** Structure: warm intro → journey/experience timeline (dated; title + org + dates + concrete contributions) → achievements (within About; receipts, verifiable) → skills (evidence-linked only) → personal layer (working principles, interests, the story behind the brand) → portrait + recruiter clarity.
- Recruiter-critical details (roles, location/remote/authorization, availability, tech) appear in a clear, human, compact block — never an ATS dump.
- Achievements live **on About** in v1; a dedicated page is deferred (see requirements).
- Skills are tags linked to their evidence (case study or writing post). No bars/percentages, no leading years-per-stack marketing (see requirements).

### Behavior
- Timeline is a semantic list; dates readable both as ranges and on mobile (no wide table).
- Profile links (GitHub/LinkedIn/resume) resolved and validated at build; resume is a first-class download link here and on Contact.

---

## 6. Writing (/writing + /writing/[slug])

### Discovery (index)
- Editorial index of entries: title, date, type marker (article / retrospective / lesson / experiment), one-line excerpt, tags. Sorted newest-first.
- **No search, no pagination, no filter** at v1 scale (re-affirmed in requirements).
- Quality the signal: only entries that clear the content policy appear; a sparse, excellent index beats a filled weak one.

### Article reading experience
- Header: title (display), date, type, tags, one-line excerpt.
- Body: prose column (measure/chapter markers per design system); genuine code in styled mono blocks.
- **End matter:** "Continue reading" links to related notes/projects (only when genuinely related); "Back to Writing" link.
- Metadata visible (date, reading time if trivially calculable at build).

### Related content
- Only when genuinely related (same project, adjacent topic). No automated "recent posts" filler if irrelevant.

---

## 7. Contact

**Two distinct contact channels (ADR-005):** the validated form (primary) and direct WhatsApp (secondary, frontend-only). CTA hierarchy is explicit — the form leads, WhatsApp complements; neither competes with the other.

### Flow (form channel)
1. **Landing:** the two in-form paths presented clearly — **"I have a role"** / **"Let's build together"** — each with a one-line description of what happens next.
2. **Form:** the chosen path pre-fills/sets the message context (`context` field). Fields: name, email, optional context/interest, message.
3. **Client-side pre-validation:** format/length/required with **inline errors** and a summary for screen readers.
4. **Submission → backend → delivery:** fetch to the backend contact endpoint (`POST`) → validation + honeypot/rate limiting → **`ContactDelivery` adapter → Brevo → email** (ADR-004). No secrets in frontend (ADR-002/ADR-004).
5. **States:**
   - *Submitting:* button disabled + "Sending…" (aria-live polite).
   - *Success:* clear confirmation ("Message sent — I'll reply within <X days>") in a `role="status"` region; form clears.
   - *Failure:* explicit, human error ("Couldn't send. Check your connection and try again, or chat with me / email me directly."), `role="alert"`, form content preserved.
   - *Rate-limited:* honest message with a short retry window + encouragement to use a direct channel — never a silent block.

### Flow (WhatsApp channel, secondary)
1. **CTA placement:** the Contact experience (as a paired secondary CTA beside/under the form) **and** at least one other approved location (the site footer; About as approved alternative).
2. **Copy:** "Chat on WhatsApp" / "Chat with me" — clear, human, truthful.
3. **Accessibility & indications:** accessible label (e.g., `aria-label="Chat with me on WhatsApp"`); icon + text signal it opens an external app; target/`rel` handled at implementation (`noopener`/`noreferrer` where a new context is opened).
4. **Deep link:** `https://wa.me/<number>` built from the **Phase 0 validated number only** — no placeholders; until the number is supplied, the CTA is not rendered/shipped. Optional approved generic prefilled text (`?text=`); without approved copy, ship the plain deep link.
5. **Not a floating widget** at any viewport; it is an inline, labeled control.
6. **Platform behavior:** on mobile the deep link opens the WhatsApp app on the device; on desktop it opens the WhatsApp web/`wa.me` flow. The CTA behaves the same on both — no backend, no extra UI, and the target never comes before the form in prominence.

### Alternate path
- Direct channels always listed and validated (no secrets exposed); in failure states, both the direct-email and WhatsApp fallbacks are referenced — the visitor always has a working path.

### Abuse protection UX
- Honeypot field is visually hidden and `aria-hidden`; genuine users never see or fill it. Users are never asked to solve CAPTCHA in v1 (rate limits + honeypot suffice at this traffic). WhatsApp channel needs no abuse protection (no backend).

### Form behavior details
- Focus moves to the error summary on failed submit.
- Success/failure states announced via `aria-live` regions.
- `autocomplete="name"` / `autocomplete="email"` to reduce friction.

---

## 8. Theme

- **Manual light/dark toggle only** (confirmed: no auto-detection — see requirements).
- Persistence: a small stored key (e.g., `localStorage`); on load, apply stored preference **before first paint** (inline script in `head`) to avoid flash-of-wrong-theme (FOIT/CLS guard).
- **Default = light** (brand's default surface); dark is the dramatic counterpoint the visitor chooses.
- If JS is unavailable, the site renders light by default (accessible, no degradation of content).
- Toggle is an accessible button with `aria-label` reflecting the *resulting* state; transition is a short, subtle crossfade (≤ 200ms) — no color-based flashing.
- `prefers-color-scheme` is intentionally **not** used to auto-switch, per the approved decision; it may only inform the initial suggestion in a future revision if Racheal approves.

---

## 9. Accessibility behavior (UX level)

- **Keyboard:** skip-to-content link first in DOM; header/menu/footer all operable by keyboard; focus trapped in the mobile menu; `Esc` closes overlays; back-link restores focus sensibly.
- **Focus:** visible 2px ring (design system §8); focus order matches reading order; no focus loss on route change (manage heading focus for SPAs only if the app becomes client-rendered — with static-first, full page loads keep native behavior).
- **Screen readers:** landmarks (header/nav/main/footer); one `h1`/page; form labels + `aria-describedby`; live regions for form results; icons `aria-hidden` with text alternatives; external-link labels include destination.
- **Reduced motion:** entrance reveals and transitions disabled under `prefers-reduced-motion`; all content fully readable in that mode.
- **Error messaging:** inline field errors + a page-level error summary; messages are specific, human, and actionable — never raw validation jargon.
- **Color independence:** every state change has a non-color indicator (icon, underline, weight, shape).

---

## 10. Page-by-page journey summary (map)

| Page | Primary objective | Exit actions |
|---|---|---|
| Home | Position + show best evidence in seconds | → Work / case study / Writing / Contact |
| Work | Choose a project to read deeply | → case study |
| Case study | Convince through depth | → related case study / Contact |
| About | Build trust + recruiter clarity | → Work / resume / Contact |
| Writing | Demonstrate thinking + authority | → article / related note / Contact |
| Contact | Convert a conversation | → submit form / WhatsApp / direct channel / resume |

---

*UX reflects and elaborates the approved planning direction; any change to these flows must be recorded before implementation.*