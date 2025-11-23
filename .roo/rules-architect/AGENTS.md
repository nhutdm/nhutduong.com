# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Architecture Rules (Non-Obvious Only)

- Astro 5 with Vite-based Tailwind CSS v4 (not PostCSS) - CSS architecture differs from standard Astro setups
- Content collections with strict schema validation in `src/content/config.ts` - content architecture is type-safe at build time
- Custom web element `<toc-heading>` implements complex scroll tracking logic - TOC architecture is more sophisticated than typical implementations
- Theme system requires dual script blocks for proper hydration across Astro's ClientRouter - state management is non-trivial
- Shadcn/ui components with New York style and neutral base color - UI architecture follows specific design system constraints
- Path alias configuration (`@/*`) centralizes import architecture - all module resolution goes through this system
- Site configuration in `src/data/site-config.ts` creates single source of truth for metadata architecture
- Typography plugin uses CSS custom properties for theming - styling architecture is abstracted through Tailwind's typography system
