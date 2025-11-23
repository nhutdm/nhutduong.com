# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

- Build: `pnpm build` (runs astro check then build)
- Dev server: `pnpm dev` or `pnpm start`
- Check all: `pnpm check` (runs astro, eslint, and prettier checks)
- Fix all: `pnpm fix` (runs eslint --fix and prettier --write)
- Preview: `pnpm preview`

## Project-Specific Patterns

- Use `@/*` path alias for imports (configured in tsconfig.json)
- Utility function `cn()` from `@/lib/utils` combines clsx and tailwind-merge for className handling
- Theme toggle requires two script blocks: one for astro:page-load and one for astro:after-swap
- TOC component uses custom web element `<toc-heading>` with complex scroll tracking logic
- Blog content uses Astro content collections with schema validation in `src/content/config.ts`
- Site configuration is centralized in `src/data/site-config.ts` with TypeScript types

## Code Style

- Prettier: 120 print width, single quotes, trailing commas (es5), 2 spaces
- ESLint allows non-null assertions (`@typescript-eslint/no-non-null-assertion: 'off'`)
- Smart tabs allowed for mixed spaces/tabs (`no-mixed-spaces-and-tabs: ['error', 'smart-tabs']`)
- Unused vars with underscore prefix are ignored (`argsIgnorePattern: '^_'`)

## Architecture Notes

- Astro 5 with React integration for interactive components
- Tailwind CSS v4 with Vite plugin (not PostCSS)
- Shadcn/ui components configured with New York style, neutral base color
- Typography plugin uses CSS custom properties for theming
- Client-side scripts use `client:load` directive for immediate hydration
- TOC generation enforces strict heading hierarchy (throws error on orphan headings)
