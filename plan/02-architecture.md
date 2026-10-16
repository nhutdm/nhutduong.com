# 02 — Architecture: Tree, Page List, Content Model, Config

The new-repo design. Behavioral reference for every file named here: the legacy twin listed in research/04 (read-only at `/opt/data/workspace/nhut-duong`). Routes and subsystems flagged ⛁ depend on decision-log rows.

## Target repo tree (/opt/data/workspace/nhutduong.com after APPLY)

```
├── README.md                    fresh (D8-3): stack, structure, commands, deploy note
├── AGENTS.md                    fresh (D8-3), harvests legacy gotchas; CLAUDE.md → symlink
├── DESIGN.md                    Signal token spec — copied VERBATIM from legacy root (T2)
├── LICENSE                      carried, text confirmed during apply (D8-4)
├── package.json / package-lock.json / .gitignore
├── astro.config.mjs             spec below
├── biome.json / tsconfig.json / wrangler.jsonc
├── research/                    kept as-is (D8-1) — inventory artifacts
├── plan/                        kept as-is (D8-1) — this plan + decision log
├── public/
│   ├── favicon.svg  favicon.ico  apple-touch-icon.png
│   ├── android-chrome-192x192.png  android-chrome-512x512.png
│   ├── manifest.webmanifest     (D1 host check)
│   ├── og.png                   default social image (copied binary)
│   ├── robots.txt               Sitemap host per D1
│   └── _redirects               12 × 301 (D6; ⛁ Workers-parity verify)
└── src/
    ├── assets/
    │   ├── avatar.webp          re-encoded from legacy avatar.png (D6, R7)
    │   └── fonts/source-serif-4-latin-700-normal.ttf   vendored OG font (binary copy)
    ├── content/
    │   ├── blog/  6 × .md       migrated verbatim (D4)
    │   └── pages/ about.mdx     migrated verbatim (D4; Image import → avatar.webp)
    ├── content.config.ts         schemas below
    ├── components/  BaseHead, Header, Nav, NavLink, Logo, ThemeToggle, Footer,
    │                SocialLink, Icon, Hero, Button, Badge, PostListItem,
    │                FormattedDate, Pagination, Prose, JsonLd,
    │                Breadcrumbs ⛁(D5), TOC, TOCList, TOCHeading ⛁(D5)
    ├── icons/       GitHub, LinkedIn, RSS, X (.astro inline SVG)
    ├── layouts/     BaseLayout.astro
    ├── lib/         utils.ts (cn)
    ├── styles/      global.css  (Signal token implementation — 03)
    ├── types/       index.ts
    ├── data/        site-config.ts
    ├── utils/       common-utils.ts, data-utils.ts, toc-utils.ts ⛁(D5),
    │                breadcrumb-utils.ts ⛁(D5), sitemap-utils.ts ⛁(D10)
    └── pages/
        ├── index.astro
        ├── 404.astro
        ├── [...id].astro                  pages-collection catch-all (about)
        ├── rss.xml.js
        ├── blog/[...page].astro           index + pagination
        ├── blog/[id].astro                post detail (critical path)
        ├── og/[...id].ts                  per-post OG png
        ├── tags/index.astro
        └── tags/[id]/[...page].astro      ⛁(D3-R9)
```

Fresh-written: all `src/` code. Binary copies (not code): public assets, OG font, content markdown. Everything else new.

## Page list (all static; pagination pageSize 10)

| URL | Source | Notes |
| --- | --- | --- |
| `/` | `index.astro` | Hero (site-config copy) + 5 most-recent posts, tags hidden on items |
| `/about` | `[...id].astro` | Pages-collection catch-all; Person JSON-LD injected for `about`; title fallback `seo.title ?? title` |
| `/404` | `404.astro` | noindex, no breadcrumbs, CTA home/blog; Workers `not_found_handling: 404-page` target |
| `/blog/`, `/blog/{n}/` | `blog/[...page].astro` | Date-desc; "Page n" suffix on page > 1 |
| `/blog/{slug}/` | `blog/[id].astro` | Reading time 220 wpm, tag badges, sticky TOC ⛁(D5), older/newer nav, BlogPosting JSON-LD, article OG |
| `/og/{slug}.png` | `og/[...id].ts` | astro-og-canvas OGImageRoute over blog collection; Signal-styled (03) |
| `/rss.xml` | `rss.xml.js` | ⛁(D11) full-content (AstroContainer) or summary fallback; en-us; categories = tags |
| `/tags/` | `tags/index.astro` | Counts desc + top-9 grid |
| `/tags/{tag}/`, `/tags/{tag}/{n}/` | `tags/[id]/[...page].astro` | ⛁(D3-R9) — if dropped: Badge renders without href, route file + `getPostsByTag` removed |
| `/sitemap-index.xml` | integration | lastmod per post ⛁(D10) |

Known legacy quirks to fix-or-carry deliberately (research/02): second `getCollection` in tag pages (carry: cheap), `.ts` extension imports in rss.xml.js (fix: use `@/` alias consistently), no pagination on pages catch-all (carry).

## Content model (content.config.ts — exact contract)

Zod via `astro/zod`. Shared optional override:

```ts
const seoSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().min(15).max(160).optional(),
  image: z.object({ src: z.string(), alt: z.string().optional() }).optional(),
  pageType: z.enum(["website", "article"]).default("website").optional(),
});
```

| Collection | Glob | Schema |
| --- | --- | --- |
| `blog` | `src/content/blog/**/*.{md,mdx}` | `title: z.string()` (required) · `excerpt: z.string().optional()` · `publishDate: z.coerce.date()` (required) · `updatedDate: z.coerce.date().optional()` · `tags: z.array(z.string()).default([])` · `seo: seoSchema.optional()` |
| `pages` | `src/content/pages/**/*.{md,mdx}` | `title: z.string()` (required) · `seo: seoSchema.optional()` |

**Frontmatter contract (what authors write):** `title` always; blog adds `excerpt` (doubles as meta + RSS description — keep mandatory-by-convention), `publishDate` (ISO date), optional `updatedDate`, `tags` (free-form strings; display names, slugged by `slugify`); `seo.*` is the per-item escape hatch (proven by `about`). **No draft/status field (D12).** Migrated items keep their exact frontmatter (research/data/content-inventory.json is the machine-checkable manifest: 6 posts + about, fields verified).

Derived rules: tag ids = `slugify(tag)` (lowercase, diacritics stripped via NFD, non-alphanum → dashes); sort = `publishDate` desc; reading time = words/220; sitemap lastmod = `updatedDate ?? publishDate` ⛁(D10).

## Config specs

**astro.config.mjs** — `site: "https://nhutduong.com"` ⛁(D1); `markdown.shikiConfig.theme: "css-variables"` (Signal syntax colors, 03); `fonts`: three Astro-Fonts-API Fontsource entries → `--font-dm-sans` (100–900 var), `--font-source-serif` (200–900 var), `--font-ibm-plex-mono` (400), latin subsets ⛁(D9); integrations `mdx()`, `sitemap({ serialize })` ⛁(D10) using `src/utils/sitemap-utils.ts`; vite plugins `tailwindcss()` from `@tailwindcss/vite`.

**wrangler.jsonc** — `name: "nhutduong-com"` ⛁(D2 APPROVED 2026-10-14 — **owner override** of the keep-`nhut-duong` recommendation; new worker, old one retired by the owner post-cutover) · `compatibility_date: "2026-08-30"` ⛁(D13 APPROVED) · `assets.directory: "./dist"` · `assets.not_found_handling: "404-page"`. No routes/bindings/vars — pure static assets.

**biome.json** — schema 2.5; VCS integration on; files exclude `dist`, `public`; 2-space, double quotes; linter `recommended`; `.astro` override disables `a11y/useAnchorContent`; `css.parser.tailwindDirectives: true`; HTML experimental full support; assist organizeImports on. (Parity with legacy — it is coherent; zero-JS site has no test config.)

**tsconfig.json** — extends `astro/tsconfigs/strict`; include `.astro/types.d.ts`; exclude `dist`; paths `@/*` → `./src/*`.

**.gitignore** — `dist/` + standard Astro/node entries.

**Shared contracts** (types/index.ts + data/site-config.ts): `BlogPost = CollectionEntry<"blog">`, `BaseHeadProps`, `PostListItemProps`, `TOCProps` ⛁(D5), `TocItem`, `TagData`, `BreadcrumbItem` ⛁(D5), JsonLd props re-exporting schema-dts `Thing`/`WithContext`. site-config holds title/separator/description/author/twitter, OG image, nav links, social links, hero copy+CTAs — values refreshable during APPLY, shape from legacy.

## SOURCES

- research/02-routes-pages.md (route table + quirks), 03-content-inventory.md (schemas, items, tag/slug rules), 01-architecture-config.md (config file specs), 04-components-utils.md (file inventory + contracts).
- Legacy read-only reference: `/opt/data/workspace/nhut-duong/{astro.config.mjs,wrangler.jsonc,biome.json,tsconfig.json,src/content.config.ts}`.
- Decision dependencies: decision-log.md D1, D2, D3-R9, D4, D5, D6, D9, D10, D11, D12, D13.
