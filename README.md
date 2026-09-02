# Racheal — Developer Portfolio

Personal developer portfolio of **Olayode Racheal**. A static-first, evidence-led site that demonstrates how she thinks, builds, and communicates — product-minded full-stack engineering with strong fundamentals.

## Status

**Planning phase.** This repository currently contains planning documents only — architecture, brand, design system, UX, content model, implementation plan, and a decision log. **No application code exists yet** and none will be written until the user approves the plan (see `AGENTS.md`).

## Architecture (approved)

- **Frontend:** Next.js + TypeScript (App Router), rendering statically from **MDX + structured repo data**. No content database, CMS, or content API in v1.
- **Backend:** Node.js + TypeScript, limited to what genuinely requires server-side processing — the **validated contact endpoint** (validation, honeypot/rate limiting, delivery via a **Resend adapter**). Frontend and backend remain fully separated.
- **Direct contact:** a secondary **WhatsApp** deep-link path (frontend-only, no backend) complements the contact form.
- The full reasoning, alternatives, and the conditions that would justify introducing content infrastructure later are recorded in `docs/decisions.md`.

## Planning-first approach

Every implementation change must:

1. Follow the documentation in `/docs`.
2. Respect the approved architecture (`docs/decisions.md`, `docs/architecture.md`).
3. Avoid unnecessary dependencies and unapproved architecture.

The design rules in `docs/brand.md` and `docs/design-system.md` are authoritative.

## Repository structure

```
AGENTS.md                  AI development instructions (rules + status)
README.md                  this file
docs/
  vision.md                purpose, positioning, principles
  brand.md                 brand identity + wordmark direction
  requirements.md          product requirements (pages, features, budgets)
  information-architecture.md   sitemap, navigation, URLs
  design-system.md         authoritative visual tokens & components
  ux.md                    behavior, journeys, flows
  content-model.md         authoring schema + content readiness checklist
  architecture.md          static-first system view
  decisions.md             ADR decision log + revival condition
  seo.md                   metadata, sitemap, structured data
  implementation-plan.md   phased roadmap to production
frontend/                  (future) Next.js + TypeScript
backend/                   (future) Node.js + TypeScript contact service
```

## Content strategy

- Content is authored **in-repo** as MDX + structured data — edited with a text editor, rendered statically at build time.
- **Evidence over claims:** projects and case studies must demonstrate real problems, decisions, trade-offs, and outcomes. Metrics are never invented.
- **Quality over volume:** Writing is one publishing surface; one excellent post beats five weak ones.
- All real material Racheal must supply before implementation is listed in the **content readiness checklist** in `docs/content-model.md`.

## How implementation will work

When the plan is approved (`PLANNING APPROVED`), work proceeds through the phases in `docs/implementation-plan.md` — from project initialization and the design-system build-out, through content infrastructure and the pages, to the contact backend, SEO, testing, and deployment. No phase is started without its defined acceptance criteria and definition of done.

## Contributing / changes

This is a personal project. Structural or architectural changes require an explicit approval: follow `AGENTS.md`'s planning-first and change-management rules, and record decisions in `docs/decisions.md`.