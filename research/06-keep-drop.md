# 06 — Keep / Drop Candidate List (rationale per item)

This is the candidate list the rebuild plan (t_10df5b6f) must turn into explicit OWNER DECISIONS (migrate vs drop per page/content item is a required decision category; nothing here is final). Recommendation column: KEEP = strong candidate to carry into the rebuild · DECIDE = genuine owner trade-off · DROP = candidate to leave behind. Every row carries a rationale.

## A. Routes / pages (9)

| Item | Recommendation | Rationale |
| --- | --- | --- |
| `/` home (index.astro: Hero + 5 recent) | KEEP | Core personal-site entry; hero copy lives in site-config, cheap to rebuild against Signal tokens. |
| `/about` ([...id].astro pages catch-all + about.mdx) | KEEP | Sole pages-collection item; bio + Person JSON-LD is high-value SEO for a personal site; MDX needed only for the avatar Image import. |
| `/404` (404.astro) | KEEP | Required by Workers `not_found_handling: 404-page`; already noindex + on-brand. |
| `/blog/` index + pagination (blog/[...page].astro) | KEEP | Standard archive; pagination machinery (pageSize 10) is live even though only 6 posts exist. |
| `/blog/{slug}/` post detail (blog/[id].astro) | KEEP | Richest template (reading time, tags, TOC, prev/next, article meta, BlogPosting JSON-LD) — the heart of the site. |
| `/og/{slug}.png` (og/[...id].ts) | KEEP | Token-driven per-post OG images with vendored font; proven, network-free at build; astro-og-canvas is a required pin anyway. |
| `/rss.xml` (rss.xml.js) | KEEP | RSS is a first-class feature (footer link + head alternate); full-content feed via AstroContainer is a differentiator. Uses `experimental_AstroContainer` — flag for API drift check in Astro 7.3 rebuild. |
| `/tags/` index (tags/index.astro) | KEEP | 4 tags, trivial cost; supports the tag badges used in post lists. |
| `/tags/{tag}/` (tags/[id]/[...page].astro) | DECIDE | Correct but the tag taxonomy is tiny (max 2 posts/tag). Owner may prefer dropping tag pages and keeping badges as static labels; recommend KEEP as-is unless simplification is wanted. |

## B. Content items (7) — every item exactly once

| Item | Recommendation | Rationale |
| --- | --- | --- |
| `2025-year-in-review-expansion-mastery` (2025-12-27, Wrap Up) | KEEP | Newest, longest post (1,179 w); personal-history anchor. |
| `2024-year-in-review-growth-innovation` (2024-12-29, Wrap Up) | KEEP | Companion year-review; pair forms a series. |
| `mastering-meetings-in-software-development` (2024-12-14, Software Development) | KEEP | Evergreen consulting-career essay; only post in its tag. |
| `clear-git-history-for-a-fresh-initial-commit` (2024-10-26, Git) | KEEP | Evergreen how-to with code; has live 301 history (link equity to preserve via _redirects). |
| `how-to-sync-your-fork-with-upstream-changes` (2024-09-24, Git) | KEEP | Evergreen how-to with code; also has 301 history. |
| `how-to-zoom-out-iframes-using-css` (2024-09-09, CSS) | KEEP | Evergreen CSS snippet post; sole CSS-tagged item. |
| `about` page (about.mdx + avatar.png) | KEEP | Biography + Person schema; the only consumer of src/assets/avatar.png. Owner may refresh copy during migration (natural review point). |

Content-model fields to carry regardless of per-item choices: `title`, `excerpt` (meta/RSS description), `publishDate`, optional `updatedDate`, `tags`, optional `seo` override. (See 03.)

## C. Components / layout / utils (all files covered; grouped where purpose is joint)

| Item | Recommendation | Rationale |
| --- | --- | --- |
| BaseLayout.astro | KEEP | The shell everything renders in; theme bootstrap + JSON-LD + breadcrumbs + view transitions in one place. |
| BaseHead.astro | KEEP | Complete, correct SEO head (canonical normalization, OG/Twitter, article meta); hard to write better from scratch. |
| Header / Nav / NavLink / Logo | KEEP | Minimal chrome; Logo wordmark is the freshest brand decision (PR #2) — "Nhut Duong." with gold period is the identity. |
| ThemeToggle.astro | KEEP | Dark/light persistence incl. after-swap sync + theme-color metas; matches Signal's "Full light/dark" requirement. |
| Footer.astro + SocialLink.astro + Icon.astro + 4 icons | KEEP | Trivial, config-driven; social set (RSS/X/GitHub/LinkedIn) lives in site-config. |
| Hero.astro | KEEP | Homepage hero per DESIGN.md split layout; decorative gold-rule panel is pure CSS (no asset). |
| Button.astro / Badge.astro | KEEP | Signal button + badge specs implemented; used by hero, 404, tags. |
| PostListItem.astro / FormattedDate.astro / Pagination.astro | KEEP | Blog-listing primitives; FormattedDate's UTC rendering avoids build-locale drift. |
| Prose.astro | KEEP | Typography-plugin wrapper + heading anchor links; AGENTS.md documents the max-w-none rationale. |
| Breadcrumbs.astro + breadcrumb-utils.ts | DECIDE | Nice depth cue + BreadcrumbList JSON-LD, but on a 9-route site breadcrumbs add boilerplate; owner may simplify. Recommend KEEP (already built and accessible). |
| TOC.astro + TOCList.astro + TOCHeading.astro + toc-utils.ts | DECIDE | Most complex JS in the repo (custom element, scroll progress). High polish, real value on long posts; owner may trade for a static TOC. Recommend KEEP — it is the flagship reading UX. |
| JsonLd.astro + schema-utils.ts | KEEP | schema-dts-typed JSON-LD factories (WebSite/WebPage/Person/BlogPosting); pin list includes schema-dts precisely for this. |
| lib/utils.ts (`cn`) | KEEP | Required pin pair clsx+tailwind-merge has exactly this surface. |
| common-utils.ts (`slugify`) | KEEP | Diacritic-safe slugs; needed wherever tags render. |
| data-utils.ts | KEEP | Sort/tag-query helpers used by 4 routes. |
| types/index.ts + data/site-config.ts | KEEP | Shared contracts + single source of site copy; carry the pattern (values may be refreshed). |
| styles/global.css | KEEP (structure) | Token implementation IS the Signal adoption; carry structure, re-derive from DESIGN.md during rebuild rather than blind copy. |

## D. Assets

| Item | Recommendation | Rationale |
| --- | --- | --- |
| favicon set (svg + ico + apple-touch + 2× android-chrome) | KEEP | Complete PWA icon set; zero cost. |
| manifest.webmanifest | KEEP | PWA basics; theme color already Signal surface token. |
| og.png (default social image) | KEEP | Referenced by siteConfig.image for non-post pages. |
| robots.txt | KEEP | Must exist; hardcoded sitemap host = nhutduong.com must match the owner's domain decision. |
| `_redirects` (12 × 301) | KEEP | Preserves SEO for 4 renamed slugs + their OG URLs; dropping breaks inbound links. Verify Cloudflare Workers static-assets `_redirects` support parity in rebuild (owner/apply-phase check). |
| src/assets/avatar.png (660 KB) | KEEP (re-encode) | Only About consumer; migrate but pre-optimize (WebP/AVIF or compressed PNG) — 660 KB is heavy for a portrait. |
| src/assets/fonts/source-serif-4-latin-700-normal.ttf | KEEP | Makes astro-og-canvas builds deterministic (no font fetch); required by the OG endpoint. |

## E. Config & repo-level files

| Item | Recommendation | Rationale |
| --- | --- | --- |
| astro.config.mjs shape (site, shiki css-variables, fonts, mdx, sitemap+serialize, tailwind vite) | KEEP w/ REVIEW | All integrations are pinned deps; sitemap `getBlogLastmod` regex hack deserves a cleaner rebuild (read frontmatter via content layer or drop lastmod). |
| wrangler.jsonc | DECIDE | Config pattern (assets ./dist + 404-page) is required by the pins; worker NAME `nhut-duong` and the domain question are explicit owner decisions (b) and (a). |
| biome.json | KEEP | Matches pin; opinionated but coherent (astro override, tailwind directives). |
| tsconfig.json (strict + @/* alias) | KEEP | Matches pin spirit; alias used everywhere. |
| package.json scripts | KEEP w/ DELTA | Add `astro build` to `ci` per root task FINAL VERIFY (legacy ci = biome ci && astro check only). |
| README.md / AGENTS.md / CLAUDE.md symlink | DECIDE | Valuable docs, but rebuild-from-scratch repo should write fresh ones; harvest AGENTS.md gotchas into the new docs instead of copying. LICENSE: confirm + carry (personal-site license). |
| .vscode/ (extensions, settings, launch) | DROP (candidate) | Developer convenience only; trivially re-addable. Owner call, zero functional impact. |
| DESIGN.md | KEEP | Mandated by root task: Signal token spec is the styling source of truth for the rebuild. |

## Summary counts

Routes: 8 KEEP + 1 DECIDE · Content: 7 KEEP (0 DECIDE) · Components/utils: 14 KEEP + 2 DECIDE groups (all 33 files covered) · Assets: 7 KEEP (1 re-encode) · Config: 4 KEEP (2 with deltas) + 2 DECIDE + 1 DROP candidate. Open owner decisions surfaced for the planner: tag pages, breadcrumbs, TOC complexity, worker name, domain routing, `_redirects` carry-over, docs rewrite, `.vscode`.
