# 04 — Components, Layout, Utils, Types, Data (one-line purpose each)

Every file in `src/components` (21), `src/icons` (4), `src/layouts` (1), `src/lib` (1), `src/utils` (5), plus `src/types`, `src/data`, `src/styles`.

## Layout

| File | Purpose |
| --- | --- |
| `src/layouts/BaseLayout.astro` | Site shell for every page: blocking theme script (localStorage/prefers-scheme), BaseHead, `<Font>` preloads, JSON-LD (WebSite + WebPage + custom), breadcrumbs with structured data, skip-to-content, Header/Footer, ClientRouter view transitions; props extend BaseHeadProps with `showBreadcrumbs`, `lastModified`, `customSchemas`. |

## Components (src/components)

| File | Purpose |
| --- | --- |
| `BaseHead.astro` | All `<head>` meta: branded title with separator (≤60-char guard), canonical with trailing-slash normalization, favicon/manifest/sitemap/RSS links, description/author/robots/theme-color, full OG + Twitter card tags, article published/modified/tag meta. |
| `Header.astro` | Page header: Logo link + Nav, max-w-7xl. |
| `Nav.astro` | Primary nav from `siteConfig.primaryNavLinks` + ThemeToggle. |
| `NavLink.astro` | Nav anchor with prefix-match active state (gold underline, aria-current). |
| `Logo.astro` | Wordmark "Nhut Duong." — Source Serif 4 bold with muted-gold period (replaced the old "n." SVG glyph in PR #2). |
| `ThemeToggle.astro` | Light/dark toggle button: persists to localStorage, syncs `theme-color` metas, re-applies after `astro:after-swap`, respects OS scheme changes. |
| `Footer.astro` | Copyright (dynamic year) + social icon links. |
| `Hero.astro` | Homepage hero from `siteConfig.hero`: mono kicker with gold rule, clamp-sized serif H1, 72ch text, primary/secondary CTAs, decorative gold-rule "blueprint" panel (desktop only). |
| `Button.astro` | Anchor-styled button, primary (gold on navy) / secondary (outline) variants, focus ring + active press. |
| `Badge.astro` | Small filled tag pill; renders as `<a>` when `href` given (tags), `<div>` otherwise (counts). |
| `PostListItem.astro` | Blog list row: linked title, FormattedDate, tag badges (optional `hideTags`). |
| `FormattedDate.astro` | `<time>` with en-US long date, UTC timezone (build-machine-locale independent). |
| `Pagination.astro` | Prev/next + "Page x of y" nav from Astro's `Page` object (uses `lastPage`). |
| `Prose.astro` | Tailwind-typography wrapper (`prose sm:prose-lg max-w-none`) + client script adding "#" anchor links to h2–h4 on page-load. |
| `Breadcrumbs.astro` | Accessible breadcrumb nav (ol) with chevron separators; last item aria-current. |
| `Icon.astro` | Name→component map dispatcher for the four brand icons. |
| `SocialLink.astro` | Icon-only external link (target _blank, sr-only label) used in Footer. |
| `JsonLd.astro` | Emits one `<script type="application/ld+json">` (array-normalized, `<`-escaped). |
| `TOC.astro` | Article table of contents: `<details>` on mobile / sticky list on desktop, plus the `toc-heading` custom element with rAF-throttled scroll progress bars, smooth scroll, aria-current, reduced-motion respect, listener cleanup. |
| `TOCList.astro` | Renders TOC root `<toc-heading>` wrapper + nested `<ul>`. |
| `TOCHeading.astro` | Recursive TOC `<li>` with progress bar span and depth indentation. |

## Icons (src/icons) — inline SVG brand marks, `class` passthrough

`GitHub.astro`, `LinkedIn.astro`, `RSS.astro`, `X.astro`.

## lib

| File | Purpose |
| --- | --- |
| `src/lib/utils.ts` | Single export `cn()` = tailwind-merge(clsx(...)) — the only clsx/tailwind-merge usage surface. |

## utils (src/utils)

| File | Purpose |
| --- | --- |
| `common-utils.ts` | `slugify()` — lowercase, strip diacritics (NFD), non-alphanum → dashes. Used for tag ids everywhere. |
| `data-utils.ts` | `sortItemsByDateDesc()`, `getAllTags()` (dedupe by slugified id), `getPostsByTag()`. |
| `toc-utils.ts` | `generateToc()` — nests h3+ under h2s; throws at build time on orphan headings. |
| `breadcrumb-utils.ts` | `generateBreadcrumbItems()` (path-aware labels; resolves post/tag titles via getCollection; collapses >3 crumbs), `shouldShowBreadcrumbs()`, `generateBreadcrumbStructuredData()` (BreadcrumbList JSON-LD). |
| `schema-utils.ts` | JSON-LD factories: `createWebSiteSchema`, `createPersonSchema` (jobTitle Bosch Digital, HCMC address, knowsAbout, sameAs filtered of self-domain), `createWebPageSchema`, `createBlogPostingSchema`. URLs derive from `import.meta.env.SITE`. |

## types / data / styles

| File | Purpose |
| --- | --- |
| `src/types/index.ts` | Shared types: `BlogPost` (CollectionEntry<"blog">), `BaseHeadProps`, `PostListItemProps`, `TOCProps`, `TocItem`, `TagData`, `BreadcrumbItem`, `JsonLdProps`; re-exports schema-dts `Thing`/`WithContext`. |
| `src/data/site-config.ts` | Single source of truth for site title/separator/description/author/twitter, OG image, primary nav, social links (RSS, X, GitHub, LinkedIn), hero copy + CTAs. |
| `src/styles/global.css` | Tailwind v4 entry: `@import "tailwindcss"`, typography plugin, `@custom-variant dark`, Signal tokens as `:root`/`.dark` CSS vars, `@theme inline` color/font/radius mapping, base layer, reduced-motion guard, prose overrides, Shiki css-variables token colors. Detail in 05. |

## src/assets

| File | Purpose |
| --- | --- |
| `src/assets/avatar.png` | Author photo for About (astro:assets import; 660 KB — heaviest asset in the repo; optimization opportunity). |
| `src/assets/fonts/source-serif-4-latin-700-normal.ttf` | Vendored OG-image font (53 KB) used by astro-og-canvas; makes OG generation network-free at build time. |
