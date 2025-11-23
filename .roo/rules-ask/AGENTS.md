# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Documentation Rules (Non-Obvious Only)

- Blog content is managed through Astro content collections, not direct file organization
- Site configuration (title, author, social links) is centralized in `src/data/site-config.ts` - not scattered across components
- TOC component implements complex scroll tracking with custom web element - documentation should reference the full implementation
- Theme system uses CSS custom properties with Tailwind's typography plugin - theming is not standard Tailwind
- Content schema validation in `src/content/config.ts` enforces strict structure - blog posts must conform to defined types
- Path aliases (`@/*`) are configured in tsconfig.json - all import paths in documentation should use this convention
- Shadcn/ui components use New York style with neutral base color - UI examples should follow this design system
