# 01 — Plan at a Glance

L1 summary of the from-scratch rebuild plan. Facts trace to research artifacts (SOURCES in 00-index.md).

## What gets built

A fresh Astro 7 static site for nhutduong.com — zero client-side framework JS, Tailwind 4 CSS-first, Signal design tokens, MD/MDX content collections, deployed as Cloudflare Workers static assets. Scope as approved at the owner gate (2026-10-14; D2 overridden by owner — see decision-log.md): **9 routes, 7 migrated content items, ~33 fresh `src/` files, 9 public assets**, plus fresh docs. Everything is written new in `/opt/data/workspace/nhutduong.com`; the legacy clone at `/opt/data/workspace/nhut-duong` is a read-only behavioral reference — components are rebuilt to behavior parity, not copied wholesale.

## Architecture bets (and where they can be wrong)

1. **Tokens-first build order.** DESIGN.md is copied verbatim; `global.css` (token → CSS vars → `@theme inline`) lands before any component, so every later file consumes one styling contract. Wrong-if: D9 owner flips body font → one-line token swap, no structural rework.
2. **Content model parity.** Same two collections and fields as legacy (proven end-to-end: schema → sitemap → RSS → UI). Wrong-if: D12 owner adds draft support → filter added to 6 query sites (contained, known list in 02).
3. **Behavior parity via readable spec.** The APPLY worker reads legacy files for exact behavior (props, edge cases) but writes new code. Wrong-if: parity drift on invisible details (canonical normalization, UTC dates, aria) — mitigated by dist-assertion checks in 05-tasks.
4. **New-worker deploy (D2 OWNER OVERRIDE: rename to `nhutduong-com`).** First deploy creates a NEW worker; the old `nhut-duong` keeps serving the old site until the owner manually deletes it (gateway-shell, owner-managed — not a worker task). Rollback = simply do not cut over; the old worker is untouched.

## Sequencing (structure before schedule)

```
T1 scaffold ──► T2 tokens+fonts ──► T3 content model + utils ──► T4 layout + chrome
                                                                    │
                              ┌─────────────────────────────────────┤
                              ▼                                     ▼
                    T6 routes (home/about/404/tags)          T5 primitives (Button/Badge/…)
                              │                                     │
                              └───────────► T7 post detail (CRITICAL PATH) ──► T8 content migration
                                                                            │
                                     T9 public assets ◄─────────────────────┤
                                     T10 OG endpoint ──► T11 RSS ──► T12 sitemap + ci + docs + FINAL VERIFY
```

**Critical path:** T1 → T2 → T3 → T4 → T5 → T7 (post detail is the richest consumer of every interface) → T8 → T10 → T11 → T12. Any slip there slips the phase; T6/T9 ride parallel slack. No calendar dates are attached (single-worker phases); the buffer is encoded as fallback plans (below), not padded tasks.

## Risk register (scored, mitigated, with contingency)

| ID | Risk | P | I | Mitigation | Contingency if mitigation fails |
| --- | --- | --- | --- | --- | --- |
| R1 | `experimental_AstroContainer` API drift breaks full-content RSS on Astro 7.3 | M | M | Re-verify early in T11 against current Astro docs; container render is isolated to `rss.xml.js` | Flip to summary-only feed per D11 fallback; record amendment in decision log |
| R2 | Cloudflare Workers static assets do NOT honor `_redirects` like Pages | M | H | T9 verifies semantics against current CF docs during apply; gate owner alerted | Encode 12 redirects as Workers-level redirect rules (owner/gateway-shell config, documented in handoff) |
| R3 | Font download fails on cold-cache build (Fontsource network fetch) | L | M | Astro Fonts API caches; CI note in AGENTS.md | Retry; worst case temporarily pin/serve system font stack — build must not silently swap fonts |
| R4 | Fresh-install version drift within carets (wrangler/astro minors) | M | L-M | Lockfile committed at T1; `astro check` + build gate every task | Roll back lockfile to legacy-proven versions (D7 alternative 3) |
| R5 | Theme flash (FOUC) regression when rewriting the blocking theme script | L | M | T4 ports the blocking-script pattern verbatim-in-behavior; manual dark-load check in T4 steps | Ship without localStorage persistence before shipping a flash |
| R6 | Sitemap `lastmod` regex silently wrong on frontmatter shape drift | M | L | T12 helper isolated in `sitemap-utils.ts` with a dist assertion on one known post date | Drop custom serialize (D10 option 2) |
| R7 | Avatar stays 660 KB (D6 re-encode skipped or tooling absent) | H | L | T8 encodes to WebP ≤100 KB with size assertion | Ship PNG (site still works); flag in FINAL VERIFY handoff |
| R8 | Owner answers arrive partially (some D-rows blank) | M | H | Gate presents the compact summary board first; unanswered rows block ONLY the tasks that consume them | APPLY worker treats blank rows as blockers on their tasks, never guesses |

**Rollback plan.** Repo: every task is one commit; `git revert` restores any step. Deploy: workers never deploy; the gateway shell deploys the new worker `nhutduong-com` after owner review — the old worker `nhut-duong` keeps serving the old site until the owner deletes it, so rollback = do not cut over (or delete the new worker). No data migrations exist (static content in git).

## Open decisions

Gate CLEARED 2026-10-14: all 13 decisions APPROVED in decision-log.md (D1 domain, D3 routes ×9 KEEP, D4 content ×7 KEEP, D5–D8 + D10–D13 per recommendation; **D2 owner override: worker renamed to `nhutduong-com`**, old-worker retirement is owner-managed gateway-shell). **Phase 4 (APPLY, t_5862e455) is released.**

## Plan self-review (writing-plans checklist)

- **Spec coverage:** all five APPROACH items of t_10df5b6f mapped — site structure+page list (02), content model (02), token adoption (03), dependency table (04), build/verify commands (02 §config + 05 header); acceptance criteria addressed by decision-log structure (OWNER DECISION REQUIRED labels, options+recommendation, pin-exact table with flagged deltas).
- **Step scan:** every step in 05 carries a runnable command or exact file contract; no placeholder lines.
- **Type consistency:** util/component names match research/04 (the behavior spec) throughout.
- **Review focus:** five failure modes pinned to owning tasks (05 header).
- **Proportion:** plan references research artifacts instead of transcribing legacy code.
- **SOUL-over-skill conflicts (noted, per Output Contract):** plan lives at `plan/00-index.md` (pyramid), not `docs/superpowers/plans/`; the stack has no unit-test runner, so TDD-style steps are replaced by biome/astro-check/build + dist-assertion verification steps — the verify-before-commit discipline is preserved.

## SOURCES

- Research: `/opt/data/workspace/nhutduong.com/research/01-architecture-config.md` (stack, pins, scripts), `02-routes-pages.md` (routes), `03-content-inventory.md` (content), `04-components-utils.md` (components), `05-design-assets.md` (tokens/assets), `06-keep-drop.md` (keep/drop).
- Charter: `/opt/data/workspace/nhutduong.com/README.md` (commit-only, escalate trade-offs).
- Board: t_f72e3533 (owner directive), t_10df5b6f (this task's mandate), t_cb7fe165 (gate).
