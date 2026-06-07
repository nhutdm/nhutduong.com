# AGENTS.md

Concise guide for OpenCode sessions working in `nhutduong.com`. Optimized for speed of ramp-up, not completeness. Generic Astro/Tailwind/SEO advice is intentionally omitted.

## Stack (verified from `package.json`)

- Astro 6.4 (static site, `dist/` output)
- React 19.2, used sparingly via `client:load`
- Tailwind CSS 4.3 + `@tailwindcss/typography` (Tailwind v4 with a legacy v3-style `tailwind.config.mjs` loaded via `@config` in `src/styles/global.css:4`)
- shadcn/ui (new-york style, lucide icons) — see `components.json` for aliases
- MDX, sitemap, RSS, dynamic OG images via `astro-og-canvas`
- TypeScript 6 (extends `astro/tsconfigs/strict`), ESLint 10 flat config, Prettier 3.8

## Commands (run from repo root)

| Task                              | Command        |
| --------------------------------- | -------------- |
| Dev server                        | `pnpm dev`     |
| Production build (runs typecheck) | `pnpm build`   |
| Preview built site                | `pnpm preview` |
| Fast local verification           | `pnpm check`   |
| Auto-fix lint + format            | `pnpm fix`     |

- `pnpm check` chains `check:astro && check:eslint && check:prettier`. Use it before pushing; it is much faster than a full `pnpm build`.
- `pnpm build` is `astro check && astro build`, so type errors fail the build. There is no separate `test` script — there are no tests in this repo.

## Layout (only what is non-obvious)

- `src/lib/utils.ts` — **only** `cn()` (clsx + tailwind-merge). All other helpers live under `src/utils/`.
- `src/utils/data-utils.ts` — `sortItemsByDateDesc`, `getAllTags`, `getPostsByTag`.
- `src/utils/common-utils.ts` — `slugify`.
- `src/utils/toc-utils.ts` — `generateToc`. **Throws on orphan headings** (e.g. an `h3` with no preceding `h2`) at build time.
- `src/utils/schema-utils.ts` — JSON-LD builders (WebSite, WebPage, Person, BlogPosting).
- `src/utils/breadcrumb-utils.ts` — breadcrumb items + BreadcrumbList structured data.
- `src/content.config.ts` — content collection schemas (NOT `src/content/config.ts`; the old location no longer exists).
- `src/data/site-config.ts` — single source of truth for title, nav links, social links, hero, Giscus IDs.
- `src/components/ui/` — shadcn components (currently `badge.tsx`, `breadcrumb.tsx`, `button.tsx`). `Badge` and `Breadcrumb` are used in Astro pages with `client:load`.
- `src/components/BaseHead.astro` — meta tags, OG, Twitter, canonical.
- `src/layouts/BaseLayout.astro` — wraps every page; emits JSON-LD, breadcrumb, and enables `<ClientRouter />` view transitions.
- `src/icons/` — Astro icon components for `GitHub`, `LinkedIn`, `RSS`, `X` (referenced by `socialLinks[].icon` in `site-config.ts`).
- `src/pages/rss.xml.js` — RSS feed.
- `src/pages/og/[...id].ts` — dynamic OG image per blog post via `astro-og-canvas`. Loads font from `cdn.jsdelivr.net` and logo from `public/android-chrome-512x512.png`.
- `src/pages/version.json.js` — `git rev-parse --short HEAD` at build time. **Will fail if building outside a git checkout.**
- `src/pages/blog/[id].astro` — single post (uses `render(post)` from `astro:content`).
- `src/pages/blog/[...page].astro` — paginated index (`pageSize: 10`).
- `src/pages/tags/[id]/[...page].astro` — paginated tag pages.
- `src/pages/[...id].astro` — catch-all for static MDX pages from `src/content/pages/`.

## Conventions worth knowing

- `tsconfig` paths: `@/*` → `src/*`.
- ESLint flat config: `.astro` files use `astro-eslint-parser` with `@typescript-eslint/parser` as the inner parser. Unused vars must be prefixed with `_`. `no-non-null-assertion` is off. `no-mixed-spaces-and-tabs: 'smart-tabs'` for `*.{js,jsx,astro}`.
- Prettier plugins run in this order: `prettier-plugin-organize-imports`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`. Print width 120, single quotes, 2 spaces, ES5 trailing commas.
- shadcn `components.json` aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. **The `hooks` directory does not exist** — do not add `useFoo` imports there.
- Tailwind v4 theme tokens come from CSS variables in `:root` / `.dark` in `src/styles/global.css`; the `@theme inline` block re-exports them.

## Content collections (blog + pages)

- Loader: `glob({ pattern: '**/*.{md,mdx}', base: './src/content/{blog|pages}' })`.
- `blog` frontmatter (validated by Zod in `src/content.config.ts`):
  - `title: string` (required)
  - `publishDate: z.coerce.date()` — strings like `'Sep 9 2024'` are accepted.
  - `updatedDate?: z.coerce.date()`
  - `excerpt?: string`
  - `tags?: string[]` (defaults to `[]`)
  - `seo?: { title?, description?, image?, pageType?: 'website' | 'article' }`
- `pages` frontmatter: `title` required, `seo` optional.

## Repo topology / deploy

- `pnpm-workspace.yaml` is **not a monorepo** — it is a single-package workspace with `allowBuilds: { esbuild: true, sharp: true }` to permit pnpm 10's postinstall allowlist on these native deps.
- No CI in this repo (no `.github/` directory). Deploy is via Cloudflare Pages Git integration: build command `pnpm build`, output `dist/`. There is no `wrangler.toml` to update.
- `dist/` is gitignored. `public/` is the only static-asset directory served verbatim.

## Common mistakes to avoid

- Looking for tests or a test runner — there are none.
- Editing `src/content/config.ts` — the schema lives in `src/content.config.ts`.
- Adding a heading hierarchy that skips a level inside a blog post — `generateToc` will throw at build.
- Importing from `@/hooks` — the directory does not exist.
- Running `pnpm build` outside a git checkout — `version.json` endpoint will fail.
- Treating `pnpm-workspace.yaml` as a monorepo manifest — it is a pnpm 10 `allowBuilds` allowlist only.
