# 02 — Verification

All commands run from the repo root on 2026-10-15 (t_356d544c).

## npm run ci

`biome ci && astro check && astro build` → **exit 0**, 15 pages built.
Run twice (after edits; final pre-commit) — green both times. `npm run check`
normalized formatting in 1 file (post-detail re-indent) before the first CI.

## Built-CSS greps (dist/_astro/*.css) — all ✓ 1

`.band{--card:#f0ece3}` · `.dark{--card:var(--navy-alt)}` ·
`html:not(.dark) .band .card` pocket · `margin-inline:calc(50% - 50vw)` ·
`overflow-x:clip` · `gap:1.2rem` · `clamp(4rem,8vw,8rem)`

## Built-HTML assertions

- Exactly **1** `band bleed` header in each of `blog/index.html`,
  `about/index.html`, `tags/index.html`, `tags/git/index.html`, and the post
  page — none before, none duplicated.
- `h-1 w-8` rules: 1 per page masthead; **3** on tags index (masthead + both
  H2s). Blog's old `h-0.5` rule gone.
- tags H2s: `font-serif text-2xl font-bold` ×2 (a 3rd grep hit is the
  pre-existing Header logo h2, unrelated).
- data-animate occurrence-level audit (occurrence grep, not line grep):
  blog = ul group + 6 li `data-animate="true"` + BaseLayout script reference;
  per-tag = same shape with 1 li. Identical anatomy to home's Recent Posts.

## Impeccable detector — 0 contrast findings, zero new advisories

`impeccable detect dist`: **contrast findings = 0** (the task's hard gate).

To prove "no new advisories" (not just equal totals), the pre-change baseline
was rebuilt via `git stash` of the five pages and re-detected:

| class | baseline | after |
|---|---|---|
| design-system-font | 90 | 90 |
| design-system-color | 60 | 60 |
| cramped-padding | 35 | 35 |
| design-system-font-size | 18 | 18 |
| cream-palette | 15 | 15 |
| marketing-buzzword | 4 | 4 |
| em-dash-overuse | 1 | 1 |
| border-accent-on-rounded | 1 | 1 |

**Distribution byte-identical** — every line is a pre-existing documented
detector-limitation class (front-matter enumeration gaps; Tailwind-utility
resolution; the pre-existing blog TOC `border-b-2`). No new pairs: all band
text pairs were already computed in `plan/full-signal/03-contrast-math.md`
(H1 bone-on-navy 10.91:1, meta fg/70 6.08:1, badge navy-on-bone 10.91:1).

## Browser probes (Chromium, python http.server on dist/)

**1280×900 light** (blog, post, tags, tag, about + `/` regression):
masthead band `rgb(28,38,68)` width 1280, left −7.5 vs client 1265 — exact
bleed math; H1 `rgb(226,220,208)` weight 700; rule 4px × 32px gold
`rgb(200,168,112)`; list gap 19.2px (=1.2rem); cards paper `rgb(240,236,227)`
+ navy text on canvas; post Badge = bone bg + navy text on band; article
max-width 672px; `.prose` 16px / 25.6px (1rem × 1.6 locked);
`scrollWidth == clientWidth == 1265` on every page. Home unchanged.

**1280×900 dark**: band bg == body bg `rgb(28,38,68)` → `merged: true` on
all five pages (D20b partial rhythm ratified shape); H1 bone; meta fg/70;
list cards `rgb(35,47,85)` navy-alt layering; badge bone/navy; no h-scroll.

**375×812** (blog, post, about; both modes): band spans exactly 0..375;
content inset 16px (`px-4`); `scrollWidth == clientWidth == 375`.
(An earlier `innerInset: 0` reading was a probe bug — it measured the
container's padding box; the rule's rect gives the true content edge: 16px
@375, 32px @1280, same as home.)

**Motion (D15 intact)**: blog list — `rise` 0.42s, stagger via `--i` under
no-preference; under `prefers-reduced-motion: reduce` → `animation-name:
none`, duration ~0, every `[data-animate]` `opacity: 1` (never hidden).

**Entry settling**: all screenshots assert `opacity 1` across every
`[data-animate]` after settle (0.7s) — D20's hidden-tab freeze caveat
respected (tab brought to front).

## Independent vision pass (zai analyzer, 3 settled shots)

- **blog-1280-light**: "cream header → full-width dark navy band (edge to
  edge) → cream content"; amber rule + cream serif "Blog"; uniform paper
  cards; "no overlapping text, no unreadable text, no clipping".
- **post-1280-light**: full-bleed navy title band, cream serif title, muted
  meta legible, "Wrap Up" chip light-bg/dark-text (the token remap), body on
  calm cream with right-rail TOC, "clean horizontal edge" between band and
  body, no overlaps.
- **about-1280-light**: navy band with rule + "About", calm body, readable
  throughout; one pre-existing note — the tilted avatar's corner sits close
  to the text ("strive") — **predates D20c** (float/rotation untouched here),
  recorded for a future polish pass, out of scope.

## Screenshots (plan/full-signal-inner/shots/)

`blog-1280-{light,dark}.png`, `post-1280-{light,dark}.png`,
`tags-1280-{light,dark}.png`, `tag-1280-{light,dark}.png`,
`about-1280-{light,dark}.png`, `blog-375-{light,dark}.png`,
`post-375-{light,dark}.png` — full-page, animations settled, theme set
per shot.
