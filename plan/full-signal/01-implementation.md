# 01 — Implementation

Files changed: `src/styles/global.css`, `src/components/Hero.astro`,
`src/pages/index.astro`. Nothing else — blog/tags/about pages untouched.

## Token mechanics (global.css)

The `.dark` token block became a shared `.dark, .band` block — a band IS the
dark-canvas palette, scoped. In light mode that inverts the section against
the bone-paper page; in dark mode the band's values equal the root's, so the
band merges with the canvas (spec ◐ Partial) and the layering is carried by
navy-alt cards and the hero art's navy-alt rect.

New rules, all values existing tokens:

```css
.dark { --card: var(--navy-alt); }        /* unchanged behavior for .dark */
.band { --card: #f0ece3; }                /* light-mode flip (bone-paper card) */
.dark .band { --card: var(--navy-alt); }  /* dark-mode layering */

/* a card on a light-mode band is a pocket of the light palette */
html:not(.dark) .band .card {
  --foreground: var(--navy);
  --muted-foreground: #5b6377;
  --border: #d7d1c3;
  --link: var(--navy);
  color: var(--foreground);   /* required: see the bug note below */
}

@utility band  { @apply bg-background text-foreground; }
@utility bleed { margin-inline: calc(50% - 50vw); width: 100vw; }
```

`bleed` math: `width: 100vw` + two `calc(50% - 50vw)` margins totals exactly
100% of the containing block, so the section spans the viewport symmetrically
around the centered main. Band children re-apply the page container
(`mx-auto w-full max-w-7xl px-4 md:px-8`) so text position is identical to
the pre-band layout (verified: inner inset 32px @1280, 16px @375).

`html, body { overflow-x: clip }` — with a classic scrollbar, 100vw exceeds
the client width by the gutter; clip keeps that overshoot paint-only. Probe
finding: Chromium does **not** propagate `clip` from `body` to the viewport
(forced-pan test panned 8px with body-only) — the html rule is required.

### Bug caught and fixed during verification

The first pocket rule omitted `color: var(--foreground)`. Custom-property
remapping only re-resolves where a property is re-declared: the card's text
color was *inherited* from the band (bone) → bone text on the paper card
(~1.2:1). The browser probe caught it (`postCardColor: rgb(226,220,208)`);
adding the `color` declaration fixed it (`rgb(28,38,68)`).

## Home structure (index.astro, Hero.astro)

```
Hero      section.band.bleed.relative.py-[clamp(4rem,8vw,8rem)]
What-I-do canvas section (unchanged wrapper; header mt-10 = 2.5rem canvas gap)
Posts     section.band.bleed.mt-10.py-[clamp(4rem,8vw,8rem)] + inner container
CTA       canvas section.mt-10 (flips relative to the Posts band)
```

- Rhythm: every section boundary keeps the existing mt-10 canvas gap; the
  spec's `clamp(4rem,8vw,8rem)` section-gap scale lives inside the bands.
- Compact: What-I-do grid `gap-6`→`gap-[1.2rem]`; posts list `gap-5`→
  `gap-[1.2rem]` (the spec's "dense grid, compact 1.2rem gaps"). Hero display
  spacing and the tighter-than-1.2rem header gaps untouched.
- Section rules `h-0.5`→`h-1` (see index flag #1); hero gold hairlines stay
  punctuation-level (h-px dashes/art lines untouched).
- Section H2s `font-medium`→`font-bold` (DESIGN.md display weight 700; prose
  headings are already 700 via global.css). Hero h1 already at spec.
- Entry animations: no markup changes to groups/attrs — the D15 system rides
  the new bands unchanged (verified live, incl. reduced-motion).

## Decisions the owner gate should ratify

1. **Band order** — Hero N → What-I-do B → Posts N → CTA B. The alternative
   (What-I-do navy) puts two navy bands adjacent to the hero's navy and the
   rhythm dies in one merged mass. Recent Posts as the second band makes the
   densest content the reading peak (5 bone cards on deep navy) before the
   quiet bone outro; CTA flips vs its neighbor as the card requires.
2. **"2px (h-1)"** — implemented `h-1` (4px). Tailwind `h-1` = 4px and the
   rules were already 2px (`h-0.5`), so "2px" alone would be a no-op; the
   card's explicit utility won. Revert = `h-0.5` in three places.
3. **Dark-mode partial rhythm** — deliberate, spec-anchored (◐), not an
   omission: forcing visible bands in dark would need navy-alt band grounds,
   which leaves navy-alt cards invisible on them (no third navy exists).
