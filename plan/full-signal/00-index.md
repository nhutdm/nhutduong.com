# Full Signal (D20) — implementation pyramid · t_4d24ffa0 · 2026-10-15

Home page at the spec's Effects line at 100% (owner decision D20, supersedes
D16-moderate). Existing tokens only — no new colors, fonts, radii, shadows.

## Result (what changed on `/`)

| # | Scope item | Delivered |
|---|---|---|
| 1 | Navy full-bleed hero | `.band` + `.bleed` utilities; hero maps onto dark-canvas token values (navy ground, bone text, gold punctuation) in light mode; dark mode layers navy vs navy-alt |
| 2 | Alternating bands | Hero **navy** → What-I-do **bone** → Recent Posts **navy** → CTA **bone** (flips vs neighbor); rationale in `01-implementation.md` |
| 3 | Compact rhythm | intra-section gaps → `gap-[1.2rem]`; inter-section rhythm unchanged, bands carry `py-[clamp(4rem,8vw,8rem)]` |
| 4 | Bone cards on navy bands | `.card` flips per mode; **navy-on-bone-card = 12.63:1 computed** (`03-contrast-math.md`) |
| 5 | Gold section rules | `h-1` (4px) — see the 2px/h-1 discrepancy note below |
| 6 | Serif display conviction | hero already at spec (700/tracking-tight, clamp ceiling 4rem untouched); section H2s 500 → 700 |

## Evidence layers

- `01-implementation.md` — every file changed, the token mechanics, and the two
  decisions the owner gate should ratify (band order; the 2px-vs-h-1 reading)
- `02-verification.md` — CI, built-CSS greps, impeccable detector diff,
  browser probes (1280 + 375, light + dark), reduced-motion gating
- `03-contrast-math.md` — every WCAG pair computed (`t4d24ffa0-contrast.py`)

## Flags for the owner gate (t_49097213)

1. **"2px (h-1)" is self-inconsistent** — Tailwind `h-1` = 4px, and the rules
   were already 2px (`h-0.5`). Implemented the card's utility (4px); revert is
   one line if the owner means literal 2px.
2. **Dark-mode rhythm is deliberately partial** — bands merge with the navy
   canvas; layering = navy-alt cards + hero art (spec "Light/Dark: ✓ Full / ◐
   Partial"). The alternation reads fully in light mode.
3. **Blog/tags pages still use the D16 look** (500-weight H2s, 2px rules, no
   bands) — home-only scope; needs a follow-up pass if Full Signal is approved.

## Reproduce

```sh
npm run ci                                  # biome + astro check + build → exit 0
node -e "…"                                 # see 02-verification.md grep list
python3 /opt/data/profiles/frontend-engineer/cache/scratch/t4d24ffa0-contrast.py
/opt/data/plugins/impeccable/skills/impeccable/scripts/impeccable detect dist
```
