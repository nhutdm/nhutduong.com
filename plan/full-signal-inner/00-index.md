# Full Signal inner pages (D20c) — implementation pyramid · t_356d544c · 2026-10-15

D20 follow-up (owner decision D20c): the band treatment extended from the home
page to every inner page. Existing tokens and utilities only — zero CSS changes;
`global.css` is untouched (the `.band`/`.bleed`/pocket mechanics from c4da775
carry everything).

## Result (what changed)

| # | Scope item | Delivered |
|---|---|---|
| 1 | Navy masthead band on every inner page | `<header class="band bleed py-[clamp(4rem,8vw,8rem)]">` + re-applied container on blog index, post detail, tags index, per-tag, about — each page enters through navy, then calms down (N→B entry rhythm) |
| 2 | Reading surfaces stay calm | Post body, TOC, post-nav, about prose, tag lists: all on the canvas below the band; article `lg:max-w-2xl` (672px) and `.prose` 16px/1.6 untouched — prose-measure law respected, so the card's "BLOCK if a better reading argues" clause never triggers |
| 3 | 4px gold rules (D20a) | `h-1 w-8` above every masthead H1 + above both tags-page H2s; blog's old `h-0.5` rule upgraded |
| 4 | Compact 1.2rem rhythm | blog + per-tag post lists `gap-10` → `gap-[1.2rem]` (the exact home Recent-Posts anatomy, `data-animate` included); tags grids already ≤ compact scale — left alone |
| 5 | Serif display weight | tags H2s `font-medium` → `font-bold` — the follow-up ledger item 6 flagged |
| 6 | Dark rhythm partial (D20b) | probe-verified: masthead band == navy canvas in dark (merged), navy-alt card layering below; light mode carries the full N→B read |

## Evidence layers

- `01-implementation.md` — per-page diffs, the masthead-band ruling, and why no
  reading surface was banded (the card's conditional BLOCK resolved by design)
- `02-verification.md` — CI, built-CSS/HTML greps, impeccable detector diff
  against a stash-built pre-change baseline (0 contrast findings, advisory
  distribution byte-identical), browser probes 1280/375 × light/dark,
  reduced-motion gate, independent vision pass
- `shots/` — 14 settled full-page screenshots (5 pages × 1280 × 2 modes,
  blog + post × 375 × 2 modes)

## Flags for the owner gate

1. **Mastheads are static** (no `data-animate` in band headers) — maps to
  home's static section headers; only list items animate, like home's Recent
  Posts. Ratify or ask for the hero-style staggered rise on mastheads.
2. **Breadcrumbs sit above the band** on calm canvas (BaseLayout renders them
  page-agnostically above the slot) — same "header strip before full-bleed"
  family as the P3 note on home's hero; left as-is to avoid a layout-contract
  change.
3. **About prose spans the full container** (no `max-w` on its Prose wrapper) —
  pre-existing, content-governed; measure untouched by this pass. Vision pass
  also noted the pre-existing tilted-avatar corner near "strive" — predates
  D20c, out of scope.

## Reproduce

```sh
npm run ci                                  # biome + astro check + build → exit 0
/opt/data/plugins/impeccable/skills/impeccable/scripts/impeccable detect dist
# probes: serve dist/ and see 02-verification.md command list
```
