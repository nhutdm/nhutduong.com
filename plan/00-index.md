# From-Scratch Rebuild Plan — nhutdm/nhutduong.com

Task: t_10df5b6f (DELTA phase of the nhutduong.com rebuild pipeline)
Date: 2026-10-14 · Author: implementation-planner · Status: **APPROVED — OWNER GATE CLEARED 2026-10-14 (t_cb7fe165): 13/13 decisions APPROVED, D2 owner override**
Pipeline position: RESEARCH (t_32a53ae9, done) → **DELTA (this plan)** → OWNER GATE (t_cb7fe165, **cleared 2026-10-14**) → APPLY (t_5862e455) → FINAL VERIFY (t_63c88057) → root (t_f72e3533).

## Read this first

The plan designs a fresh Astro 7 + Tailwind 4 + Cloudflare Workers rebuild of the personal site, informed by — but not copying — the legacy codebase at `/opt/data/workspace/nhut-duong` (read-only). The OWNER GATE cleared 2026-10-14: **all 13 decisions are APPROVED in [decision-log.md](decision-log.md)** — covering the 4 mandated categories (domain routing, worker name, per-item migrate/drop, dependency deltas) plus every trade-off surfaced by research. One owner override: D2, worker renamed to `nhutduong-com`.

Owner reading order: **01-summary (5 min) → decision-log.md (approve/answer D1–D13) → done.** The gate worker records answers verbatim into the decision log; the APPLY worker executes 05-tasks.md against the approved answers.

## Artifact map

| File | Layer | Contents |
| --- | --- | --- |
| [01-summary.md](01-summary.md) | L1 | Plan at a glance: architecture bets, sequencing + critical path, risk register (scored, mitigated), rollback, decision summary |
| [02-architecture.md](02-architecture.md) | L2 | Target repo tree, full page/route list, content model (collections, Zod schemas, frontmatter contract), config file specs |
| [03-design-tokens.md](03-design-tokens.md) | L2 | DESIGN.md Signal token adoption plan — token→CSS→Tailwind pipeline, dark mode, Shiki, OG images, WCAG derivations |
| [04-dependencies.md](04-dependencies.md) | L2 | Dependency table: every required pin vs the new package.json spec, with deltas flagged as decisions |
| [05-tasks.md](05-tasks.md) | L2 | Implementation plan for the APPLY phase: 12 bite-sized tasks, exact files, interfaces, verify steps, commits |
| [decision-log.md](decision-log.md) | L1 | **Living document.** D1–D13 owner decisions: options, recommendation, status. The OWNER GATE fills this in verbatim |

## Verification of this plan

Self-review run against the writing-plans checklist (spec coverage / step scan / type consistency / review-focus mapping / proportion) — details at the foot of 01-summary.md. Cross-checked against research artifacts 01–06; every factual claim about the legacy site traces to a research file cited in SOURCES.

## SOURCES

- `/opt/data/workspace/nhutduong.com/research/00-index.md` — research headline findings + artifact map (t_32a53ae9)
- `/opt/data/workspace/nhutduong.com/research/01-architecture-config.md` — stack, pin-vs-package.json table, astro/wrangler/biome/tsconfig detail
- `/opt/data/workspace/nhutduong.com/research/02-routes-pages.md` — all 9 legacy routes, URL patterns, quirks
- `/opt/data/workspace/nhutduong.com/research/03-content-inventory.md` — collection schemas, 7 content items, tag index, slug-rename history
- `/opt/data/workspace/nhutduong.com/research/04-components-utils.md` — every component/util/layout/type/data module, one-line purposes
- `/opt/data/workspace/nhutduong.com/research/05-design-assets.md` — DESIGN.md Signal token summary, global.css implementation, fonts, assets
- `/opt/data/workspace/nhutduong.com/research/06-keep-drop.md` — keep/drop candidate list with per-item rationale (input to D3–D6)
- `/opt/data/workspace/nhutduong.com/research/data/content-inventory.json` — machine-readable frontmatter extraction
- `/opt/data/workspace/nhutduong.com/README.md` — rebuild charter (stack fixed, commit-only, escalate trade-offs)
- `/opt/data/workspace/nhut-duong/` — legacy repo, READ-ONLY behavioral reference (head `4fcd26a`, shallow clone)
- `/opt/data/workspace/nhut-duong/DESIGN.md` — Signal token spec, styling source of truth (verbatim carrier, see 03)
- Kanban board `nhutduong-com` (`~/.hermes/kanban.db`): cards t_f72e3533 (owner directive + pins), t_32a53ae9 (research handoff)
