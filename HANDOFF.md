# HANDOFF — nhutduong.com rebuild: push & deploy list

## Release 2 addendum (2026-10-16 — supersedes the numbers below)

The design release shipped as a **single squashed commit** on `main` (everything after `52fe280`). Current state:

- 17 pages (Privacy + Terms added; **Now and Uses deferred** — owner decision: drafts parked until real content; restore the MDX from the release commit, fill, and re-add the nav entry in one change).
- Single light rendition (dark mode + toggle + icons removed, owner decision); socials are mono-caps text links.
- All OpenGraph cards rebuilt at build time (satori + @resvg/resvg-js, per-post + default; `astro-og-canvas` removed; satori pinned 0.10.14 from registry.npmjs.org — the local mirror serves a broken 0.62.0; fonts vendored at `src/assets/og-fonts/`).
- TOC: progress bar removed; gold active state via unlayered `global.css` rules (arbitrary-variant utilities lose inside `@layer utilities`); mobile close-then-scroll.
- Footer: two-column row from `lg:` (1024px); socials baseline-matched (`lg:-mb-1.5`).
- Deps delta vs §3 pins: `astro-og-canvas` REMOVED; added `satori@0.10.14`, `@resvg/resvg-js@2.6.2` (dev).
- Still owner-side: attach `nhutduong.com` to worker `nhutduong-com` and retire `nhut-duong` (the pending cutover — it also gates the OG meta URLs, which point at nhutduong.com).

The sections below are the original release-1 verification record (15 pages) and remain for audit history.

---

Task: t_63c88057 (FINAL VERIFY) · Date: 2026-10-15 · Verifier: reviewer profile, independent re-run of every gate.

**Verdict: ALL GATES GREEN. The repo is ready to ship exactly as it stands on `main`.**

This document is the exact list of what must be pushed and deployed, per the owner-approved
decision log (`plan/decision-log.md`, 13/13 APPROVED, D2 owner override). Workers never push or
deploy — the gateway shell ships after owner review of this summary.

## 1. What to push

| Item | Value |
| --- | --- |
| Repo | `/opt/data/workspace/nhutduong.com` |
| Branch | `main` (single branch, no merges) |
| Ship SHA | `HEAD` of `main` **after this hand-off commit** — confirm with `git rev-parse HEAD`. Last implementation commit before it: `318ff50`. |
| Command | `git push origin main` |
| Remote | `origin` = `https://github.com/nhutdm/nhutduong.com.git` |
| Pre-push state | `origin/main` = seed `ea8dc1a`; local ahead by 17 (16 implementation + this doc). Nothing has been pushed by any worker — verified. |

Expected effect: GitHub `nhutdm/nhutduong.com` `main` goes from seed `ea8dc1a` to the ship SHA.
History is linear and clean (conventional `feat:`/`chore:`/`plan:`/`gate:`/`research:`/`docs:`
messages; no merges, no fixups, no debug/junk commits; working tree clean; 94 tracked files).

## 2. What to deploy (owner / gateway shell — per D2 owner override)

Run from the repo root after push:

```
npm ci            # reproducible install (lockfile committed, v3)
npm run ci        # re-gate: biome ci && astro check && astro build
npx wrangler deploy
```

| Item | Value | Source |
| --- | --- | --- |
| Worker name | `nhutduong-com` | D2 owner override (NOT the legacy `nhut-duong`) |
| Assets | `./dist` (static, 15 pages) | wrangler.jsonc |
| not_found_handling | `404-page` (dist/404.html present, noindex) | wrangler.jsonc |
| compatibility_date | `2026-08-30` | D13 (legacy parity) |
| `_redirects` | 12 × 301 carried in dist; Workers static assets honor it (verified against live Cloudflare docs during APPLY) | D6 |

Cutover sequence (D2 Option 2 semantics — new worker is created, old one keeps serving):

1. Push (§1), then `npx wrangler deploy` — creates/replaces worker **`nhutduong-com`**.
2. Attach the custom domain **nhutduong.com** to `nhutduong-com` (Cloudflare dashboard or
   `wrangler`) — until this step the old worker still receives traffic.
3. Verify: `/`, a blog post, `/rss.xml` (full-content, 6 items), an old slug 301 (e.g.
   `/blog/how-to-synchronize-your-fork-repository-with-upstream-changes`), and a bogus URL →
   branded 404.
4. Retire the old worker `nhut-duong` (delete) — owner-managed gateway-shell action, per D2.

## 3. Verification evidence (independently re-run 2026-10-15, this task)

- `npm run ci` → exit 0. biome ci: 51 files, 0 errors. astro check: 47 files, 0 errors /
  0 warnings / 0 hints. astro build: 15 pages. (No Node-26 segfault in this run; the one-time
  flake noted by APPLY did not reproduce.)
- Dependency pins: all 14 required pins satisfied in `package.json` AND in the resolved
  lockfile (astro 7.3.8, @astrojs/mdx 8.0.3, @astrojs/rss 4.0.19, @astrojs/sitemap 3.7.4,
  astro-og-canvas 0.13.2, tailwindcss 4.3.3, @tailwindcss/vite 4.3.3,
  @tailwindcss/typography 0.5.20, clsx 2.1.1, tailwind-merge 3.7.0, typescript 6.0.3,
  @biomejs/biome 2.5.15, schema-dts 2.1.0, wrangler 4.151.0) + `@astrojs/check` 0.9.10.
  engines: node `>=22.12.0`. Only approved deviations: wrangler `^4.131.1` ⊇ `^4.13` floor
  (D7-4), `@astrojs/check` added (D7-1), `tailwind-merge ^3.6` (D7-3). No others.
- wrangler.jsonc: `name: nhutduong-com`, `assets.directory: ./dist`,
  `not_found_handling: 404-page`, `compatibility_date: 2026-08-30`.
- Decision log: 13/13 APPROVED; implementation spot-verified against every decision —
  D1 site/canonical/robots = nhutduong.com; D3 all 9 routes present in dist (incl. tag pages);
  D4 all 7 content items (6 posts + about); D5 Breadcrumbs + full TOC components present;
  D6 12-line `_redirects` in public/ and dist/, avatar as ~15 KB WebP; D8 research/ + plan/
  committed, no `.vscode`, fresh README/AGENTS, LICENSE carried; D9 DM Sans via Astro Fonts API
  (Fontsource, self-hosted); D10 per-post sitemap lastmod present in dist/sitemap-0.xml;
  D11 RSS full-content (6 `<item>`, `content:encoded` on all); D12 no draft field; D13 compat date.
- Git: linear history, clean messages, tree clean, `origin/main` = seed `ea8dc1a`
  (0 behind / 16 ahead at audit time) — no worker ever pushed.

## 4. Deferred Minor findings (post-launch backlog, none blocking)

From the APPLY-phase fresh-context review (ledger: kanban t_5862e455 progress.md):

1. `toc-utils` throws a raw TypeError instead of an orphan-message when a post's first body
   heading is h3+ (build fails either way).
2. `BaseHead` og:image:width/height hardcoded 1200/630 (correct for all current images).
3. 404 page emits a canonical (noindex present; legacy parity).
4. Footer copyright year frozen at build time.
5. Gold `#c8a870` on light bone is 1.92:1 contrast — never convey state by gold alone on the
   light canvas (palette is DESIGN.md-mandated; current UI never does).
6. `npx astro check` segfaulted once in this environment (Node 26); passed on re-run both times.
7. A purely-numeric post id would collide with the blog pagination route (none exists).
8. `ThemeToggle.syncThemeColor` writes one color into both media-scoped metas after first
   toggle (functionally correct; media attrs become decorative).

## 5. Owner follow-ups

- Approve this summary, then the gateway shell executes §1–§2.
- Custom-domain attach (step 2) and old-worker `nhut-duong` deletion (step 4) are owner-side.
- Optional later: address deferred Minors in §4 at leisure; re-run `npm run ci` after any change.
