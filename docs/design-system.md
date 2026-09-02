# Design System — Olayode Racheal Portfolio

> The authoritative visual specification, referenced by `AGENTS.md` and `docs/brand.md`. Every color, type decision, spacing token, and component behavior defined here is binding for implementation. If a design choice is not specified here or in `docs/brand.md`, introduce it only with a stated reason.
>
> Identity anchor: **editorial × modern technology × feminine** — purple dominant, pink accent, restraint as power, typography as the primary vehicle of distinctiveness.
>
> Contrast values cited below were **computed against WCAG 2.1** and all named text/background pairs meet **AA (4.5:1 normal / 3:1 large & UI)**. Tokens are expressed as CSS custom properties; a dark-mode override via `[data-theme="dark"]` is assumed.

---

## 1. Brand Foundation

### Visual personality

- **Editorial:** strong typographic hierarchy, generous whitespace, magazine-like composition, hairline rules, confident negative space.
- **Modern technology:** crisp, precise, contemporary; subtle technical cues (mono labels, specimen-like "field" elements, measurable grids) — never cliché developer chrome.
- **Feminine:** warm, graceful, expressive — through type curves, warm neutrals, and restrained pink accents. Never childish or decorative.

### Design principles

1. **Intentionality over decoration** — every element earns its place and has a stated reason.
2. **Substance over surface** — polish never hides weak content; type and layout carry identity.
3. **Restraint is power** — purple dominates, pink whispers, whitespace breathes, type leads.
4. **Proof over claims** — evidence-first visual treatment of projects and metrics; no invented numbers.
5. **Accessible elegance** — sophistication achieved with clarity; WCAG AA is a design constraint, not a fix-up step.
6. **Performance by default** — minimal client JS, optimized fonts, no decorative payloads.
7. **Maintainable** — tokens, few components, documented; nothing exists without a purpose.

### What the design must never become

- Generic developer-template aesthetic; AI-generated website look (predictable gradients, glassmorphism, floating blobs, excessive rounded cards).
- "Girl-coded" cuteness (childish, glittery, overly pink, decorative).
- Developer-cliché theatrics (terminal animations, fake typing, Matrix/`0101` decoration, neon).
- A visual playground with no substance.

---

## 2. Color System

### 2.1 Token architecture

- **Primitives** (raw scale values) → **semantic tokens** (bound to roles). Components reference semantic tokens only.
- Light theme is the default (`:root` / `[data-theme="light"]`); dark theme overrides via `[data-theme="dark"]`.

### 2.2 Palette (primitive scale)

| Token (primitive) | Value | Role |
|---|---|---|
| `purple-950` | `#2A1034` | deepest aubergine (rarely used) |
| `purple-900` | `#3A1650` | deep plums & pressed states |
| `purple-800` | `#4A1D68` | deep brand surface |
| `purple-700` | `#5B2A86` | brand anchor / dark surface buttons |
| `purple-600` | `#6D3FA8` | interactive purple |
| `purple-500` | `#7E4FC2` | links on light, hover accents |
| `purple-300` | `#B79ADE` | dark-theme links, large accents |
| `purple-200` | `#D3C0EA` | tag/field borders (light) |
| `purple-100` | `#E9E0F4` | tinted surfaces, tag backgrounds (light) |
| `pink-700` | `#9E2A60` | strong pink accent text (light) |
| `pink-600` | `#B93A74` | primary pink accent |
| `pink-500` | `#D14F8E` | decorative/large-text pink; **not** for small text on white |
| `pink-300` | `#EE9CC2` | minimal dark-theme pink tints |
| `pink-100` | `#FBE3EE` | pink tinted surfaces (light) |
| `lavender` | `#D8CCE8` | bridges purple & pink; depth/surface accents |

### 2.3 Semantic tokens — light theme

| Semantic token | Value | Usage | Contrast (verified) |
|---|---|---|---|
| `--paper` | `#FCFAF8` | page background | — |
| `--surface` | `#F5F0F8` | cards, inputs, raised blocks | 1.08 : 1 vs paper (background layering only) |
| `--surface-2` | `#EFE7F4` | nested/side-by-side blocks | used for depth, not boundaries |
| `--ink` | `#2A1535` | primary text, headings | 16.04 : 1 on paper / 14.88 on surface |
| `--ink-muted` | `#5B4E66` | secondary text, captions on white | 7.4 : 1 on paper / 6.86 on surface / 6.38 on surface-2 |
| `--ink-faint` | `#6E5F7A` | meta labels (mono) **& control borders** | 5.63 : 1 on paper / 5.22 on surface |
| `--border` (hairline) | `#E0D6E8` | decorative dividers, card rules | decorative only — carries no meaning |
| `--border-strong` | `#6E5F7A` | interactive control outlines (inputs, focus-managed containers) | 5.63 : 1 on paper → ≥ 3:1 UI requirement ✓ |
| `--brand-primary` | `#5B2A86` | brand blocks, chips, hero fields | white text on it = 9.9 : 1 |
| `--interactive` | `#6D3FA8` | primary buttons, focus rings, active elements | white text = 7.18 : 1; as text on paper = 6.89 : 1 |
| `--link` | `#6D3FA8` | inline links (light) | 6.89 : 1 on paper |
| `--link-hover` | `#7E4FC2` | hovered links (light) | 5.33 : 1 on paper |
| `--accent` | `#B93A74` | restrained pink accent (hover highlights, micro-emphasis) | as text on paper 5.14 : 1; white on top 5.36 : 1 ✓ |
| `--accent-strong` | `#9E2A60` | accent text needing more weight (light) | 6.83 : 1 on paper ✓ |
| `--accent-tint` | `#FBE3EE` | pink tinted surfaces (light) | ink on it 13.78 : 1 |
| `--on-brand` | `#FFFFFF` | text/icon on brand & interactive fills | see ratios above |

### 2.4 Semantic tokens — dark theme

| Semantic token | Value | Usage | Contrast (verified) |
|---|---|---|---|
| `--paper` | `#1B0F26` | page background (deep aubergine, never pure black) | — |
| `--surface` | `#241631` | cards, inputs, raised blocks | 1.08 : 1 vs paper (layering only) |
| `--surface-2` | `#2D1A3D` | nested blocks | layering only |
| `--ink` | `#F3EDFA` | primary text | 16.02 : 1 on paper / 14.83 on surface |
| `--ink-muted` | `#B6A9C6` | secondary text | 8.29 : 1 on paper / 7.68 on surface / 7.15 on surface-2 |
| `--ink-faint` | `#A795B8` | meta labels | 6.68 : 1 on paper |
| `--border` (hairline) | `#3D2A4C` | decorative rules | decorative only |
| `--border-strong` | `#907BA9` | interactive control outlines | 4.89 : 1 on paper ✓ (≥ 3:1) |
| `--brand-primary` | `#5B2A86` | brand blocks (dark) | light text on it 8.63 : 1 |
| `--interactive` | `#6D3FA8` | primary buttons, focus rings | white text 7.18 : 1 ✓ |
| `--link` | `#B79AE0` | inline links (dark) | 7.62 : 1 on paper / 7.06 on surface |
| `--link-hover` | `#E0D2F5` | hovered links (dark) | higher than `--link` |
| `--accent` | `#E78AB0` | restrained pink accent (dark) | 7.58 : 1 on paper / 7.02 on surface |
| `--accent-tint` | `#3A2238` | pink tinted surfaces (dark) | muted text on it ≥ 4.5 ✓ |
| `--on-brand` | `#FFFFFF` | text on brand fills | see ratios above |

### 2.5 Semantic / status colors

| Status | Light value | Dark value | Notes |
|---|---|---|---|
| Success | `#2F6B45` | `#7CC896` | ≥ 4.5 : 1 on paper in both themes (verified); white text on light value = 6.34 : 1 |
| Warning | `#8A5A00` | `#E3B25C` | verified ≥ 4.5 : 1 in both themes |
| Error / danger | `#A62D3D` | `#E58A96` | verified ≥ 4.5 : 1 in both themes |
| Info | `#3A5F8A` | `#8FB6E8` | verified ≥ 4.5 : 1 in both themes |

Used **only when meaningful** (form errors, honeypot notice, form success) — muted, never saturated novelty.

### 2.6 Rules of use

- **Purple leads, pink whispers.** Pink is reserved for hover accents, small emphasis, and micro-highlights — never floods an interface.
- **Never place two accent colors at equal weight** on one surface.
- **Semantic meaning is never carried by color alone** — always pair with text/iconography.
- **Control boundaries must be ≥ 3 : 1** against their background. Hairline `--border` is decorative; interactive controls use `--border-strong` or the focus ring.
- **Monochrome fidelity:** every brand element renders correctly in a single color (wordmark, CV, print).

---

## 3. Typography

### 3.1 Typefaces

Three families max — restraint over novelty. All self-hosted (variable fonts where available), preloaded, `font-display: swap`.

| Role | Typeface | Weights | Character |
|---|---|---|---|
| Display / headings / wordmark | **Fraunces** (variable, incl. optical size & softness axes) | 300–700 | Editorial serif with warmth and a delicate, feminine softness; distinctive, contemporary, not a cliché display face |
| Body / UI | **Karla** | 400, 500, 700 (+400 italic) | Warmly humanist sans; highly legible for reading and clean in UI |
| Code / labels / meta | **IBM Plex Mono** | 400, 500 | Precise, technical, restrained; used for meta, tags, chapter labels, code |

**Fallback stacks**

```
--font-display: "Fraunces", Georgia, "Times New Roman", ui-serif, serif;
--font-body: "Karla", -apple-system, "Segoe UI", "Helvetica Neue", Arial, ui-sans-serif, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
```

### 3.2 Type scale (fluid, modular)

Base size **16px** (`1rem`); scale ~1.25–1.333. Display sizes use `clamp()` so headings scale fluidly without breakpoint noise.

| Token | Size | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|
| `text-display-xl` | `clamp(2.625rem, 6vw, 4.5rem)` (42–72px) | 1.0–1.05 | `-0.02em` | Home hero headline |
| `text-display-lg` | `clamp(2.25rem, 5vw, 3.5rem)` (36–56px) | 1.05–1.1 | `-0.015em` | Page H1 / big section statements |
| `text-display` | `clamp(1.875rem, 4vw, 2.75rem)` (30–44px) | 1.1 | `-0.01em` | Case-study titles |
| `text-h2` | `clamp(1.5rem, 3vw, 2rem)` (24–32px) | 1.15 | `-0.01em` | Section headings |
| `text-h3` | `clamp(1.25rem, 2.5vw, 1.5rem)` (20–24px) | 1.25 | `-0.005em` | Sub-section headings |
| `text-h4` | `1.125rem` (18px) | 1.3 | `0` | Minor headings, card titles |
| `text-body` | `1rem` (16px) | 1.65 | `0` | Default text |
| `text-body-lg` | `1.125rem` (18px) | 1.7 | `0` | Prose lead paragraphs |
| `text-meta` | `0.8125rem` (13px) | 1.5 | `0.02em` | Meta, timestamps (ink-muted) |
| `text-label` | `0.75rem` (12px) | 1.4 | `0.12em` | Mono uppercase labels, chapter markers, tags |

### 3.3 Hierarchy & treatment

- **Primary vehicle of distinctiveness:** display serif carries the wordmark and headlines. Use it deliberately, not everywhere.
- **Labels/meta** are **IBM Plex Mono**, uppercase, `0.12em` tracking for editorial chapter markers ("01 · Problem") and technical labels.
- **Prose measure:** 65–72ch (max 70ch) for body; case-study and writing bodies at `text-body-lg` with generous line-height.
- **Heading hierarchy:** one `h1` per page; H2/H3 mirror the content outline; headings use `--ink`, never muted.
- **Wordmark ("Racheal")** in Fraunces, optical size small-to-medium, tight tracking — see `docs/brand.md` §10 for the mark direction.
- **No fake terminal/typewriter effects**; monospace is reserved for genuine code, labels, and data.

---

## 4. Layout

### 4.1 Canvas

| Token | Value | Usage |
|---|---|---|
| `--max-width` | `1120px` | main page container |
| `--max-width-prose` | `720px` | article / case-study reading column |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` | page side gutters |
| `--grid-cols` | `12` | desktop grid columns (stacked on mobile) |

### 4.2 Spacing scale (4px base)

```
4  8  12  16  20  24  32  40  48  64  80  96  128
```

| Token | Value | Typical use |
|---|---|---|
| `space-1` | 4px | hairlines, icon gaps |
| `space-2` | 8px | compact gaps (tag gaps, list spacing) |
| `space-3` | 12px | small component padding |
| `space-4` | 16px | default component padding |
| `space-5` | 20px | card padding (compact) |
| `space-6` | 24px | card/block padding    |
| `space-8` | 32px | section-internal rhythm |
| `space-10` | 40px | module spacing |
| `space-12` | 48px | large module spacing |
| `space-14` | 64px | between page sections |
| `space-16` | 96px | major section transitions |
| `space-20` | 128px | footer/pre-footer breathing room |

Sections use **generous vertical rhythm** (`clamp(4rem, 8vw, 7rem)` between sections on large pages) to express the editorial identity.

### 4.3 Grid & behavior

- 12-column grid at `lg`+; 6-column at `md`; single column below.
- Editorial asymmetry is allowed via mixed column spans (e.g., 7/5 splits), but alignment must stay on the grid — "measurable structure" is part of the brand.
- Full-bleed hero and footer; contained content columns elsewhere.

### 4.4 Breakpoints

| Breakpoint | Min width | Behavior |
|---|---|---|
| Base | 0–639px | single column; fluid type |
| `sm` | 640px | sidebar-free two-up starts |
| `md` | 768px | 6-col grid; nav may show inline |
| `lg` | 1024px | 12-col grid; full desktop layout |
| `xl` | 1280px | container locks to 1120px |

---

## 5. Shape (restraint)

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `2px` | tags, small spec elements |
| `--radius-md` | `4px` | cards, inputs, buttons |
| `--radius-lg` | `6px` | large cards, images |
| `--radius-full` | `999px` | pills only where editorial (e.g., status dot) |

**Border treatment:** 1px hairlines (`--border`) for editorial rules; `--border-strong` for interactive outlines. Editorial corners (2–6px), **not** heavy rounding — rounding suggests playfulness, which conflicts with the identity.

**Shadows / elevation philosophy:** flat-first, one elevation step only.
- Default: no shadow — structure via hairline rules and spacing.
- Elevated (menus, mobile sheet, sticky elements): a single soft shadow, e.g. `0 8px 24px rgba(42, 21, 53, 0.12)` (light) / `0 10px 30px rgba(0, 0, 0, 0.4)` (dark), plus a hairline border.
- No gradient blobs, no inner-glow novelty, no floating shadows.

---

## 6. Components

Behavior + treatment for the v1 component set. All interactive components expose visible focus and meet touch targets (§8).

### Buttons
- **Primary:** `--interactive` fill, `--on-brand` text, radius `4px`, padding `0.75rem 1.25rem`, weight 500 body; hover: `purple-700` (`#4A1D68` light / `#7E4FC2` dark accent lift) — via token `--interactive-hover`; active: `purple-900`; focus ring visible.
- **Secondary:** transparent fill, `1px` `--border-strong` border, `--ink` text; hover: `--surface` fill + `--interactive` text.
- **Ghost/link:** text-only, `--link` color, underline on hover; used for "Continue reading" style actions.
- **WhatsApp CTA ("Chat on WhatsApp" / "Chat with me"):** styled as a **secondary/outline or ghost** control with icon + external-app indication — never as an oversized floating widget; the form CTA remains visually primary on Contact (ADR-005). Accessible label via `aria-label`.
- **Danger:** `--error` text, `1px` `--error` border; used only where destructive.
- Buttons always match their state with more than color (icon/text change on destructive confirm).

### Links
- Inline links: `--link` (light) / `--link` (dark), underline by default in prose; no underline in nav (nav uses active markers) — hover shifts to `--link-hover` and thickens/colored underline.
- External links carry an accessible external-link icon and `aria-label` including the destination (e.g., "View repository on GitHub").
- Ensure visible focus ring on all link/button-like elements.

### Navigation
- Desktop top bar: logo/wordmark left, 4 destinations (`Work · About · Writing · Contact`) right, theme toggle far-right.
- Active section: current page gets an **active marker** — a short `2px` underline or accent dot under the label (never color-alone; pair with text styling).
- Sticky behavior: header sticks to top on scroll; content scrolls beneath; header background is `--paper` with a hairline bottom rule (not translucent).
- See `docs/ux.md` for interaction specifics.

### Theme toggle
- Accessible `<button>` with `aria-label` that reflects resulting state ("Switch to dark theme"); shows sun/moon glyph (or wordmark pair) without relying on color alone.
- State persisted; see `docs/ux.md` §Theme.

### Project cards (Work + Home selected work)
- Hairline-framed card (`--border`) on `--paper`/`--surface`; radius `4px`.
- Structure: thumbnail (alt text; 3:2 aspect, object-cover), title (display, `h4`-scale on cards), one-line outcome, tech tags (mono), arrow/chevron affordance.
- Hover: `--surface` raise, hairline → `--border-strong`, arrow shifts; no heavy animation.
- Whole card is a single link region with accessible name = project title (inner text still accessible).

### Tags
- Mono lowercase, `--text-label` sizing, `--purple-100` bg with `--purple-900` text (light) / `--surface-2` bg with `--ink` text (dark); radius `2px`; padding `2–4px 8px`.
- Tags are semantic chips (not shrunk links unless a target exists); when linked to a case study, they behave as links.

### Forms / inputs / textarea
- Label: `--text-label` mono, uppercase, `--ink-muted`.
- Control: `--paper` (light) / `--surface` (dark) fill, `1px` `--border-strong`, radius `4px`, padding `0.75rem`, `--ink` text; placeholder `--ink-faint` (≥ 4.5 : 1 where meaningful).
- Focus: `2px` `--interactive` ring + no border change alone (indicator never color-only); border-strong base keeps outline visible pre-focus.
- Invalid: `--error` border + icon + `aria-describedby` error text; never only red.
- Selects and textareas share the control treatment; textarea has comfortable min-height (`8rem+`).

### Alerts
- Success / warning / error / info: tinted surface (`--surface-2` or semantic tint token), semantic icon, semantic text color, radius `4px`, hairline border in semantic hue.
- Role/structure: success after submit uses `role="status"`; errors use `aria-live`/`role="alert"` region.

### Badges
- Compact mono label used for status/phase markers (e.g., "V1 · static-first", "Case study"); `--purple-100`/`purple-900` (light), `--surface-2`/`--ink` (dark); radius `2px`; no emoji.

### Article / case-study elements
- **Chapter markers:** mono labels ("01 · PROBLEM") above H2s in `--ink-muted`/`--accent`.
- **Prose:** body-lg, measure ≤ 70ch; headings per §3.2; blockquote with left hairline + `--ink-muted` italic; horizontal rules as `--border` hairlines.
- **Code:** `--font-mono`, `--surface` block with hairline; syntax highlighting uses only neutral + purple tone variations (no neon).
- **Metrics/evidence blocks:** a small stat grid (label in mono, value in display serif) with hairline separators — "specimen" character that signals rigor without charts.
- **Tables:** hairline grid, sticky caption-row on mobile scroll; horizontal scroll within prose column.
- **Images:** hairline frame, correct aspect ratio, alt text, lazy-load below fold.

### Footer
- Multi-column: sitemap (Work / About / Writing / Contact), contact channels (validated links), resume link, theme toggle, colophon line ("Designed & built by Racheal · 2026" — updated at implementation).
- Background `--paper` with top hairline; spacing `space-16`; muted meta text.

---

## 7. Motion

### Principles
- Motion must **communicate state or focus**, never decorate.
- Duration short (150–250ms), easing gentle; no bounce, no marquee, no parallax excess, no autoplay.
- As a system, the site should *feel* calm and editorial.

### Timing tokens
| Token | Value | Use |
|---|---|---|
| `duration-fast` | 120ms | hover, focus, active |
| `duration-base` | 200ms | theme switch, menu open/close |
| `duration-slow` | 300ms | entrance reveals (rare) |
| easing | `cubic-bezier(0.2, 0, 0, 1)` | universal |

### Allowed animation types
- Fade + 8–12px rise on scroll-into-view entrances (once, subtle, staggered at most ~60ms).
- Opacity/transform crossfade for theme toggle and route transitions.
- Cheeky but restrained: arrow nudge on buttons/cards, hairline color shifts.

### Where motion must NOT be used
- Hiding or revealing essential information.
- Continuous/looping animation of any kind.
- Anything that fights reading (e.g., text scramble, parallax on prose).

### Reduced motion
- `prefers-reduced-motion: reduce` → disable entrance reveals; transition durations collapse toward 0; no transform animation; links/buttons still show instant state change (color is enough).
- No essential information is conveyed by motion in any state.

---

## 8. Accessibility

- **Contrast:** ≥ 4.5 : 1 normal text, ≥ 3 : 1 large text and UI components in BOTH themes (verified in §2). Semantic status colors pass on their surfaces in both themes.
- **Focus states:** visible `2px` offset ring in `--interactive` (light) / `--link` (dark), minimum 2px from element edge; never removed; visible over any background.
- **Keyboard:** full tab order follows DOM/reading order; skip-to-content link first in DOM; all interactive elements operable by keyboard; no keyboard traps.
- **Touch targets:** ≥ 44 × 44 px for primary controls; inline text links exempt but given adequate line spacing/padding.
- **Reduced motion:** as §7; motion never required to understand content.
- **Semantics:** landmark regions (header, nav, main, footer); one `h1` per page; lists for timelines/tags; native elements (button, a, form controls) over re-invented widgets; ARIA only where native HTML is insufficient.
- **Forms:** visible labels (mono uppercase), `aria-required`, `aria-describedby` for hints/errors, error summary + inline errors with `aria-live`/`role="alert"`, `autocomplete` attributes on name/email.
- **Images:** meaningful alt; decorative images `alt=""`; no text-in-image where HTML suffices.
- **Color independence:** color is never the only signal (add icons/underline/text).

---

## 9. Responsive Behavior

- **Mobile-first.** Single column, fluid type via `clamp`, gutters 20px (base) scaling to 40px (xl).
- **Navigation:** four destinations collapse into an accessible mobile sheet/overlay under `lg`; see `docs/ux.md` §Navigation.
- **Grids:** 12-col at `lg+`, 6-col at `md`, stacked below; cards stack full-width on mobile.
- **Prose & case studies:** measure auto-narrows; chapter labels and metrics stack; stat grids wrap; tables scroll horizontally inside the prose column.
- **Hero:** stacks (headline → statement → CTAs); display sizes clamp down; portrait reflows.
- **Touch:** all controls meet 44px target; no hover-dependent interactions (hover states only enhance).
- **Theme:** both themes render correctly at every breakpoint; no horizontal overflow at 320px; font `text-size-adjust: 100%`.

---

*Design system is authoritative for implementation; all token names and values above are binding. Where `docs/brand.md` states a principle without a value, the value here wins; where brand states a direction, it governs.*