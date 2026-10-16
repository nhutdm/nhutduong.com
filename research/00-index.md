# Legacy Site Inventory — nhutdm/nhut-duong

Task: t_32a53ae9 (RESEARCH phase of the nhutduong.com from-scratch rebuild)
Reference: read-only clone at `/opt/data/workspace/nhut-duong` (repo `nhutdm/nhut-duong`, branch `main`, single squashed-history commit `4fcd26a` "Merge pull request #2 from nhutdm/feat/wordmark-logo", shallow clone). The clone was never modified by this research.
Scope: complete inventory of routes, content, components, utils, config, design tokens, and assets — input to the rebuild plan (t_10df5b6f).

## Headline findings

1. Small, clean, modern codebase: 77 tracked files; 9 route files, 2 content collections (6 blog posts + 1 MDX page), 21 components, 4 icons, 1 layout, 5 util modules, 1 lib helper. Zero-JS architecture (no framework islands; only Astro's ClientRouter view-transition script ships).
2. Every required dependency pin is already satisfied by the legacy `package.json` (Astro ^7.3.2, mdx ^8.0.1, rss ^4.0.19, sitemap ^3.7.4, astro-og-canvas ^0.13.1, Tailwind ^4.3.3 via @tailwindcss/vite, typography ^0.5.20, clsx ^2.1.1 + tailwind-merge ^3.6.0, TypeScript ^6.0.3, Biome ^2.5.13, schema-dts ^2.0.0, wrangler ^4.131.1, Node >=22.12.0). Two extras beyond the pin list: `@astrojs/check` (needed for `astro check`) and `tailwind-merge` at major 3 (pin specified no version).
3. Signal design system (root DESIGN.md) is genuinely implemented: `src/styles/global.css` maps every token to CSS variables (`:root` light / `.dark` dark) and re-exports them through Tailwind v4 `@theme inline`; syntax highlighting (Shiki `css-variables`) and OG-image colors are also token-driven.
4. Known spec-vs-implementation deltas to surface to the owner in the rebuild plan: (a) DESIGN.md frontmatter declares body text = Source Serif 4, but its own prose section and the implementation use DM Sans for body/UI — deliberate, documented in AGENTS.md; (b) DESIGN.md says fonts "via Google Fonts" but the implementation self-hosts via the Astro Fonts API (Fontsource provider), which requires network at build time on a cold cache; (c) wrangler worker name is `nhut-duong` while the new canonical repo/domain is `nhutduong.com`.
5. Four of six blog posts have renamed slugs preserved by 12 redirect lines in `public/_redirects` — link equity worth carrying over (owner decision).
6. No draft/status mechanism exists in the content schema; all items publish unconditionally. "Status" for every item is therefore `published`.
7. `avatar.png` (660 KB in `src/assets/`) is the heaviest asset; og-image font (Source Serif 4 700 TTF, 53 KB) is vendored for build-time OG generation.

## Artifact map

| File | Contents |
| --- | --- |
| [01-architecture-config.md](01-architecture-config.md) | Stack, package.json vs required pins (explicit deltas), astro.config.mjs, wrangler.jsonc, biome.json, tsconfig, repo docs |
| [02-routes-pages.md](02-routes-pages.md) | All 9 route files → URL patterns, purpose, data flow, quirks |
| [03-content-inventory.md](03-content-inventory.md) | Collection schemas + every content item exactly once (slug/title/date/status/tags/size) + tag index + slug-rename history |
| [04-components-utils.md](04-components-utils.md) | Every component, icon, layout, util, type, data module — one-line purpose each |
| [05-design-assets.md](05-design-assets.md) | DESIGN.md Signal token summary, global.css token implementation, fonts, public/ + src/assets inventory |
| [06-keep-drop.md](06-keep-drop.md) | Keep/drop candidate list with a rationale per item; feeds the owner's migrate-vs-drop decisions |

## Verification

A scripted cross-check (`data/verify_inventory.py`, run from this directory; PASS) re-walked the legacy tree and asserted: every file under `src/pages`, `src/content`, `src/components`, `src/layouts`, `src/lib`, `src/utils`, `src/icons`, and `public/` appears exactly once across artifacts 02–06, and every keep/drop section row carries a rationale. Result: PASS (9 routes, 7 content items, 21 components, 4 icons, 1 layout, 6 util/lib modules, 9 public assets, 2 src assets — all covered, no duplicates). Raw frontmatter extraction lives in `data/content-inventory.json`.
