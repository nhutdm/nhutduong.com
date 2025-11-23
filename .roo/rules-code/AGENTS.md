# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Coding Rules (Non-Obvious Only)

- Always use the `cn()` utility from `@/lib/utils` for className combinations - don't use clsx or tailwind-merge directly
- Theme toggle components require two separate script blocks: one for `astro:page-load` and one for `astro:after-swap`
- TOC generation will throw an error if heading hierarchy is broken (orphan headings not allowed)
- Content collections must follow the schema defined in `src/content/config.ts` - Astro will validate at build time
- Use `@/*` path alias consistently for all imports (configured in tsconfig.json)
- Client-side interactive components need `client:load` directive for immediate hydration
- Site configuration changes should be made in `src/data/site-config.ts`, not hardcoded in components
- Custom web elements like `<toc-heading>` are defined with complex logic - don't modify without understanding the full implementation
