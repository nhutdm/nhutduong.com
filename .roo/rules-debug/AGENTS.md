# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Debug Rules (Non-Obvious Only)

- TOC component uses custom web element `<toc-heading>` with complex scroll tracking - check browser console for warnings about missing headings
- Theme toggle state persists in localStorage but requires two separate event listeners (astro:page-load and astro:after-swap)
- Content collection schema validation happens at build time - runtime errors may indicate schema mismatches in `src/content/config.ts`
- Astro's ClientRouter may cause hydration issues with theme state - check both script blocks in ThemeToggle component
- Tailwind CSS v4 uses Vite plugin instead of PostCSS - CSS-related debugging should focus on Vite configuration
- ESLint allows non-null assertions but TypeScript strict mode is enabled - check for runtime null errors
- Smart tabs are allowed in ESLint config - indentation issues may be related to mixed spaces/tabs
