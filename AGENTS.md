<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server at http://localhost:3000 (regenerates the block above into AGENTS.md; commit it, don't strip it)
- `npm run lint` — ESLint (flat config, `eslint` with no args)
- `npx tsc --noEmit` — typecheck (no npm script exists for it)
- No test framework configured.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*`; use CSS `@theme` in `app/globals.css` if needed).
- Import alias: `@/*` maps to repo root (e.g. `@/app/...`), no `src/` dir.
- App Router only — do not create `pages/`.

## Conventions

- App UI and specs are in Spanish (daycare app: feed, niños, publicaciones, resumen del día, cuentas de familia).
- `references/pantallas/` holds `.dc.html` screen mockups and `references/screenshots/` holds PNG references — consult these before building UI.
- Large features: use the `spec` skill (writes to `specs/NN-slug.md`, Spanish, sequential numbering) and `spec-impl` skill (creates branch per spec, requires state "Approved").

## MCPs

- Playwright screenshots y cualquier cosa relacionada a Playwright tiene que estar en la carpeta .playwright-mcp
- Context7 usaremos este MCP para traer la documentacion actualizada del framework

## Spec Driven Development

- /spec Usaremos esta skill para crear las especificaciones
- /spec-impl Usaremos esta skill para hacer las implementaciones

## Reglas de código

- Usar codigo limpio, nombres, funciones, variables, etc en inglés.