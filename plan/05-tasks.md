# 05 — Implementation Tasks (APPLY phase)

> **For the APPLY worker (t_5862e455):** execute top-to-bottom; steps use `- [x]` checkboxes. PRECONDITION: decision-log.md shows every row APPROVED — if any row your task consumes (map in each header) is blank, `kanban_block` with the question, never guess. Execute per superpowers:executing-plans (or subagent-driven-development if the orchestrator dispatches per-task).

**Goal:** Fresh Astro 7 + Tailwind 4 rebuild of nhutduong.com per 02-architecture.md, styled exclusively by DESIGN.md Signal tokens (03), deps per 04-dependencies.md, behavior-parity with the read-only legacy reference.

**Architecture:** static, zero-JS (no framework islands; vanilla scripts only); content collections with Zod schemas; Workers static assets deploy. **Tech stack:** see 04-dependencies.md (pin-exact). **Spec:** plan/02 + 03 + 04 + decision-log.md; research/ under research/ is the factual inventory.

## Global constraints (every task implicitly includes these)

- Deps: exactly the table in 04-dependencies.md — no additions/removals without a new logged owner decision.
- Local commits only. NEVER push, deploy, or touch gh/wrangler credentials. Legacy clone `/opt/data/workspace/nhut-duong` is READ-ONLY (behavioral reference, copy content/binaries only where a task says so).
- New code is written fresh; consult legacy twins for behavior, do not wholesale-copy `src/`.
- Every task ends with the verify trio green before its commit: `npx biome ci` · `npx astro check` · `npx astro build` (+ the task's dist assertions). No test runner exists in this stack — dist assertions are the test loop.
- Style: Signal tokens only (03 verification greps); Biome passes; TypeScript strict.

## Review Focus — five failure modes and the task that pins each

1. **Renamed-slug redirect loss** (8 old post URLs + 4 OG URLs 404) → T9 asserts `dist/_redirects` = 12 lines + verifies Workers semantics (risk R2).
2. **Dark-mode FOUC** on first paint → T4 asserts the theme script is inline-blocking, before stylesheet paint, in `dist/index.html` (R5).
3. **Sitemap lastmod silently wrong** → T12 asserts `dist/sitemap-0.xml` carries the known publishDate of `clear-git-history-for-a-fresh-initial-commit` (2024-10-26) (R6).
4. **RSS experimental-container API drift** breaking the build or emitting empty items → T11 asserts `dist/rss.xml` contains the newest post's body HTML (R1).
5. **Canonical/OG URL duplication (trailing slash)** → T4's BaseHead dist assertion: canonical in `dist/blog/<slug>/index.html` is trailing-slash; extension paths (og/*.png, rss.xml) are not slashed.

---

### Task 1 — Scaffold: pinned deps + toolconfig

**Decisions:** D7 (dep strategy), D13 (compat date). **Files (create):** `package.json`, `package-lock.json`, `.gitignore`, `astro.config.mjs` (minimal: site per D1 + mdx() only), `tsconfig.json`, `biome.json`, `wrangler.jsonc`, `src/pages/index.astro` (placeholder).
**Interfaces:** produces the workspace every later task builds in; `@/*` alias live.

- [x] Write `package.json`: deps/devDeps exactly per 04-dependencies.md; scripts per its Scripts table (incl. `ci` = `biome ci && astro check && astro build`); `engines.node >=22.12.0`. No other fields invented.
- [x] `npm install` → lockfile committed. Expected: resolves within pins; note resolved versions in commit body.
- [x] Write `wrangler.jsonc`: name per D2 answer, `compatibility_date` per D13, `assets.directory ./dist`, `assets.not_found_handling "404-page"`.
- [x] Write `tsconfig.json` / `biome.json` per 02 §Config specs; `.gitignore` (dist/, node_modules/, .astro/).
- [x] Placeholder `src/pages/index.astro` (`<html><body>placeholder</body></html>`).
- [x] Verify: `npx biome ci && npx astro check && npx astro build` — all green; `ls dist/index.html`.
- [x] Commit: `chore: scaffold Astro 7 + Tailwind 4 workspace (pinned deps, toolconfig)`.

### Task 2 — Signal tokens + fonts

**Decisions:** D9. **Files:** copy `/opt/data/workspace/nhut-duong/DESIGN.md` → `DESIGN.md` (verbatim); create `src/styles/global.css`; extend `astro.config.mjs` fonts block.
**Interfaces:** produces the token contract (03 §Token map) consumed by ALL later styling.

- [x] Copy DESIGN.md verbatim; `git diff --no-index` against legacy confirms byte-identical.
- [x] Write `global.css` per 03 §structure (7 sections), re-deriving values from DESIGN.md (not blind copy).
- [x] Fonts block in astro.config.mjs per 02 (Fontsource: DM Sans var, Source Serif 4 var, IBM Plex Mono 400 → `--font-*` vars) — network needed on cold cache (R3).
- [x] Verify: build green; `grep -l '#f0ece3' dist/_astro/*.css` non-empty AND one file contains both `--background:#f0ece3` and `.dark`; raw-hex grep (03 §Verification) clean.
- [x] Commit: `feat: Signal design tokens (DESIGN.md + global.css) + font loading`.

### Task 3 — Content model, types, site-config, utils

**Decisions:** D5 (breadcrumb/toc utils), D10 (sitemap-utils), D12. **Files:** `src/content.config.ts`, `src/types/index.ts`, `src/data/site-config.ts`, `src/lib/utils.ts`, `src/utils/{common-utils,data-utils,toc-utils,breadcrumb-utils,sitemap-utils}.ts`.
**Interfaces (produced, exact):** `cn(...classes): string`; `slugify(s): string` (NFD, lowercase, non-alphanum→dash); `sortItemsByDateDesc(posts): BlogPost[]`; `getAllTags(posts): TagData[]` (dedupe by slugified id); `getPostsByTag(posts, tag)`; `generateToc(headings)` (h2/h3 nesting, build-time throw on orphans) ⛁D5; breadcrumb trio ⛁D5; `getBlogLastmod(url)` in sitemap-utils ⛁D10 (isolated file-read helper, documented assumptions).

- [x] `content.config.ts` exactly per 02 §Content model (two collections, shared seoSchema, no draft field unless D12 says otherwise).
- [x] Types + site-config per 02 §Shared contracts (site copy values refreshable; shape = legacy).
- [x] Utils per Interfaces above; behavior spec = legacy twins (research/04 rows).
- [x] Verify: trio green (`astro check` proves schema+type contracts).
- [x] Commit: `feat: content model, shared types, site config, utils`.

### Task 4 — BaseLayout, BaseHead, chrome

**Decisions:** D1 (site URL), D5 (breadcrumbs). **Files:** `src/layouts/BaseLayout.astro`, `src/components/{BaseHead,Header,Nav,NavLink,Logo,ThemeToggle,Footer,SocialLink,Icon,JsonLd}.astro`, `src/icons/{GitHub,LinkedIn,RSS,X}.astro`.
**Interfaces:** `BaseLayout` props extend `BaseHeadProps` with `showBreadcrumbs`, `lastModified`, `customSchemas`; BaseHead emits full meta set (branded title ≤60 chars, canonical w/ trailing-slash normalization skipping extension paths, favicon/manifest/RSS/sitemap links, OG+Twitter, article meta, robots, theme-color).

- [x] Port the **blocking** theme script behavior (localStorage → prefers-scheme, before paint) + ThemeToggle (after-swap re-apply, theme-color sync) — spec: legacy ThemeToggle/BaseLayout.
- [x] Header/Nav/NavLink (prefix-match active, gold underline, aria-current), Logo wordmark "Nhut Duong." (Source Serif 4 bold, gold period), Footer + SocialLink + Icon + 4 icons, JsonLd (array-normalized, `<`-escaped).
- [x] BaseHead per Interfaces; title separator + fallback `seo.title ?? title`.
- [x] Verify: trio green; **Review-Focus checks #2 (FOUC) and #5 (canonical)** — assertions in dist HTML of placeholder page.
- [x] Commit: `feat: site shell — layout, head, chrome, theme, JSON-LD`.

### Task 5 — Primitives

**Files:** `src/components/{Button,Badge,FormattedDate,PostListItem,Pagination,Prose,Breadcrumbs}.astro` (Breadcrumbs ⛁D5 — skip if dropped).
**Interfaces:** Button (anchor, primary gold-on-navy / secondary outline, focus ring, −1px press); Badge (`<a>` with href, `<div>` without); PostListItem (linked title + FormattedDate + optional `hideTags` badges); Pagination (from Astro `Page`, uses `lastPage`); Prose (`prose sm:prose-lg max-w-none` + h2–h4 anchor-link script); FormattedDate (`<time>`, en-US long, **UTC** — build-locale independent).

- [x] Implement each per Interfaces + Signal specs (03 §Motion/don'ts).
- [x] Verify: trio green; `astro check` proves props contracts.
- [x] Commit: `feat: UI primitives (button, badge, list item, pagination, prose, breadcrumbs)`.

### Task 6 — Simple routes: home, about, 404, tags

**Decisions:** D3-R1/R2/R3/R8/R9. **Files:** `src/pages/{index,404}.astro`, `src/pages/[...id].astro`, `src/pages/tags/index.astro`, `src/pages/tags/[id]/[...page].astro` (last two per R9 — tags/[id] only if kept).
**Interfaces:** consumes Hero (`src/components/Hero.astro`), T3 utils, T5 primitives; `[...id].astro` special-cases `about` → Person JSON-LD.

- [x] Home: `src/components/Hero.astro` (per 02 tree; site-config copy, Signal hero clamp) + 5 recent posts (tags hidden).
- [x] `[...id].astro` pages-collection catch-all (no pagination/TOC — legacy parity); 404 (noindex, no breadcrumbs, CTA buttons); tags index (counts desc + top-9 grid); tags/[id] per R9 (resolve tag display name once, inside getStaticPaths — fixes legacy's double getCollection quirk).
- [x] Verify: trio green; with T8 not yet migrated, collections are empty — pages must still build (empty states correct).
- [x] Commit: `feat: home, about catch-all, 404, tags routes`.

### Task 7 — Post detail (CRITICAL PATH)

**Decisions:** D5 (TOC). **Files:** `src/pages/blog/[id].astro`; `src/components/{TOC,TOCList,TOCHeading}.astro` (TOC suite ⛁D5).
**Interfaces:** reading time = body words/220; prev/next from date-sorted list (static); sticky TOC desktop / `<details>` mobile, `toc-heading` custom element w/ rAF-throttled scroll progress, aria-current, reduced-motion respect; BlogPosting JSON-LD via T3 schema factory; article OG meta (published/modified/tags).

- [x] getStaticPaths from blog collection (will be empty until T8 — structure + types now).
- [x] Template per Interfaces; TOC suite per D5 answer (full / static / none).
- [x] Verify: trio green; `astro check` on TOC types (`TocItem[]`).
- [x] Commit: `feat: blog post detail with TOC and article meta`.

### Task 8 — Content migration

**Decisions:** D4, D6 (avatar). **Files:** copy 6 × `.md` → `src/content/blog/`, `about.mdx` → `src/content/pages/` (verbatim; `Image` import retargeted to `avatar.webp`); create `src/assets/avatar.webp` (re-encode legacy avatar.png, target ≤100 KB); copy `src/assets/fonts/source-serif-4-latin-700-normal.ttf`.

- [x] Copy content files verbatim; verify frontmatter matches `research/data/content-inventory.json` (6 posts: titles/dates/tags; about: seo override) — script or eyeball against the JSON.
- [x] Re-encode avatar to WebP (R7): `cwebp`/sharp/ImageMagick per availability; assert size ≤100 KB.
- [x] Verify: trio green NOW renders real pages; `ls dist/blog/` shows 6 slug dirs; `ls dist/about/`.
- [x] Commit: `feat: migrate legacy content (6 posts + about) and assets`.

### Task 9 — Public assets + redirects

**Decisions:** D1, D6. **Files:** copy binaries `favicon.{svg,ico}`, `apple-touch-icon.png`, `android-chrome-{192x192,512x512}.png`, `og.png`; create `manifest.webmanifest` (name "Nhut Duong", standalone, theme/background `#f0ece3`), `robots.txt` (Allow all + `Sitemap: <D1 host>/sitemap-index.xml`), `_redirects` (12 lines verbatim from research/03 §slug-rename).

- [x] Copy binaries + write manifest/robots per D1 answer.
- [x] `_redirects` per D6 answer; **Review-Focus check #1**: `wc -l dist/_redirects` = 12 and each old slug maps to current; verify current Cloudflare Workers static-assets docs honor `_redirects` (R2) — if unsupported, do NOT improvise: block the card with the finding + fallback options (D6 lists them).
- [x] Verify: build green; dist contains all 9 public files.
- [x] Commit: `feat: public assets — favicons, manifest, og, robots, redirects`.

### Task 10 — OG image endpoint

**Files:** `src/pages/og/[...id].ts`.
**Interfaces:** astro-og-canvas `OGImageRoute` over blog collection; page map keyed by `post.id` (research/02 quirk: slugs with dots/case need care — none exist today, assert no dots in ids); style constants from 03 §Token consumers (bone bg, 10px gold border, navy Source Serif 4 700 via vendored TTF, android-chrome-512 logo).

- [x] Implement endpoint per Interfaces (fonts: vendored TTF path — network-free).
- [x] Verify: build green; `ls dist/og/*.png` = 6 files, each non-empty.
- [x] Commit: `feat: per-post OG image endpoint (token-styled)`.

### Task 11 — RSS feed

**Decisions:** D11. **Files:** `src/pages/rss.xml.js`.
**Interfaces:** full-content (renders posts via `experimental_AstroContainer`) if D11=full: `en-us`, categories = tags, description from excerpt. Imports use `@/` alias (fixes legacy `.ts`-extension quirk).

- [x] Re-verify `experimental_AstroContainer` against installed Astro 7.3 docs FIRST (R1); implement per D11 answer (fallback = summary-only, record flip in decision log as amendment).
- [x] **Review-Focus check #4:** build green; `dist/rss.xml` contains newest post title AND its body HTML (grep).
- [x] Commit: `feat: RSS feed (full-content per D11)`.

### Task 12 — Sitemap lastmod + ci + docs + final dry-run

**Decisions:** D8, D10. **Files:** `astro.config.mjs` (sitemap serialize via `src/utils/sitemap-utils.ts` ⛁D10), `README.md`, `AGENTS.md` (+ `CLAUDE.md` symlink), `LICENSE`.

- [x] Sitemap serialize per D10 (or none if dropped); **Review-Focus check #3**: `dist/sitemap-0.xml` has lastmod 2024-10-26 (±00:00 TZ) for the clear-git-history URL.
- [x] Fresh README (stack, structure, commands incl. `ci`, deploy note: owner-run `npm run build && npx wrangler deploy`) + AGENTS.md (conventions, Signal rules, fonts-network gotcha, Prose max-w-none rationale) per D8; LICENSE carried (confirm text vs legacy before commit).
- [x] Full gate: `npm run ci` (biome ci && astro check && astro build) green; dist spot-list: `index.html`, `about/`, `404.html`, `blog/` (6 posts + index), `tags/` (+4 tag dirs per D3-R9), `og/` (6 png), `rss.xml`, `sitemap-index.xml`, `_redirects`, manifest, robots.
- [x] Commit: `feat: sitemap lastmod, fresh docs, license; ci gate complete`.

Post-T12 (FINAL VERIFY phase, separate card t_63c88057): clean history, full `npm run ci`, hand-off summary of exactly what the gateway shell pushes/deploys (repo push + `wrangler deploy` + any D6/D2 Cloudflare-side actions).

## SOURCES

- 02-architecture.md (tree, routes, content model, configs), 03-design-tokens.md (token pipeline + verification), 04-dependencies.md (deps + scripts), decision-log.md (D-rows each task consumes), 01-summary.md (risk register R1–R8).
- research/02-routes-pages.md + 04-components-utils.md (behavioral specs per file), research/03 (content manifest + redirects), research/01 (config parity).
- Legacy read-only reference root: `/opt/data/workspace/nhut-duong`.
