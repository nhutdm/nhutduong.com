# 03 — Content Inventory (every item exactly once)

Extraction: scripted frontmatter parse (PyYAML) over `src/content/**` — output verified against the file tree. Body stats = whitespace-split word count of the body (excludes frontmatter).

## Collections & schemas (`src/content.config.ts`)

Shared `seoSchema` (optional): `title` (1–120), `description` (15–160), `image {src, alt?}`, `pageType` enum website|article (default website).

- `blog` — glob `**/*.{md,mdx}` under `./src/content/blog`. Schema: `title` (required), `excerpt?`, `publishDate` (coerced Date, required), `updatedDate?` (coerced Date), `tags` (string[], default []), `seo?`.
- `pages` — glob `**/*.{md,mdx}` under `./src/content/pages`. Schema: `title` (required), `seo?`.

No `draft`/`status` field exists in either schema; there is no draft mechanism. Status of every item below is therefore `published` (built unconditionally).

## Blog posts (6) — sorted by publishDate desc

| Slug (`post.id`) | Title | publishDate | updatedDate | Status | Tags | Size / body words |
| --- | --- | --- | --- | --- | --- | --- |
| `2025-year-in-review-expansion-mastery` | 2025 Year in Review: Expansion & Mastery | 2025-12-27 | — | published | Wrap Up | 8,046 B / 1,179 w |
| `2024-year-in-review-growth-innovation` | 2024 Year in Review: Growth & Innovation | 2024-12-29 | — | published | Wrap Up | 5,309 B / 775 w |
| `mastering-meetings-in-software-development` | Mastering Meetings in Software Development | 2024-12-14 | — | published | Software Development | 6,033 B / 801 w |
| `clear-git-history-for-a-fresh-initial-commit` | Clear Git History for a Fresh Initial Commit | 2024-10-26 | — | published | Git | 3,620 B / 503 w |
| `how-to-sync-your-fork-with-upstream-changes` | How to Sync Your Fork with Upstream Changes | 2024-09-24 | — | published | Git | 3,001 B / 428 w |
| `how-to-zoom-out-iframes-using-css` | How to Zoom Out iframe Using CSS | 2024-09-09 | — | published | CSS | 3,012 B / 440 w |

All six are `.md` (no MDX in blog), no code-component imports, no `seo` overrides, no `updatedDate` set (so sitemap lastmod falls back to publishDate). Code blocks present in the three how-to posts (git×2, css×1); the two year-reviews and the meetings essay are prose-only.

## Pages (1)

| Slug (`page.id`) | Title | Status | SEO override | Size / body words | Notes |
| --- | --- | --- | --- | --- | --- |
| `about` | About | published | title "About" + description | 1,793 B / 231 w | MDX; imports `Image` from `astro:assets` + `src/assets/avatar.png`; floated grayscale avatar, hover effects; bio text (Bosch Digital consultant, ex-DXC, HCMC, family, hobbies) |

## Tag index (derived)

| Tag | Slug (`slugify`) | Posts |
| --- | --- | --- |
| Wrap Up | `wrap-up` | 2 (2024 + 2025 year reviews) |
| Git | `git` | 2 (sync fork, clear history) |
| CSS | `css` | 1 (iframe zoom) |
| Software Development | `software-development` | 1 (meetings) |

4 unique tags → 4 tag routes, each with ≤ 10 posts so exactly one page each.

## Slug-rename history (from `public/_redirects`)

Four posts were renamed after publication; 301s preserve the old URLs (both with and without trailing slash) plus their OG images:

| Old slug | Current slug |
| --- | --- |
| `clear-git-history-to-start-fresh-with-a-new-initial-commit-guide` | `clear-git-history-for-a-fresh-initial-commit` |
| `how-to-synchronize-your-fork-repository-with-upstream-changes` | `how-to-sync-your-fork-with-upstream-changes` |
| `2024-year-in-review-growth-innovation-family-foundations` | `2024-year-in-review-growth-innovation` |
| `2025-year-in-review-expansion-mastery-new-horizons` | `2025-year-in-review-expansion-mastery` |

## Content-model observations for the rebuild

1. `excerpt` doubles as meta description and RSS description — keep in the new frontmatter contract.
2. `updatedDate` is supported end-to-end (schema → sitemap lastmod → "Updated on" UI → article:modified_time) but unused by all current posts; keep the capability.
3. `seo` override is only exercised by `about` — the escape hatch is proven.
4. Tag taxonomy is tiny and free-form; no tag pages exist for empty tags (correctly so).
5. `pages` collection is a single MDX file using `astro:assets` — the only content-side asset dependency (avatar.png).
