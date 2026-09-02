# Racheal Portfolio — AI Development Instructions

## Project

This is Racheal's personal developer portfolio.

The portfolio is designed to communicate:
- technical ability
- product thinking
- engineering depth
- personality
- professional credibility

## Architecture

Frontend:
Next.js + TypeScript

Backend:
Node.js + TypeScript

The frontend and backend must remain separated.

## Planning First

Before implementing a feature:

1. Check the relevant documentation in /docs.
2. Follow the approved architecture.
3. Do not introduce new architecture without explaining the reason.
4. Do not add dependencies unnecessarily.

## Development Rules

- TypeScript must be used throughout the application.
- Prefer simple, maintainable solutions.
- Avoid unnecessary abstraction.
- Avoid duplicated logic.
- Keep components focused.
- Keep business logic out of UI components.
- Validate external input.
- Handle errors explicitly.
- Do not expose secrets to the frontend.

## Design Rules

The visual identity defined in:

docs/brand.md
docs/design-system.md

must be treated as authoritative.

Do not introduce random colors, fonts, animations, or UI patterns.

## API Rules

Backend business logic must remain in the backend.

The frontend communicates with the backend through defined API endpoints.

## Security

Never hardcode:
- API keys
- passwords
- database credentials
- tokens
- private environment variables

## Testing

After implementing a feature:

1. Run type checking.
2. Run linting.
3. Run relevant tests.
4. Verify the feature manually when appropriate.

## Change Management

Do not modify unrelated files.

Do not rewrite existing architecture without approval.

If a requirement conflicts with the architecture, stop and explain the conflict.

## Planning Status

Current status:

IMPLEMENTATION — PLANNING APPROVED

Planning is approved; implementation proceeds sequentially through `docs/implementation-plan.md`.

Progress:

- Phase 1 (project initialization) COMPLETE — frontend/ (Next.js 16) and backend/ (Node.js 22 native TS) scaffolded, both type-check/lint/build/test/format-green, CI at `.github/workflows/ci.yml`, environment-variable contract in `docs/environment.md` with `.env.example` templates (backend + frontend).
- Phase 2 (frontend foundation) NEXT — layouts, tokens/themes (light+dark via `data-theme`), fonts (Fraunces/Karla/IBM Plex Mono), primitives, header/footer/skip-link. Design tokens were approved in planning.

Rules that remain in force during implementation:

- The approved architecture and design system are authoritative; do not redesign the product.
- Never invent real content (projects, metrics, testimonials, employment history, contact info, achievements). Real content must come from the owner.
- Development-only placeholders must be clearly marked and must never ship.
- Do not commit secrets; use documented environment variables and `.env.example` without real credentials.