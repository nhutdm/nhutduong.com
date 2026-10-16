# 01 — Implementation

Files changed (markup only — `src/styles/global.css` NOT touched, no component
changed):

- `src/pages/blog/[...page].astro`
- `src/pages/blog/[id].astro`
- `src/pages/tags/index.astro`
- `src/pages/tags/[id]/[...page].astro`
- `src/pages/[...id].astro` (about)

## The pattern

Every inner page now opens with a full-bleed navy masthead — the SAME
`.band` local token-remap from c4da775 — then returns to the calm canvas:

```astro
<header class="band bleed py-[clamp(4rem,8vw,8rem)]">
  <div class="mx-auto w-full max-w-7xl px-4 md:px-8">
    <div class="bg-gold mb-2 h-1 w-8" aria-hidden="true" />
    <h1 class="font-serif text-[2.25rem] font-bold">…</h1>
    <!-- optional meta row / description -->
  </div>
</header>
<section class="mt-10"> …calm content… </section>
```

- `.band` remaps the palette onto dark-canvas values (navy ground, bone text,
  gold punctuation) in light mode; in dark it equals the root values and the
  band merges with the canvas (D20b partial rhythm — deliberate).
- `.bleed` + re-applied container: identical mechanics to home (probe: band
  width 1280 @1280 with client 1265 = exact `calc(50% - 50vw)` math; content
  inset 32px @1280 / 16px @375 — same as home).
- `mt-10` after the band = home's established band→section canvas gap.

### Ruling: masthead-only banding (resolves the card's conditional BLOCK)

The card says reading surfaces stay calm and to BLOCK if banding the article
argues better. Nothing argued better: the masthead carries the Full-Signal
entry (navy, gold rule, bone serif) exactly like home's hero, while the
article column keeps the calm, high-measure surface the spec's reading
requirements demand. BANDING THE POST BODY would put 65-75ch prose on the
navy ground — bone-on-navy body text is AA (10.91:1) but the spec's calm
canvas is the better reading surface, and the card's default says calm. No
block needed; the instruction's default path was taken.

### Ruling: adjacent-navy avoidance

Home's band-order decision (D20 record §2) forbids two adjacent navy masses.
So the inner-page content below the masthead is NEVER banded — the blog /
per-tag post lists stay on the canvas as D17 cards (paper-on-paper, bordered +
lifted, in light; navy-alt layering in dark), which also keeps them visually
identical to home's What-I-do canvas sections.

### Ruling: mastheads don't animate

Home's animated elements are list/grid items and hero copy; its section
headers (rule + H2) are static. Inner mastheads map to the section-header
anatomy → static. The two post lists get `data-animate-group` /
`data-animate` per item — the exact home Recent-Posts treatment (D15 rides
unchanged; reduced-motion gate verified).

## Per-page notes

- **blog index** — rule upgraded `h-0.5`→`h-1` (D20a); list `gap-10`→
  `gap-[1.2rem]` + data-animate; H1 `mb-8` dropped (band py carries it).
- **post detail** — the old `<div>` title block became the banded `<header>`;
  meta row untouched (`text-foreground/70` = 6.08:1 on navy, Badge remaps to
  bone chip / navy text = 10.91:1 — both pairs already computed in
  plan/full-signal/03-contrast-math.md; NO new pairs introduced).
- **tags index** — H1 + description into the band (desc dropped `mb-6`);
  both H2s `font-medium`→`font-bold` + `h-1 w-8` gold rules above (the
  ledger-item-6 follow-up); popular-tags grid `gap-3` kept (already tighter
  than 1.2rem — loosening it would reverse the compact direction).
- **per-tag** — masthead band + same list treatment as blog index.
- **about** — `<header>` inside `<article>` banded in place (semantics kept;
  bleed math unaffected — article spans main's width); Prose wrapper gains
  `mt-10` (band→content gap). Prose untouched: avatar float, measure, and
  typography unchanged.

## What deliberately did NOT change

- `global.css` (zero new CSS — the entire pass rides existing utilities),
  every component, BaseLayout, breadcrumbs, Pagination, TOC, PostListItem.
- Prose measure: article `lg:max-w-2xl` = 672px and `.prose` 16px/1.6
  (probe-verified unchanged). The 65-75ch cap stays law — nothing widened.
- Dark-mode rhythm stays partial (D20b): no third navy invented for visible
  dark bands.
