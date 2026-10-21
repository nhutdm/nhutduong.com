## Development

Package manager: npm. Node >= 22.12.0 required.

Astro 7 static site (`site: https://nhutduong.com`). Integrations: `@astrojs/mdx`, `@astrojs/sitemap` (blog URLs get `lastmod` from frontmatter — the `serialize` hook in `astro.config.mjs` delegates to `src/utils/sitemap-utils.ts`, the single documented place that regex-reads frontmatter at config time; importing that `.ts` helper from the `.mjs` config works because Astro bundles the config with esbuild). Fonts are managed by the Astro Fonts API (`fonts` in `astro.config.mjs`, Fontsource provider): DM Sans + Source Serif 4 (variable) + IBM Plex Mono (400), latin subset — downloaded at build time, referenced via `<Font />` from `astro:assets` in `BaseLayout.astro` (with `preload` and metric-matched fallbacks). GOTCHA: builds need network access on a cold cache (`.astro/fonts` / `node_modules/.astro/fonts`) — the fonts download happens even when no page consumes them yet, but `@font-face` is only emitted into pages that render the `<Font />` component.

OpenGraph images: all cards (per-post + default) render at build time via `src/pages/og/[...id].png.ts` → `renderOGCard` (`src/components/og-card.ts`, satori + @resvg/resvg-js). The renderer's fonts are vendored at `src/assets/og-fonts/` (static Source Serif 4 700 + IBM Plex Mono 400/500) — no network needed. GOTCHAS: (1) satori cannot parse variable TTFs (the crash reads `Cannot read properties of undefined (reading '278')`), so the serif is the static 700 instance; (2) satori 0.62+ needs the root container sized in explicit px with `boxSizing: border-box` — `100%` or content-box padding overflows the 1200×630 canvas and silently clips the footer row; (3) satori can't place a styled span after an internally-wrapped string (the card does manual line-wrapping); (4) the endpoint file MUST be named `[...id].png.ts` — without the `.png` in the filename, Astro emits extensionless files. The gold trailing dot is label grammar: only the default card's name carries it (the site never dots essay titles).

Deployment: Cloudflare Workers static assets via `wrangler.jsonc` (`name: "nhutduong-com"`, `compatibility_date: "2026-08-30"`, `assets.directory: ./dist`, `not_found_handling: "404-page"` serves the built `404.html`). `npx wrangler dev` / `npx wrangler deploy` operate on the built `dist/` — run `npm run build` first, and deploy is owner-run only. `public/_redirects` (12 × 301 for renamed slugs) is honored natively by Workers static assets (verified against the current docs — static redirects, `source dest code` per line, 2000-static limit). Wrangler local state is in `.wrangler/` (gitignored); `wrangler` is a devDependency.

Styling: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (pure CSS-first config — no `tailwind.config` file). Design system: `DESIGN.md` (Signal — deep navy `#1c2644` / bone `#e2dcd0` / muted gold `#c8a870`; single light rendition = bone-paper canvas, owner decision — the dark-canvas inversion and its toggle were removed; Display/serif = Source Serif 4 700, body/UI = DM Sans, code = IBM Plex Mono; 4px radii). Theme tokens are CSS variables in `:root` in `src/styles/global.css`, re-exported via `@theme inline`; typography prose overrides live in the same file as `.prose` CSS variables. Rendered Markdown is wrapped in the reusable `Prose.astro` component (per the Astro "Style rendered Markdown with Tailwind Typography" recipe) — RATIONALE: it sets `max-w-none` so page containers control the column width (the plugin's default 65ch cap would squeeze layouts like the About page), and page chrome outside it carries its own utility classes, so `not-prose` escapes are never needed. GOTCHA: `@theme inline` does not emit theme variables as real CSS custom properties — hand-written CSS must reference the Fonts API variables directly (see the `.prose :is(h1…h6)` rule using `var(--font-source-serif)`), and the prose heading rule relies on `:is()` (specificity 0,1,1) beating the typography plugin's `:where()` rules. The site is light-only: no theme boot script, no `ThemeToggle`, no `.dark` tokens — reintroducing a theme means restoring all three together.

Zero-JS architecture: no framework islands and no React. All UI is `.astro` components; interactivity (TOC progress, prose anchor links) is vanilla `<script>` / custom elements. The only shipped JS is the `ClientRouter` view-transition script. `cn()` (clsx + tailwind-merge) is the only export of `src/lib/utils.ts`, used for class merging. If a truly interactive component is ever needed, re-add a framework integration rather than hydrating static markup.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design System

The visual system is Signal: deep navy / bone / muted gold, Source Serif 4 display, DM Sans body/UI, IBM Plex Mono code, 4px radii. `DESIGN.md` at the repo root is the read-only spec; the live token layer is `:root` in `src/styles/global.css` (re-exported via `@theme inline`).

### Mandatory instructions for UI

1. Use EXCLUSIVELY the tokens defined as CSS variables in `src/styles/global.css`.
2. Follow the typographic scale without inventing intermediate sizes.
3. Spacing must be multiples of the base value (8px / 0.5rem).
4. Every interactive element needs: hover, focus, disabled.
5. Inviolable: no emojis in UI, no pure black, no 3-equal-column rows, `min-h-[100dvh]` never `h-screen`, reduced-motion guard.

### Quick token reference

- Primary / ink: `#1c2644` (deep navy — foreground on the bone canvas)
- Secondary: `#232f55` (navy-alt — code blocks, pre background)
- Bone: `#e2dcd0` (code foreground on navy)
- Gold: `#c8a870` (rules, dots, decoration only — 1.92:1 on bone, never body text)
- Gold-text: `#7a5f34` (the only gold allowed as text — 5.07:1)
- Muted: `#5b6377` (secondary text — 5.1:1)
- Surface: `#f0ece3` (bone paper — the page)
- Display/H1: Source Serif 4, 700
- Body/UI: DM Sans, 400
- Code/metadata: IBM Plex Mono
- Base spacing: 8px (0.5rem); section gaps `clamp(4rem, 8vw, 8rem)`
- Border radius: 4px

### Code conventions

- TypeScript strict (`astro/tsconfigs/strict`)
- Astro components (`.astro`), zero-JS — no React, no framework islands
- Tailwind CSS v4 utility-first, CSS-first config (no `tailwind.config` file)
- One component per file
- Class merging via `cn()` from `@/lib/utils`

### Files that must NOT be edited

- `DESIGN.md` (read-only spec)
- `AGENTS.md` (this file)
- `package-lock.json` (managed by npm)

## Layout

- `src/content.config.ts` — content collection schemas (blog + pages). Zod is imported from `astro/zod`. No draft field by design (owner decision D12 — draft by not committing).
- `src/data/site-config.ts` — single source of truth for title, nav, social links, hero.
- `src/layouts/BaseLayout.astro` — wraps every page; emits JSON-LD, breadcrumbs, and `<ClientRouter />` view transitions.
- `src/utils/toc-utils.ts` — `generateToc` throws at build time on orphan headings (e.g. an `h3` with no preceding `h2`).
- `src/pages/[...id].astro` — catch-all for MDX pages from `src/content/pages/` (`about` gets the Person JSON-LD).
- `src/pages/blog/[...page].astro` and `src/pages/tags/[id]/[...page].astro` — paginated (pageSize 10; note Astro 7's `Page` uses `lastPage`, not `totalPages`). The tag display name is resolved once in `getStaticPaths` and carried as a prop.
- `src/components/TOC.astro` — custom element (`toc-heading`); scroll-spy toggles `.highlight`/`.readed` on `.toc-link` (100ms-throttled, listeners cleaned up in `disconnectedCallback` for view transitions). The vertical progress bar was removed by owner decision — the active item carries the state alone. Active styling lives as hand-written unlayered rules in `global.css` (`.toc-link.highlight` etc.): Tailwind arbitrary-variant utilities LOSE the cascade inside `@layer utilities`, so any new stateful styling goes in unlayered global.css, never `[&.class]:` utilities. On mobile, the click handler closes the disclosure BEFORE scrolling (close-then-scroll; the reverse order lands at a stale offset).
- `src/components/Footer.astro` — the two-column footer row engages at `lg:` (1024px), NOT `sm:`: below 1024 it stacks like mobile (at `sm:` the socials nav wrapped mid-row and orphaned LinkedIn). The `lg:-mb-1.5` compensates the socials' tap padding so their text baseline meets the colophon's.
- Wide label pages (Privacy/Terms render two-column section grids): the prose plugin's h2 margin-top is zeroed inside grid cells and set to 40px after the grid (rules in `global.css`) — otherwise it stacks on the grid's 40px row gap and every heading sits 88px below its predecessor.
- Page inventory: 19 pages. Now and Uses shipped from the `feature/now-uses` branch (2026-10-21) — content grids, indexed, with the fullscreen mobile overlay navigation in `Masthead.astro`.
- Content dates are ISO (`YYYY-MM-DD`) in frontmatter and rendered with `timeZone: "UTC"` (`FormattedDate.astro`) so output is independent of the build machine's locale.
- `src/utils/schema-utils.ts` — JSON-LD factories; site URLs derive from `import.meta.env.SITE` (the `site` config value); `dateModified` only comes from real content dates (via BaseLayout's `lastModified` prop), never build time.
- `src/pages/rss.xml.js` — full-content feed via `experimental_AstroContainer` (verified against Astro 7.3; if a future Astro upgrade breaks the container API, the approved fallback is a summary-only feed).
- Path alias: `@/*` → `src/*` (tsconfig). Use it consistently — never `.ts`-suffixed relative imports in pages.

## Conventions

- `compressHTML` defaults to `'jsx'` (Astro 7): put explicit `{' '}` between adjacent inline expressions (see `Footer.astro`).
- Decorative SVGs carry `aria-hidden="true"` (Biome `noSvgWithoutTitle`).
- Biome suppressions are targeted comments; `useAnchorContent` is disabled for `.astro` files (slot-based anchors).

## Verification

- Full gate: `npm run ci` = `biome ci && astro check && astro build` — all three must be green.
- Lint/format during development: `npm run check` (Biome; applies safe fixes).
- Local production preview on the Workers runtime: `npm run build && npx wrangler dev`. `npm run preview` uses Astro's own preview server instead.
- Deploy: owner-run `npm run build && npx wrangler deploy`.
- Biome config: `biome.json` — 2-space indent, double quotes, experimental `.astro` support, `css.parser.tailwindDirectives` enabled, respects `.gitignore`.
- TypeScript uses the `astro/tsconfigs/strict` preset. Run `astro check` to type-check `.astro` files (`@astrojs/check` is a devDependency in this repo).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Scripts and event handling / view transitions](https://docs.astro.build/en/guides/client-side-scripts/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Using custom fonts (Fonts API)](https://docs.astro.build/en/guides/fonts/)
