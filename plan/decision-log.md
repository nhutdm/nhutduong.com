# OWNER DECISION LOG — nhutduong.com rebuild

Protocol (from task t_10df5b6f + root t_f72e3533): every open trade-off is an explicit OWNER DECISION — never chosen silently. The OWNER GATE worker (t_cb7fe165) presents D1–D13 to the owner, records answers **verbatim** in the Answer column, commits this file, and clears the gate. The APPLY worker treats APPROVED answers as law; any trade-off not covered below blocks the affected card.

- Recommendation = the planner's advice with rationale. It carries **no authority** until the owner answers.
- Status: OPEN → ANSWERED (owner text recorded) → APPROVED (gate committed + cleared). All 13 rows reached APPROVED on 2026-10-14 — see Gate record.
- Bulk option: the owner may answer "accept all recommendations" — it is recorded verbatim and applies to every row's recommendation.

## Gate record

- Presented to owner: 2026-10-14 (gate run 3, in-session) — compact summary board of D1–D13.
- Owner answers received: 2026-10-14 — Nhut, via gateway chat, relayed verbatim on board card t_cb7fe165 by profile `default`.
- Recorded verbatim and committed by the gate worker (run 4, 2026-10-14): **13/13 rows ANSWERED → APPROVED.**
- Owner override of a planner recommendation: **D2 only** — worker renamed to `nhutduong-com` (Option 2). Old-worker retirement after cutover is a GATEWAY-SHELL action (owner-managed), NOT a worker task.
- Bulk answer "Accept all 8 recommendations" applies to D5, D6, D7, D8, D10, D11, D12, D13 (each row takes its own recommendation).
- **GATE CLEARED** → APPLY (t_5862e455) released. Standing rule unchanged: any trade-off not covered below blocks the affected card — never decided silently.

## Summary board

| ID | Decision | Recommendation (short) | Status |
| --- | --- | --- | --- |
| D1 | Domain routing: nhutduong.com vs legacy nhutdm.com | nhutduong.com sole canonical | APPROVED |
| D2 | Cloudflare Worker name | Keep `nhut-duong` | **APPROVED — owner override: `nhutduong-com`** |
| D3 | Route migrate/drop (9 routes) | Keep all 9 (incl. tag pages) | APPROVED |
| D4 | Content migrate/drop (7 items) | Migrate all 7 | APPROVED |
| D5 | Breadcrumbs + TOC complexity | Keep both (full TOC) | APPROVED (bulk) |
| D6 | Assets: `_redirects`, avatar format | Carry `_redirects` (verify); avatar → WebP re-encode | APPROVED (bulk) |
| D7 | Dependency deltas (additions/strategy) | Add `@astrojs/check`; caret ranges + lockfile | APPROVED (bulk) |
| D8 | Repo hygiene: research/plan dirs, .vscode, docs | Keep dirs; drop .vscode; write fresh docs; carry LICENSE | APPROVED (bulk) |
| D9 | Typography: body font + font loading | DM Sans body (confirm spec deviation); self-host via Astro Fonts API | APPROVED |
| D10 | Sitemap lastmod approach | Keep per-post lastmod, isolate the file-read helper | APPROVED (bulk) |
| D11 | RSS feed richness | Full-content feed (fallback to excerpt if API drift bites) | APPROVED (bulk) |
| D12 | Draft mechanism in content schema | None (legacy parity; add later if needed) | APPROVED (bulk) |
| D13 | wrangler compatibility_date | Keep `2026-08-30` | APPROVED (bulk) |
| D14 | Signal-prompt anatomy scope (15/10) | Adapt selectively: hero 2nd button + 3-card "what I do" + final CTA; skip testimonials/pricing | APPROVED (owner gate 15/10) |
| D15 | Entry animations (15/10) | Adopt: 420ms rise, 80ms stagger, transform/opacity only, reduced-motion respected | APPROVED (owner gate 15/10) |
| D16 | Texture/rhythm (15/10) | Moderate: bone cards + lift shadows + gold rules; keep generous spacing, no navy full-bleed/compaction | APPROVED (owner gate 15/10) |
| D17 | Interaction polish (15/10) | 200–250ms hovers + unified 2px/offset-2 focus rings (resolves audit Minors 7/8) | APPROVED (owner gate 15/10) |
| D18 | Font delivery vs prompt's Google Fonts | Keep self-hosted Astro Fonts API (reaffirms D9) | APPROVED (owner gate 15/10) |
| D19 | "Features (3 cards)" vs spec "No 3-equal-columns" | Asymmetric staggered grid (5/4/3 spans + offset) — spec Don't outranks generic prompt rule; gateway call, ratify at review | APPROVED (owner gate 15/10) |
| D20 | Heavier design direction (15/10) | FULL SIGNAL — navy full-bleed hero + alternating navy/bone sections + compact 1.2rem in-section rhythm + 2px gold rules; the spec Effects line at 100%; SUPERSEDES D16-moderate (texture stays token-only) | APPROVED (owner gate 15/10): D20a keep 4px h-1 rules · D20b ratify partial dark rhythm (spec ◐) · D20c ship home-only, inner pages follow-up |

---

## D1 — Domain routing (REQUIRED category a)

**Context.** Legacy serves `https://nhutduong.com` (astro.config `site`), and `public/robots.txt` + `manifest.webmanifest` hardcode it. The GitHub identity and the legacy repo are `nhutdm/*`; `nhutdm.com` is the owner's other domain. Routing choice changes: `astro.config.mjs` site, canonical URLs, sitemap host, JSON-LD `sameAs` filtering, robots.txt.

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **nhutduong.com sole canonical** (recommended) | Zero-delta from legacy: same URLs keep their SEO equity; nothing to reconfigure at Cloudflare. |
| 2 | nhutduong.com canonical + `nhutdm.com` 301 → nhutduong.com | Rescues any inbound nhutdm.com links; costs a second zone/redirect rule at Cloudflare (gateway-shell action, not worker). |
| 3 | nhutdm.com canonical | Rewrites site/robots/manifest/sitemap; breaks existing nhutduong.com equity unless reverse-301s are added. Highest cost, no visible benefit. |

**Recommendation: Option 1.** Upgrade to Option 2 only if the owner confirms nhutdm.com DNS is theirs AND it has live inbound links.

**Answer (verbatim):** "nhutduong.com sole canonical (Recommended) — zero delta from legacy, keeps SEO equity" — Nhut, 2026-10-14 · **Resolved to:** Option 1 — nhutduong.com sole canonical; site/robots/manifest/sitemap unchanged from legacy · **Status:** APPROVED

## D2 — Cloudflare Worker name (REQUIRED category b)

**Context.** Legacy `wrangler.jsonc` name = `nhut-duong`. The name is internal to Cloudflare (not user-visible), but it determines what `wrangler deploy` replaces.

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **Keep `nhut-duong`** (recommended) | First deploy after approval replaces the live worker in place — no stale duplicate, no manual cleanup. |
| 2 | Rename (e.g. `nhutduong-com`, matching the new repo) | Deploy creates a NEW worker; old `nhut-duong` keeps serving the old site until manually deleted → stale-serving risk during transition; requires owner action at the gateway shell. |

**Recommendation: Option 1** — in-place replacement is the safer rollout; the name being "old" is cosmetic.

**Answer (verbatim):** "Rename to 'nhutduong-com' — new worker created; old one keeps serving the old site until manually deleted" — OVERRIDES the planner recommendation. wrangler.jsonc name := "nhutduong-com". Old-worker retirement after cutover is a GATEWAY-SHELL action (owner-managed), NOT a worker task. — Nhut, 2026-10-14 · **Resolved to:** Option 2 (OWNER OVERRIDE of the recommendation) — wrangler.jsonc `name := "nhutduong-com"`; old worker `nhut-duong` keeps serving the old site until the owner manually deletes it (gateway-shell, owner-managed) · **Status:** APPROVED

## D3 — Route migrate/drop (REQUIRED category c — pages)

**Context.** 9 legacy routes (research/02). Recommendation column is research/06's; DROP consequences listed for the genuine trade-off rows.

| # | Route | Recommendation | If dropped |
| --- | --- | --- | --- |
| R1 | `/` home (Hero + 5 recent posts) | KEEP | Site has no entry — not viable. |
| R2 | `/about` (pages collection catch-all + about.mdx + Person JSON-LD) | KEEP | Loses bio + highest-value personal SEO. |
| R3 | `/404` (Workers `not_found_handling: 404-page` target) | KEEP | Pin requires 404-page handling; a raw CF 404 would serve. |
| R4 | `/blog/` index + pagination (pageSize 10) | KEEP | Blog becomes unreachable as an archive. |
| R5 | `/blog/{slug}/` post detail (reading time, tags, TOC, prev/next, BlogPosting JSON-LD, article OG) | KEEP | The heart of the site. |
| R6 | `/og/{slug}.png` per-post OG images (astro-og-canvas) | KEEP | Posts lose social previews; astro-og-canvas is a required pin anyway. |
| R7 | `/rss.xml` full-content feed | KEEP | Footer + head reference a dead alternate (richness traded in D11, existence kept here). |
| R8 | `/tags/` tag index with counts | KEEP (trivial; powers tag badges) | Tag badges become dead ends unless D3-R9 also drops. |
| R9 | `/tags/{tag}/` per-tag listings (+pagination) | **DECIDE** — KEEP recommended | Badges become static labels; removes 1 route file + `getPostsByTag`; taxonomy is tiny (max 2 posts/tag) so pages are thin but harmless. |

**Recommendation: keep all 9 (accept R9 = KEEP).**
**Answer (verbatim):** "Keep all 9 routes" — every row KEEP, including R8 tag index + R9 per-tag pages — Nhut, 2026-10-14 · **Resolved to:** R1–R9 all KEEP (tag index + per-tag pages included) · **Status:** APPROVED

## D4 — Content migrate/drop (REQUIRED category c — content items)

**Context.** 7 items (research/03). Markdown/MDX files migrate **verbatim** (content is content; the no-wholesale-copy rule applies to `src/` code). Owner may also refresh copy during migration — natural review point, not required.

| # | Item | Recommendation | Note |
| --- | --- | --- | --- |
| C1 | `2025-year-in-review-expansion-mastery` (2025-12-27, Wrap Up, 1,179 w) | KEEP | Newest, longest. |
| C2 | `2024-year-in-review-growth-innovation` (2024-12-29, Wrap Up) | KEEP | Pairs with C1 as a series. |
| C3 | `mastering-meetings-in-software-development` (2024-12-14, Software Development) | KEEP | Evergreen essay; sole post in its tag. |
| C4 | `clear-git-history-for-a-fresh-initial-commit` (2024-10-26, Git) | KEEP | Has 301 history (see D6 `_redirects`). |
| C5 | `how-to-sync-your-fork-with-upstream-changes` (2024-09-24, Git) | KEEP | Has 301 history. |
| C6 | `how-to-zoom-out-iframes-using-css` (2024-09-09, CSS) | KEEP | Sole CSS-tagged item. |
| C7 | `about` MDX page (bio, avatar import, SEO override) | KEEP | Only `pages` item; refresh of copy optional. |

**Recommendation: migrate all 7.**
**Answer (verbatim):** "migrate all 7 items" — C1–C7 all KEEP, verbatim migration — Nhut, 2026-10-14 · **Resolved to:** C1–C7 all KEEP, verbatim migration (copy refresh optional, not required) · **Status:** APPROVED

## D5 — Component complexity: breadcrumbs + TOC

**Context.** Research/06 marked these DECIDE: they are the two "polish" subsystems a minimalist could cut (see 04-components-utils for what each does).

| # | Option (per subsystem) | Consequence |
| --- | --- | --- |
| Breadcrumbs | **Keep** (recommended) — Breadcrumbs.astro + breadcrumb-utils + BreadcrumbList JSON-LD | Depth cue + structured data on a 9-route site; already accessible; modest boilerplate. Drop = remove 2 files + BaseLayout prop. |
| TOC | **Keep full** (recommended) — TOC/TOCList/TOCHeading + toc-utils + `toc-heading` custom element with scroll progress | Flagship reading UX on long posts; most complex JS in the repo (~all of it). Alternatives: static anchor list (loses progress), none (long posts get no nav). |

**Recommendation: keep both as-is.**
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** keep Breadcrumbs + full TOC (both subsystems as recommended) · **Status:** APPROVED

## D6 — Assets: `_redirects` carry-over + avatar format

**Context.** `public/_redirects` holds 12 × 301 (4 renamed post slugs × with/without trailing slash + their OG pngs — research/03). Dropping breaks inbound links to 4 posts. ⚠️ Verification required during APPLY: confirm Cloudflare **Workers static assets** honor `_redirects` with the same semantics Cloudflare Pages does (research/06 flagged this); fallback if not honored = encode the 12 redirects as Workers-level redirect rules (gateway-shell config, owner-managed).

| # | Option | Consequence |
| --- | --- | --- |
| `_redirects` | **Carry the 12 lines** (recommended) | Preserves SEO equity. Drop = 8 old post URLs + 4 OG URLs 404. |
| avatar.png (660 KB) | **Migrate re-encoded to WebP** (recommended, target ≤ 100 KB) | About page weight drops ~85%; visual parity for a portrait. Alternatives: copy as-is (heavy), drop (no portrait). |

**Recommendation: carry `_redirects` (with the Workers-parity check + fallback); re-encode avatar.**
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** carry the 12 `_redirects` lines (verify Workers-parity during APPLY; fallback = Workers-level redirect rules, gateway-shell) · avatar re-encoded to WebP ≤ 100 KB · **Status:** APPROVED

## D7 — Dependency deltas (REQUIRED category d)

**Context.** Full table in 04-dependencies.md. All 15 required pins are satisfiable exactly as written; the only deltas are additions/strategy:

| # | Delta | Recommendation | Why |
| --- | --- | --- | --- |
| 1 | ADD `@astrojs/check ^0.9` (devDep) — absent from the pin list | **Add** | `astro check` is part of mandated ci; it fails without this package. (Legacy AGENTS.md claim it isn't needed is stale.) |
| 2 | Version resolution strategy | **Caret ranges (pin-exact) + committed lockfile** | Fresh install resolves latest-within-pin; lockfile makes builds reproducible. Alternatives: exact pins (slower security updates), or copy legacy lockfile versions (not "from scratch", but zero drift risk). |
| 3 | `tailwind-merge` major (pin silent on version) | **^3.6** (legacy parity) | v3 proven against Tailwind 4.3 + the `cn()` surface. |
| 4 | `wrangler ^4.131` (⊇ pin ^4.13) | Accept | Pin is a floor; ^4.131 is current-line. |

**No removals; no other additions permitted without a NEW owner decision.**
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** ADD `@astrojs/check ^0.9` devDep · caret (pin-exact) ranges + committed lockfile · `tailwind-merge ^3.6` · `wrangler ^4.131` accepted · no removals, no other additions · **Status:** APPROVED

## D8 — Repo hygiene: research/plan dirs, .vscode, docs, LICENSE

| # | Item | Recommendation | Alternative |
| --- | --- | --- | --- |
| 1 | Keep committed `research/` + `plan/` in the shipped repo | **Keep** — audit trail; repo is private; they document why the rebuild looks as it does | Strip before push (cleaner public face; history rewrite needed — messy) |
| 2 | `.vscode/` (extensions/settings/launch) | **Drop** — dev convenience, zero functional impact, trivially re-addable | Keep |
| 3 | README.md / AGENTS.md | **Write fresh**, harvesting legacy AGENTS.md gotchas (fonts network note, Prose max-w-none rationale, formatters) instead of copying | Copy legacy docs verbatim |
| 4 | LICENSE | **Carry** (personal-site license) — confirm text during APPLY | Drop |

**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** keep `research/` + `plan/` committed · drop `.vscode/` · write fresh README/AGENTS (harvest legacy gotchas) · carry LICENSE (confirm text during APPLY) · **Status:** APPROVED

## D9 — Typography: body font + font loading (DESIGN.md spec deviation)

**Context.** DESIGN.md front matter token `body-md` says Source Serif 4, but DESIGN.md's own prose section AND the legacy implementation use **DM Sans** for body/UI — documented as deliberate in legacy AGENTS.md (research/05). Separately, DESIGN.md prose says "via Google Fonts" while the implementation self-hosts via the Astro Fonts API (Fontsource) — build-time download, no runtime third-party calls.

| # | Question | Options |
| --- | --- | --- |
| 1 | Body/UI font | **DM Sans (recommended)** — matches DESIGN.md prose + legacy behavior + Signal's sans-body feel · Source Serif 4 (matches the front-matter token; a real visual change) |
| 2 | Font delivery | **Astro Fonts API, Fontsource, self-hosted (recommended)** — privacy, no runtime CDN, offline-ish builds after warm cache · Google Fonts CDN (matches DESIGN.md prose literally; runtime third-party) |

**Recommendation: DM Sans + Astro Fonts API.** The token spec stays verbatim either way (03-design-tokens.md documents the deviation mapping).
**Answer (verbatim):** "DM Sans, self-hosted via Astro Fonts API (Recommended) — matches legacy + privacy" — Nhut, 2026-10-14 · **Resolved to:** DM Sans body/UI + Astro Fonts API (Fontsource, self-hosted); token spec copied verbatim, deviation documented in 03-design-tokens.md · **Status:** APPROVED

## D10 — Sitemap lastmod approach

**Context.** Legacy derives per-post `lastmod` in astro.config by regex-reading frontmatter from source files at config time (`getBlogLastmod`) — clever but brittle: duplicates schema knowledge as regex (research/01).

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **Keep per-post lastmod, isolated in `src/utils/sitemap-utils.ts`** (recommended) | SEO parity; brittleness contained in one tested helper + documented assumption (`.md`/`.mdx`, `publishDate:`/`updatedDate:` keys). |
| 2 | Drop custom serialize (sitemap without lastmod) | Simpler; sitemap stays valid; loses freshness signal (minor for a personal site). |

**Recommendation: Option 1.**
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** Option 1 — keep per-post lastmod, isolated in `src/utils/sitemap-utils.ts` with documented assumption · **Status:** APPROVED

## D11 — RSS feed richness

**Context.** Legacy RSS renders each post to full HTML via `experimental_AstroContainer` (research/02) — an experimental API; Astro 7.3 rebuild must re-verify it (risk R1).

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **Full-content feed** (recommended, legacy parity) | Differentiator for a dev blog; depends on the experimental API holding in 7.3. |
| 2 | Summary-only feed (excerpt) | Bulletproof; less useful in readers. |

**Recommendation: Option 1, with a pre-planned fallback to Option 2 if the container API breaks at build (apply worker flips ONLY if the fallback is exercised, and records it as a plan amendment in this log).**
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** Option 1 — full-content feed; flip to excerpt ONLY if `experimental_AstroContainer` breaks at build, recorded here as a plan amendment · **Status:** APPROVED

## D12 — Draft mechanism

**Context.** Legacy has no `draft`/`status` field; everything publishes unconditionally (research/03).

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **None — legacy parity** (recommended) | YAGNI: 7 items, all published; owner drafts by simply not committing. |
| 2 | Add `draft: boolean` (filtered in every listing/feed/sitemap) | More filter surface to keep correct across 6+ queries; useful only if publishing cadence rises. |

**Recommendation: Option 1** (add later, as a deliberate feature, if needed).
**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** Option 1 — no draft field (legacy parity); add later as a deliberate feature if needed · **Status:** APPROVED

## D13 — wrangler compatibility_date

| # | Option | Consequence |
| --- | --- | --- |
| 1 | **Keep `2026-08-30`** (recommended, legacy parity) | Behavior-identical serving semantics; zero risk. |
| 2 | Refresh to APPLY-phase date | Chases current semantics; changes behavior only at Cloudflare's edge — not needed for a static-assets site. |

**Answer (verbatim):** "Accept all 8 recommendations" (bulk answer per decision-log protocol; applies each row's recommendation) — Nhut, 2026-10-14 · **Resolved to:** Option 1 — keep `compatibility_date: "2026-08-30"` (legacy parity) · **Status:** APPROVED

## SOURCES

- Research artifacts feeding each decision: `/opt/data/workspace/nhutduong.com/research/01-architecture-config.md` (D2, D7, D13 — wrangler/deps/scripts), `02-routes-pages.md` (D3, D11 — routes, RSS), `03-content-inventory.md` (D4, D12 — items, no-draft finding), `04-components-utils.md` (D5 — breadcrumbs/TOC complexity), `05-design-assets.md` (D6, D9 — redirects, avatar, typography deltas), `06-keep-drop.md` (D3–D6, D8 — recommendations + rationales).
- Mandates: board card t_10df5b6f (required categories a–d), t_f72e3533 (pins, HARD RULES, gate design), t_cb7fe165 (gate protocol this log serves).
- Owner answers (provenance): Nhut via gateway chat, 2026-10-14 — relayed verbatim on board card t_cb7fe165 (comment by profile `default`), recorded by the gate worker run 4.
- Charter: `/opt/data/workspace/nhutduong.com/README.md`.
- Legacy read-only reference: `/opt/data/workspace/nhut-duong/` (DESIGN.md, wrangler.jsonc, public/_redirects).
