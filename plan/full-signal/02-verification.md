# 02 — Verification

All commands run from the repo root on 2026-10-15; full outputs in
`/opt/data/profiles/frontend-engineer/cache/scratch/t4d24ffa0-*`.

## npm run ci

`biome ci && astro check && astro build` → **exit 0**, 15 pages built.
(Run three times during the pass — after initial edit, after the card-color
fix, after the html-clip fix — green each time.)

## Built-CSS greps (dist/_astro/*.css)

| Assertion | Result |
|---|---|
| `.band{--card:#f0ece3}` (light flip) | ✓ 1 |
| `.dark{--card:var(--navy-alt)}` (dark flip intact) | ✓ 1 |
| `html:not(.dark) .band .card` pocket remap | ✓ 1 |
| shared `.dark,.band` palette block | ✓ 1 |
| `margin-inline:calc(50% - 50vw)` + `width:100vw` (bleed) | ✓ 1 |
| `overflow-x:clip` (html+body) | ✓ |
| `gap:1.2rem` | ✓ |
| `clamp(4rem,8vw,8rem)` (band py) + hero clamp | ✓ both |
| `rise` keyframes + `[data-animate]` ONLY inside `prefers-reduced-motion:no-preference` | ✓ (per-block enumeration; reduce block contains neither) |
| `dist/index.html`: `h-1 w-8` ×3 rules, 2 `section.band`, `data-animate-group` | ✓ |
| `--spacing:.25rem` → `.h-1` = 4px | ✓ |

## Impeccable detector (`impeccable detect dist`)

- **Contrast findings: 0** (baseline run had 1 — the pre-fix 3.9:1 caption,
  resolved by 580f1fe before this pass). Card requirement "ZERO new contrast
  findings": met.
- Advisory notes 79 vs baseline 86. New advisory lines (9) are all in the
  two documented detector-limitation classes: `cramped-padding` on
  `section.band`/`li.card` (detector cannot resolve Tailwind utility paddings
  in dist HTML — ledger precedent; real insets proven by probe: card 24px,
  container 32px/16px) and `design-system-color` for derived tokens
  (front-matter enumeration gap — ledger precedent).
- Nothing in the craft-floor ban classes: no gradient text, no glass, no
  hard-offset shadows, no colored side-borders (the 1 pre-existing
  `border-accent-on-rounded` note is the unchanged blog TOC `border-b-2`).

## WCAG contrast — computed, not eyeballed

See `03-contrast-math.md`. Required pair **navy text on bone(-paper) card =
12.63:1** ✓ (exact match to the card's figure, which pins "bone card" to the
site's established light `--card` surface #f0ece3; navy on raw bone #e2dcd0
is 10.91:1 — also AA, but not the card's number). All band pairs ≥ 4.5:1.
Sub-4.5 entries are pre-existing, text-identified UI (ghost-button borders at
40% alpha — identical class on the light canvas at 1.74:1 baseline) and the
3.40:1 light focus ring (≥3:1 UI requirement, ledger token).

## Browser probes (Chromium headless, python http.server on dist/)

**1280×900, light**: hero band `rgb(28,38,68)` + bone text; posts band navy;
What-I-do/CTA transparent (bone-paper canvas) → N/B/N/B rhythm; hero band
py 102.4px (= 8vw clamp); What-I-do grid = 12 tracks (asymmetric 5/4/3);
hero split grid 616/536px; card padding 24px; inner inset 32px; card text
navy on paper, title navy, date navy@70; rules 4px×32px ×3; H2 weight 700;
body bg paper; `overflow-x: clip`.

**1280×900, dark**: bands navy (= canvas, merged); post + feature cards
`rgb(35,47,85)` (navy-alt) with bone text — the navy-vs-navy-alt layering.

**375×812 (mobile)**: hero band spans exactly 0..375; feature grid collapses
to one 343px column; inner inset 16px (px-4); card padding 24px.

**No horizontal scroll**: 375 — `scrollWidth == clientWidth == 375`. 1280
(classic scrollbar in headless) — `scrollWidth == clientWidth == 1265` and a
forced `window.scrollTo(200,0)` leaves **scrollX = 0** (pan locked; first
probe with body-only clip panned 8px → html rule added, re-verified).

**Motion (D15 intact on bands)**: `prefers-reduced-motion: reduce` →
`animation-name: none`, duration ~0, `[data-animate]` opacity **1** (never
hidden); `no-preference` → `rise 0.42s` with stagger delays.

**Headless caveat, not a site bug**: an occluded (hidden) tab freezes CSS
animations at opacity 0 (`visibilityState: hidden`); first screenshot round
caught cards mid-rise — re-captured with the tab brought to front and an
all-settled assertion (opacity 1 across every `[data-animate]`).

## Screenshots (attached to card t_4d24ffa0)

`home-1280-light.png`, `home-1280-dark.png`, `home-375-light.png`,
`home-375-dark.png` — full-page, animations settled, theme toggled per shot.
An independent vision pass on the settled 1280-light shot confirms the
N/B/N/B banding, paper post cards with navy titles, fully readable.
