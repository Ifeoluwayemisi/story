# Architecture — Olayode Racheal Portfolio

> **Approved direction: static-first.**
>
> Frontend and backend remain separated (per AGENTS.md), but v1 is deliberately **lightweight**: the backend exists only for functionality that genuinely requires server-side processing — primarily the **contact form**. Portfolio content is **static MDX / structured repo data** rendered by the frontend. No database, full content API, CMS, or ingestion pipeline unless a concrete requirement justifies it (see `docs/decisions.md`).

---

## High-level diagram

```
                ┌──────────────────────┐
                │      Visitor         │
                └──────────┬───────────┘
                           │
                           ▼
               ┌─────────────────────────────┐
               │     Next.js + TypeScript      │
               │           Frontend            │
               │  (static-first content)       │
               └───────┬────────┬────────┬─────┘
                       │        │        │
        static content │        │        │ WhatsApp deep link
        (MDX / repo    │        │        │  (direct, no backend)
         data, from    │        │        ▼
         repo-first)   │        │   ┌──────────────┐
                       │        │   │ WhatsApp app │
                       │        │   │  / wa.me     │
                       │        │   └──────────────┘
                       │        │
                       │ contact form (validated request)
                       │        ▼
                       │   ┌──────────────────────┐
                       │   │  Node.js + TypeScript  │
                       │   │        Backend         │
                       │   │  validation + honeypot │
                       │   │  + rate limiting       │
                       │   └───────────┬──────────┘
                       │               │ ContactDelivery
                       │               │   (adapter)
                       │               ▼
                       │        ┌──────────────┐
                       │        │   Brevo     │──► to Racheal's email
                       └────────┴──────────────┘   (no DB in v1)
```

---

## Frontend — Next.js + TypeScript

- **App Router**, TypeScript throughout.
- **Static-first rendering:** pages rendered statically (SSG) from **MDX + structured repo data** for performance and SEO. Dynamic rendering used only where needed (e.g., the contact form interaction occurs client-side but posts to the backend).
- **Content source in v1:** MDX + structured data files in the repo (repo-first authoring). No CMS, no content API.
- **Styling:** Tailwind + design tokens (see `docs/design-system.md`); manual light/dark theme toggle.
- **Accessibility, SEO, performance** are first-class (see `docs/requirements.md`, `docs/seo.md`).

---

## Backend — Node.js + TypeScript

- **Scope in v1:** limited to functionality that genuinely requires server-side processing.
- **Primary use case:** the **validated contact endpoint** (accepts the contact form, validates all external input, handles errors explicitly, mitigates spam, and coordinates delivery without exposing secrets to the frontend).
- **Delivery:** the endpoint depends on a **`ContactDelivery` adapter interface**; `BrevoDelivery` (via **Brevo**) is the v1 implementation — the endpoint is not coupled to the provider (ADR-004).
- **No database, no full content API, no CMS, no content ingestion pipeline** in v1.
- **Security:** env vars and credentials live server-side only (including `BREVO_API_KEY`); minimal attack surface (single contact endpoint).

## WhatsApp (frontend-only secondary channel)

- Direct chat is a `wa.me` **deep link** from the frontend — **no backend involvement, no credentials** (ADR-005).
- Deep link is built from the Phase 0 validated number; never a shipped placeholder.

---

## Data flow (content)

1. Author content as **MDX / structured data files** in the repo (repo-first).
2. Frontend **reads these files directly** at build time (static generation).
3. Rendered as static pages with proper SEO metadata.
4. **No** server-side content serving, database, or API in v1.

## Data flow (contact)

1. Visitor submits the contact form.
2. Frontend validates client-side and sends a validated request to the **backend contact endpoint**.
3. Backend validates again, applies rate limiting/honeypot, and calls the **`ContactDelivery` adapter** (Brevo in v1).
4. Returns an explicit success/failure state; **no secrets reach the frontend**; provider errors are mapped, never leaked.

## Data flow (WhatsApp — frontend only)

1. Visitor activates the "Chat on WhatsApp" CTA (Contact page, footer).
2. Frontend opens a `wa.me` deep link built from the validated Phase 0 number (with optional approved, generic prefilled text).
3. Conversation happens directly with Racheal in WhatsApp. **No backend, no stored message, no credentials.**

---

## When this architecture changes

Introducing a **database, full content API, CMS, or ingestion pipeline** is deferred unless a concrete requirement justifies it. See **`docs/decisions.md`** for the documented decision and its **revival condition**.

---

*Architecture reflects the approved planning direction.*
