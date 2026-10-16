# 02 — Routes & Pages (complete enumeration from src/pages)

9 route files → static routes. Pagination pageSize is 10 everywhere; with 6 posts no second page currently exists, but the machinery is live.

| # | Source file | URL pattern | Purpose / notes |
| --- | --- | --- | --- |
| 1 | `src/pages/index.astro` | `/` | Home: Hero (from siteConfig.hero) + 5 most-recent posts via PostListItem (tags hidden). |
| 2 | `src/pages/[...id].astro` | `/{page.id}` → currently only `/about` | Catch-all renderer for the `pages` MDX collection; special-cases `about` to inject Person JSON-LD; title falls back `seo.title ?? title`. |
| 3 | `src/pages/404.astro` | `/404` | Not-found page: `noindex`, breadcrumbs off, Button to `/` + blog link. Served by Workers `not_found_handling: 404-page`. |
| 4 | `src/pages/blog/[...page].astro` | `/blog/`, `/blog/{n}/` | Blog index, paginated (10/page), posts sorted `sortItemsByDateDesc`; title gains "Page n" on page > 1. |
| 5 | `src/pages/blog/[id].astro` | `/blog/{slug}/` | Post detail: reading time (220 wpm), tag badges, sticky TOC, older/newer post nav, per-post OG image reference, BlogPosting JSON-LD, article OG meta. |
| 6 | `src/pages/og/[...id].ts` | `/og/{slug}.png` | Per-post OG image endpoint via astro-og-canvas `OGImageRoute` — blog collection only (no OG endpoint for pages). Signal-styled: bone bg, 10px gold border, navy Source Serif 4 title, android-chrome-512 logo. |
| 7 | `src/pages/rss.xml.js` | `/rss.xml` | Full-content RSS (renders each post to HTML via `experimental_AstroContainer`), `en-us`, categories = tags. |
| 8 | `src/pages/tags/index.astro` | `/tags/` | All tags with counts (sorted desc) + "Popular Tags" top-9 grid. |
| 9 | `src/pages/tags/[id]/[...page].astro` | `/tags/{tag}/`, `/tags/{tag}/{n}/` | Per-tag listing, paginated (10/page), tags hidden on items. |

Generated (non-file) routes: `/sitemap-index.xml` (+ per-page sitemaps) from the sitemap integration; canonical URLs are trailing-slash normalized in BaseHead (`formatCanonicalURL` skips paths with a file extension).

Route quirks worth knowing for the rebuild:

- `blog/[id].astro` `getStaticPaths` computes prev/next from the date-sorted list — cheap and static.
- `tags/[id]/[...page].astro` calls `getCollection("blog")` a second time outside `getStaticPaths` to resolve the current tag's display name.
- `og/[...id].ts` builds its page map from `post.id`; slugs with dots or case changes would need care.
- The `[...id].astro` pages route has no pagination and no TOC; it is intentionally simpler than blog posts.
- `rss.xml.js` imports utils with explicit `.ts` extensions (works, but inconsistent with the `@/` alias style elsewhere).
