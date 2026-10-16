# 01 — Architecture & Configuration

Source of truth: `/opt/data/workspace/nhut-duong` (read-only). All facts below read directly from the files during this research run.

## Stack at a glance

- Astro 7 static site (`site: https://nhutduong.com`), zero-JS: no framework islands, no React; interactivity is vanilla `<script>` + one custom element (`toc-heading`).
- Tailwind CSS v4 CSS-first config via `@tailwindcss/vite` (no `tailwind.config` file); typography plugin for prose.
- Content: Markdown blog (`src/content/blog`) + MDX pages (`src/content/pages`), Zod schemas in `src/content.config.ts` (Zod imported from `astro/zod`).
- Fonts: Astro Fonts API, Fontsource provider — DM Sans (100–900 variable), Source Serif 4 (200–900 variable), IBM Plex Mono (400), latin subsets, downloaded at build time (cold cache needs network).
- Deploy target: Cloudflare Workers static assets via `wrangler.jsonc`.

## package.json — dependency versions vs required pins

Legend: MATCH = installed range satisfies the required pin. Deltas are called out explicitly.

| Required pin (task t_f72e3533) | Legacy package.json | Verdict |
| --- | --- | --- |
| Astro ^7.3 | `astro ^7.3.2` (dependency) | MATCH |
| @astrojs/mdx ^8 | `@astrojs/mdx ^8.0.1` (dependency) | MATCH |
| rss ^4 | `@astrojs/rss ^4.0.19` (dependency) | MATCH — note the pin says "rss ^4"; the actual package is `@astrojs/rss` |
| sitemap ^3.7 | `@astrojs/sitemap ^3.7.4` (dependency) | MATCH — likewise `@astrojs/sitemap` |
| astro-og-canvas ^0.13 | `astro-og-canvas ^0.13.1` (dependency) | MATCH |
| Tailwind ^4.3 | `tailwindcss ^4.3.3` + `@tailwindcss/vite ^4.3.3` (dependencies) | MATCH |
| typography ^0.5 | `@tailwindcss/typography ^0.5.20` (devDependency) | MATCH |
| clsx + tailwind-merge | `clsx ^2.1.1` (dep), `tailwind-merge ^3.6.0` (dep) | MATCH — presence pinned; versions unpinned by spec. tailwind-merge is at major 3 |
| TypeScript ^6 | `typescript ^6.0.3` (devDependency) | MATCH |
| Biome ^2.5 | `@biomejs/biome ^2.5.13` (devDependency) | MATCH |
| schema-dts | `schema-dts ^2.0.0` (devDependency) | MATCH — presence pinned, version unpinned by spec |
| wrangler ^4.13 | `wrangler ^4.131.1` (devDependency) | MATCH (^4.131.1 ⊇ ^4.13) |
| Node >= 22.12 | `engines.node: ">=22.12.0"` | MATCH |

Deltas / extras beyond the pin list (for the rebuild plan's dependency table):

1. EXTRA `@astrojs/check ^0.9.10` (devDependency) — required for `astro check`; without it `npm run ci` fails. Must be kept in the rebuild even though the pin list omits it. (AGENTS.md still says it "is not a dependency" — stale relative to package.json; the rebuild plan should not copy that sentence.)
2. DEVIATION-RISK none on ranges, but note exact-vs-caret: the rebuild plan should decide whether to reproduce these caret ranges verbatim or pin exact versions; pins as written are ranges and the legacy satisfies them all.

Scripts (package.json): `dev` astro dev · `build` astro build · `preview` astro preview · `astro` · `lint` biome lint --write · `format` biome format --write · `check` biome check --write · `ci` = `biome ci && astro check`. NOTE for rebuild: the root task's FINAL VERIFY expects `biome ci && astro check && astro build` — legacy `ci` omits the build step; that is a deliberate delta to decide in the plan.

## astro.config.mjs

- `site: "https://nhutduong.com"`.
- `markdown.shikiConfig.theme: "css-variables"` — syntax colors come from CSS vars in global.css (Signal tokens).
- `fonts`: three Fontsource entries (see Stack above) exposing `--font-dm-sans`, `--font-source-serif`, `--font-ibm-plex-mono`.
- Integrations: `mdx()`; `sitemap({ serialize })` where `serialize` derives `lastmod` per blog URL by reading the post's source file at config time and regex-matching `updatedDate:`/`publishDate:` frontmatter (`getBlogLastmod`, tries `.md` then `.mdx`). Clever but brittle (duplicates schema knowledge as regex); the rebuild could instead use the content layer or accept the simpler default.
- Vite plugins: `tailwindcss()` from `@tailwindcss/vite`.

## wrangler.jsonc (Cloudflare Workers)

| Key | Value |
| --- | --- |
| name | `nhut-duong` |
| compatibility_date | `2026-08-30` |
| assets.directory | `./dist` |
| assets.not_found_handling | `404-page` |

No routes, no bindings, no vars — pure static assets worker. `wrangler` is a devDependency; deploys are manual (`npm run build && npx wrangler deploy`). OWNER DECISION for rebuild: worker name (old `nhut-duong` vs new, e.g. `nhutduong-com`) — flagged in 06-keep-drop.

## biome.json

Schema 2.5.13; VCS integration on (uses .gitignore); files exclude `dist` and `public`; 2-space indent, double quotes; linter preset `recommended`; `.astro` override disables `a11y/useAnchorContent` (slot-based anchors); `css.parser.tailwindDirectives: true`; HTML experimental full support; assist `organizeImports: on`.

## tsconfig.json

Extends `astro/tsconfigs/strict`; includes `.astro/types.d.ts`; excludes `dist`; path alias `@/*` → `./src/*`.

## Repo-level files

| File | Purpose |
| --- | --- |
| README.md | Accurate stack/structure/deploy documentation (fonts note, commands table, wrangler usage) |
| AGENTS.md | Development conventions + design-system rules + per-file gotchas; CLAUDE.md symlinks to it. Rich, mostly current (one stale claim: "@astrojs/check is not a dependency") |
| DESIGN.md | Signal design token spec (source of truth for styling) — summarized in 05 |
| LICENSE | MIT-style personal-site license (not re-read verbatim; confirm before copying) |
| .vscode/ | extensions.json (Astro + Biome extensions), settings.json (Biome default formatter, format-on-save), launch.json (astro dev debug config) |
| .gitignore | dist/, plus standard Astro/node entries |
| package-lock.json | npm lockfile, 249 KB |

Clone caveats: the local clone is shallow (`--depth` 1, `rev-parse --is-shallow-repository` = true) — history beyond the squashed tip is not visible locally; do not rely on it for archaeology.
