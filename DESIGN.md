---
version: "1.0"
name: "Signal"
description: "Signal — the design system of nhutduong.com. A light bone-paper editorial journal carried by Source Serif 4 typography, deep navy ink, and a single muted-gold accent. One committed light rendition; every element must justify its existence against not being there."
colors:
  primary: "#1c2644"
  secondary: "#232f55"
  tertiary: "#e2dcd0"
  neutral: "#c8a870"
  surface: "#f0ece3"
typography:
  h1:
    fontFamily: Source Serif 4
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
  mono:
    fontFamily: IBM Plex Mono
    fontSize: 0.875rem
spacing:
  sm: 1.0rem
  md: 2.0rem
  lg: 4.0rem
components:
  rule-gold:
    height: 3px
    width: 88px
    backgroundColor: "{colors.neutral}"
---

## Overview

Signal is the design system of a practitioner's journal: a writing-led personal site where typography and negative space carry authority. The canvas is warm bone paper, the ink is deep navy, and one muted gold accent is spent only on rules, dots, and small caps kickers — never on anything that shouts.

The register is institutional-editorial: the confidence of engraved stationery and private-banking reports, translated to a fast static web page. Source Serif 4 gives display type the optical refinement of a Plantin with contemporary screen metrics; DM Sans keeps body reading quiet; IBM Plex Mono marks metadata, navigation, and code as the "apparatus" of the page.

There is exactly one rendition: light. No dark mode, no theme toggle, no boot script. The bone paper **is** the design.

- Density: 8/10 — Dense
- Motion: 2/10 — Minimal
- **Style:** Institutional, Editorial, Classical-Serif, Restrained
- **Keywords:** bone paper, deep navy, muted gold, Source Serif 4, journal, poster, typographic
- **Light/Dark:** Light only

## Colors

| Token | Hex | Role |
| --- | --- | --- |
| `--background` | `#f0ece3` | Bone paper — the page |
| `--foreground` | `#1c2644` | Deep navy — ink, headings, links |
| `--primary` | `#1c2644` | Same navy as utility primary |
| `--navy-alt` | `#232f55` | Code block background |
| `--bone` | `#e2dcd0` | Code foreground on navy |
| `--gold` | `#c8a870` | Rules, dots, decoration only — 1.92:1 on bone, **never body text** |
| `--gold-text` | `#7a5f34` | The only gold permitted as text (kickers, TOC active) — 5.07:1 |
| `--muted-foreground` | `#5b6377` | Secondary text, metadata — 5.1:1 |
| `--border` | `#d7d1c3` | Hairlines, TOC panel |
| `--ring` | `#9a7a44` | Focus rings |

Contrast law: WCAG AA (4.5:1) for all body text; decoration gold may fall below AA only because it never carries information alone.

## Typography

- **Display / poster name:** Source Serif 4 — 700, `clamp(4.5rem, 11vw, 9.5rem)`, line-height 0.94, tracking −0.02em (home only)
- **Label H1:** Source Serif 4 — 700, `clamp(2.75rem, 6vw, 4rem)`, with gold dot suffix
- **Post H1:** Source Serif 4 — 700, `clamp(2.25rem, 5vw, 3.5rem)`, balanced wrap, no dot
- **Prose H2–H4:** Source Serif 4 — 700, scroll-margin 1.5rem for anchor jumps
- **Body:** DM Sans — 400, 1rem/1.6, `text-wrap: pretty`
- **Mono label:** IBM Plex Mono — uppercase, 0.6875rem (0.75rem ≥ 768px), tracking 0.14–0.18em, tabular numerals — used for kickers, nav, metadata, footer
- **Code:** IBM Plex Mono — Shiki `css-variables` theme over navy-alt/bone

## Layout

- **Container:** `max-w-7xl` + 24px side padding (content edges 97/1329 at 1440px; 24/351 at 390px)
- **Reading column:** 576px (`max-w-36rem` ≈ 72ch) for prose
- **Label-page grammar:** label H1 + gold dot → optional mono meta line (`mt-5`) → 3px gold rule (`mt-8`) → content (`mt-10`)
- **Wide pages:** two-column section grids — 64px column gap, 40px row gap; h2 margins zeroed inside cells so the grid owns the rhythm
- **Footer:** stacks below 1024px; two-column row (colophon left, socials right) from `lg:`; socials are mono-caps text links with gold middot separators
- **Post page:** TOC rail sticky at `lg:top-6` right of prose; `<details>` disclosure under 1024px, close-then-scroll on tap
- No horizontal overflow at any width. Multi-column layouts collapse below their breakpoint.

## Motion

- Hover: color transitions only, 200ms
- Entry: rise — fade + translateY(16px→0), 420ms ease-out, 80ms stagger via `--i`
- `prefers-reduced-motion`: everything zeroed (0.01ms durations, auto scroll)
- Only transform and opacity animate; no layout-triggering properties

## Shapes

Base corner radius: 4px (`--radius: 0.25rem`).

## Grammar

- **Gold dot** — suffixes *label* titles only (`About.`, `404.`, the logo, the poster name). Essay titles never take the dot.
- **Gold middots** — separate list tokens in mono meta lines (role row, footer socials, breadcrumbs); hidden when stacks wrap.
- **Gold rule** — 3px × 88px, the major separator under label headers.
- **OpenGraph cards** repeat the poster grammar: bone canvas, mono-caps kicker, serif title (dot on the name card only), gold rule, mono footer.

## Do's and Don'ts

- No emojis in UI
- No pure black (`#000000`)
- No 3-column equal-width layouts
- No `h-screen` — use `min-h-[100dvh]`
- No dark mode, theme toggle, or theme boot script
- No gold as body text — `--gold-text` only
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- Do verify AA contrast for every text/token pairing
- Do keep prose in the 576px column
- Do justify every element against simply not being there

## Use Case

nhutduong.com — a practitioner's journal: essays and technical writing lead; consulting credibility rides along. The system extends naturally to adjacent surfaces (OG cards, RSS, print) because it is typography-first and rendition-locked.
