# Racheal — Developer Portfolio

Personal developer portfolio of **Olayode Racheal**: a static-first, evidence-led site that demonstrates how she thinks, builds, and communicates — product-minded full-stack engineering with strong fundamentals.

## Status

Phases 1–7 of the approved implementation plan are complete (`AGENTS.md` records the per-phase progress). The portfolio's main content surfaces are implemented and validated. **Phase 8 (contact form + backend) is next**, per `docs/implementation-plan.md`.

## Stack

- **Frontend:** Next.js 16 + TypeScript (App Router). Content is rendered statically from typed, repo-first data modules — no database, CMS, or content API in v1.
- **Backend:** Node.js 22 + TypeScript, scaffolded and kept separate from the frontend. In v1 its only job will be the validated contact endpoint (email delivery through a swappable provider adapter).

## Implemented sections

- **Home** (`/`) — hero + recruiter facts, Selected Work grid, "Now" band, evidence, About preview, writing teaser, contact CTA.
- **Work** (`/work`) — project index.
- **Case studies** (`/work/[slug]`) — SabiGet, Alafia, Lumora, MyGuestly AI.
- **About** (`/about`) — journey, achievements, evidence-linked skills, working principles, recruiter facts.
- **Writing** (`/writing`) — notes/articles index; internal post template at `/writing/[slug]`.
- Design-system foundation — token-driven light/dark themes, primitives + UI components, accessible navigation with a mobile menu, and a dev-only component review surface at `/components` (404 in production).

Content is authored in typed source-of-truth modules under `frontend/lib/` (`home-content.ts`, `work-content.ts`, `about-content.ts`, `writing-content.ts`). Nothing is invented: material not yet supplied by the owner is omitted, never placeholder-shipped.

## Repository layout

```
AGENTS.md    AI development instructions (rules + status)
backend/     Node.js + TypeScript contact service (scaffold)
docs/        planning + architecture documentation (authoritative)
frontend/    Next.js + TypeScript portfolio
```

Planning, architecture, and design documentation live in `docs/` and are authoritative for implementation.

## Local development

Requires Node.js ≥ 22.

Frontend (`frontend/`):

```sh
npm install
npm run dev            # dev server
npm run build          # production build
npm run start          # serve the production build
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run format:check   # prettier check
```

Backend (`backend/`):

```sh
npm install
npm run dev            # dev server (http://localhost:3001)
npm run build          # tsc build
npm run start          # run dist/server.js
npm run lint
npm run typecheck
npm test               # node --test
npm run format:check
```

## Environment

Environment variables are documented in `docs/environment.md`; `backend/.env.example` and `frontend/.env.example` are committed templates with safe placeholders. Real values live only in git-ignored `.env`/`.env.local` or the deployment platform's environment — never in the repository.