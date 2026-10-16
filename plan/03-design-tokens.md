# 03 — DESIGN.md Signal Token Adoption Plan

Root `DESIGN.md` (Signal spec) is the **styling source of truth** (root-task mandate). Adoption is a pipeline: spec → CSS custom properties → Tailwind 4 `@theme inline` → utilities/consumers. Nothing hardcodes a Signal color outside the token layer.

## Step 0 — Carry the spec (T2)

Copy `/opt/data/workspace/nhut-duong/DESIGN.md` → repo root **verbatim** (front matter included; it is treated as read-only spec). The known spec-vs-implementation deltas are NOT edited into it; they are decided by the owner (D9) and documented here.

## Token map (spec → CSS vars → Tailwind)

Core five (DESIGN.md front matter / prose — research/05). CSS vars are **mode-mapped**: light = bone-paper canvas + navy text; dark = navy canvas + bone text (legacy-proven strategy, carried — see Mode strategy below).

| Role (spec) | Hex | Light mode | Dark mode | Tailwind export |
| --- | --- | --- | --- | --- |
| Primary / Bg (deep navy) | `#1c2644` | `--foreground` (text) | `--background` (canvas) | `bg-background`, `text-primary` |
| Secondary / Bg Alt (navy-alt) | `#232f55` | `--navy-alt` | `--navy-alt` | `bg-navy-alt` |
| Tertiary / Fg (bone) | `#e2dcd0` | `--background` is the *surface* bone `#f0ece3`; bone itself is dark-mode text | `--foreground` (text) | `text-foreground` |
| Neutral (muted gold accent) | `#c8a870` | `--gold` | `--gold` | `text-gold`, `border-gold` |
| Surface / Bg Light (bone paper) | `#f0ece3` | `--background` (canvas) | surface tint via `--accent` | `bg-background`, `bg-accent` |

So: `--background` = `#f0ece3` (light) / `#1c2644` (dark); `--foreground` = `#1c2644` (light) / `#e2dcd0` (dark). Mode strategy (legacy-proven, carried): class-based dark mode via `@custom-variant dark (&:where(.dark *))`; a **blocking** theme script in BaseLayout (localStorage → `prefers-color-scheme` fallback) sets `.dark` before first paint — no FOUC (risk R5).

Derived tokens (beyond spec's five — required for a working UI; values from legacy implementation, re-derived during T2): `--muted-foreground`, `--accent` (surface tint), `--border`, `--ring #9a7a44` (gold darkened for WCAG 3:1 focus on light), `--gold-hover #b8976a`, `--link` (navy light / gold dark), `--radius 0.25rem` (spec: 4px base radius). Each derived token is a WCAG/interaction requirement of the spec's Do's (AA 4.5:1 body text; focus rings) — documented in global.css comments, never magic.

`@theme inline` exports utilities: `background/foreground/primary/muted-foreground/accent/border/ring/gold/gold-hover/navy/navy-alt/link/input` + `font-sans`/`font-serif` → Fonts API vars (`--font-dm-sans`, `--font-source-serif`, `--font-ibm-plex-mono`) + radius. **Re-derive from DESIGN.md during T2; do not blind-copy legacy global.css** (research/06 C-row) — the file structure (sections below) is the template, values re-checked against spec.

## global.css structure (T2 deliverable)

1. `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"` + `@custom-variant dark`
2. Signal tokens `:root` / `.dark`
3. `@theme inline` mapping
4. Base layer: border/outline defaults, `cursor-pointer` on buttons, heading `text-wrap: balance`, `:focus-visible` ring
5. `prefers-reduced-motion` guard zeroes transitions/animations (spec Motion rule)
6. `.prose` overrides: typography-plugin vars → Signal tokens (gold quote borders, navy-alt `pre` bg, IBM Plex Mono code, Source Serif 4 700 headings, anchor-link styling)
7. Shiki `css-variables` token colors: navy-alt canvas, bone text, gold keywords/operators/tags — spec-consistent syntax highlighting

## Typography ⛁ D9

Headings/display: Source Serif 4 700 (hero `clamp(2.5rem,5vw,4rem)`, H1 2.25rem, H2 1.5rem). Body/UI: **DM Sans** 400 16px/1.6 max-72ch, UI labels 0.875rem/500; code IBM Plex Mono (per DESIGN.md prose + legacy; D9 confirms vs the front-matter `body-md` Source Serif 4 token). Fonts: Astro Fonts API, Fontsource provider, self-hosted at build (D9-2) — cold-cache builds need network (R3, document in AGENTS.md).

## Motion, layout, and don'ts (enforced by T2 + Biome/review)

- Motion: 200–300ms ease-out; entry fade+translateY 16px→0 over 420ms, 80ms stagger; **only transform/opacity**; reduced-motion guard overrides all.
- Layout: max-width 1280px + 1.5rem side padding; section gaps `clamp(4rem, 8vw, 8rem)` (≥5rem); mobile stacking <768px; `min-h-[100dvh]` never `h-screen`.
- Don'ts enforced at review: no emojis in UI, no pure black, saturation ≤80%, no 3-equal-column rows (zig-zag instead), no AI clichés in copy, no lorem ipsum, no broken external images.

## Token consumers outside CSS (each pinned to a task)

| Consumer | Adoption | Task |
| --- | --- | --- |
| Shiki code blocks | `css-variables` theme reads token vars | T2 |
| OG images (`og/[...id].ts`) | bone bg, 10px gold border, navy Source Serif 4 title (vendored 700 TTF), android-chrome-512 logo — values read from the same token constants | T10 |
| manifest.webmanifest | theme/background `#f0ece3` (surface token) | T9 |
| ThemeToggle `theme-color` metas | light/dark token values | T4 |

## Verification (T2 gate)

- `astro build` green; `dist/_astro/*.css` contains `--background:#f0ece3` (light) and `.dark` block with `--background:#1c2644` (grep assertions in T2 steps).
- No raw Signal hex outside `global.css` + manifest/OG constants: `grep -rn '#1c2644\|#c8a870\|#f0ece3' src/` hits only token/constant definitions.
- Contrast spot-check: body text pair AA 4.5:1 in both modes (spec Do).

## Post-ship design audit (2026-10-15, superpowers code-review pass) — resolutions

1. **button-primary**: DESIGN.md self-contradicts (front matter: navy bg/gold text; prose Components: "Accent color fill"). RESOLVED per prose — gold fill + navy text (6.59:1 AA either way).
2. **Entry animations**: spec Elevation describes fade+translateY 420ms/80ms stagger; NOT implemented — deliberate read of "Motion: 2/10 Minimal". Static on load by intent.
3. **Article body**: `sm:prose-lg` removed and `.prose` locked to `font-size:1rem; line-height:1.6` (spec Body token) after audit found 18px/1.78 drift on ≥640px. Committed with `--font-mono` mapping fix (hero mono labels were falling back to OS mono).
4. **Adaptation audit (15/10, deleg review of d17c942..db6aad6 + follow-up eddc45a)**: no Critical; token discipline verified airtight. RESOLVED by the adaptation: 150ms hover stragglers (T1 default + `eddc45a` sweep of anchor-link/about-avatar), focus-ring geometry (T1 outline-2/offset-2 everywhere), H2 `sm:text-3xl` overshoot (index + tags, `eddc45a`). DELIBERATE: TOC progress marker keeps `duration-300` — scroll-tracking motion, spec physics allow 200–300ms (hovers are the 200–250ms rule). Entry-animation non-adoption above is SUPERSEDED by D15 (now implemented, reduced-motion gated). STILL DEFERRED (owner list): side padding 1rem/2rem vs 1.5rem; 11px hero caption; lead-style `sm:text-lg` copies; hero→posts gap ambiguity (spec self-contradicts); THEME_COLORS duplication; orphaned `--input` token.
5. **Impeccable audit follow-up (15/10, plugin detector + manual adjudication)**: 1 real fix — hero "EST. 2020" caption `text-foreground/60` (3.9:1) → `text-muted-foreground` (5.10:1 AA); NavLink root exact-match for `aria-current` (dormant — no Home nav item exists; nav = About/Blog, home is the logo). Findings verified FALSE under inspection: skip-to-content (already in BaseLayout), mobile TOC `<details>` inset (px-4 pb-4 present — detector cannot resolve Tailwind utilities in dist HTML). Detector's 175 design-system notes = DESIGN.md front-matter enumeration gap (tonal ramp + prose type scale), deliberately NOT edited into the spec — this ledger is the record. Post-fix score: A11y 4/4, total 18/20.
6. **Full Signal shipped (15/10, D20; commit c4da775)**: home banded N→B→N→B via `.band` local token remap (dark-canvas values on light page); `.dark .band` cards → navy-alt; intra-section gaps 1.2rem; gold rules 4px (D20a); dark rhythm partial per spec ◐ (D20b); inner pages remain D16-look pending follow-up card (D20c). Vision review: premium/institutional, clean transitions; 2 P3 notes (hero rule alignment nuance, header top margin on full-bleed).
7. **Full Signal inner pages shipped (15/10, D20c; t_356d544c)**: blog index, post detail, tags index, per-tag, about each open with a navy full-bleed masthead band (`.band bleed` + container + `h-1 w-8` gold rule) over calm-canvas content — reading surfaces (post body, about prose, TOC) untouched, so the card's conditional BLOCK never triggered; blog/per-tag lists to `gap-[1.2rem]` + data-animate (home Recent-Posts anatomy); tags H2s 500→700 + gold rules (ledger item 6's flagged follow-up); ZERO global.css changes — markup-only pass riding c4da775's utilities. Full record: `plan/full-signal-inner/00-index.md`.

## Full Signal pass (D20) implementation record — 2026-10-15, t_4d24ffa0

D20 supersedes D16-moderate. Implemented on the home page only, tokens only:

1. **Bands**: `.band` maps the site palette onto the dark-canvas token values in BOTH modes (the `.dark` token block is now shared `.dark, .band`); `.bleed` (`width:100vw` + symmetric `calc(50% - 50vw)` margins) breaks a section edge-to-edge past the centered container; band content re-applies `mx-auto max-w-7xl px-4 md:px-8`; `html, body { overflow-x: clip }` guards scrollbar-gutter overshoot (Chromium does not propagate `clip` from body alone — verified by probe).
2. **Section order** (reading-peak decision): Hero navy band → What-I-do bone canvas → Recent Posts navy band → CTA bone canvas. Two adjacent navy bands (hero + What-I-do) would merge into one undifferentiated mass; the second navy band lands on Recent Posts (bone cards on navy, 12.63:1) as the peak before the quiet bone outro. CTA flips relative to its neighbor per spec.
3. **Band cards**: `.band { --card: #f0ece3 }` (light) / `.dark .band { --card: var(--navy-alt) }` (dark); `html:not(.dark) .band .card` re-scopes the light palette onto the card (incl. `color: var(--foreground)` — inheritance alone carries the band's bone color onto the paper card; caught by browser probe, fixed). Dark mode: the band merges with the navy canvas and the layering is navy-vs-navy-alt via cards (spec "Light/Dark: ✓ Full / ◐ Partial" — the alternating rhythm is light-mode-full by design).
4. **Compact rhythm**: intra-section grids/lists `gap-[1.2rem]` (were 1.5/1.25rem); inter-section rhythm unchanged (mt-10 canvas gaps + band `py-[clamp(4rem,8vw,8rem)]` = the spec's section-gap scale inside bands).
5. **Gold section rules**: `h-1` (4px). NOTE: the task card said "2px (h-1)" — self-inconsistent (h-1 = 4px; rules were already 2px via h-0.5). The utility was implemented (no-op could not be the intent); one-line revert to h-0.5 if the owner wants literal 2px.
6. **Serif display**: hero clamp/weight/tracking unchanged (already spec: 700 / tracking-tight, floor -0.04em respected); section H2s `font-medium` → `font-bold` (spec display weight 700). Blog/tags H2s remain 500 — out of D20's home-only scope, flag for a follow-up pass.

Verification (full detail: `plan/full-signal/00-index.md`): `npm run ci` exit 0; built-CSS greps green (band utilities, `.dark` card flip, pocket remap, rise keyframes only inside no-preference); impeccable detect: 0 contrast findings (baseline 1, resolved); WCAG computed — all band pairs AA, required bone-card pair exactly 12.63:1; browser probes 1280+375 light+dark: pan locked (scrollX 0), bands full-bleed, 12-col asymmetric grid at lg / single column at 375, reduced-motion `animation: none` + `opacity: 1`.

## Full Signal inner pages (D20c) record — 2026-10-15, t_356d544c

Markup-only pass (zero `global.css` changes — rides c4da775's `.band`/`.bleed` utilities); full pyramid: `plan/full-signal-inner/00-index.md`.

1. **Masthead-band ruling**: every inner page (blog index, post detail, tags index, per-tag, about) opens with `<header class="band bleed py-[clamp(4rem,8vw,8rem)]">` + re-applied container + `h-1 w-8` gold rule + H1 (+ meta/description where present), then `mt-10` calm content. Reading surfaces (post body 672px, about prose, TOC) stay on the canvas — the card's "BLOCK if a better reading argues banding the article" clause never triggered: nothing argued better than the calm canvas for 65-75ch prose.
2. **Adjacent-navy avoidance**: content below an inner masthead is never banded (home's band-order rule) — post lists render as D17 canvas cards (paper-on-paper light, navy-alt dark).
3. **Compact rhythm**: blog + per-tag lists `gap-10` → `gap-[1.2rem]` with `data-animate-group`/`data-animate` (home Recent-Posts anatomy); tags grids already ≤ 1.2rem — left alone.
4. **D20a rules**: masthead `h-1 w-8` everywhere (blog's `h-0.5` upgraded); tags H2s gain rules + `font-medium`→`font-bold` (item-6 follow-up).
5. **Mastheads static** (like home's section headers); only list items animate — reduced-motion gate re-verified (`animation: none`, `opacity: 1`).
6. **Verification**: `npm run ci` exit 0 ×2; built-CSS greps 7/7; 1 band header per inner page in dist HTML; impeccable detect **0 contrast findings** and advisory distribution **byte-identical** to a stash-built pre-change baseline (90/60/35/18/15/4/1/1 per class); probes 1280/375 × light/dark: full-bleed exact (band 1280 wide @ client 1265; 0..375 @375), insets 16/32px, no h-scroll, dark merge confirmed on all five; independent vision pass clean (1 pre-existing note: about's tilted-avatar corner near text — predates D20c, deferred).

## SOURCES

- `/opt/data/workspace/nhutduong.com/research/05-design-assets.md` — DESIGN.md verbatim token summary, global.css implementation detail, fonts, WCAG derivations.
- `/opt/data/workspace/nhut-duong/DESIGN.md` — spec (copied verbatim in T2); `/opt/data/workspace/nhut-duong/src/styles/global.css` — structural reference only.
- decision-log.md D9 (typography), D5 (TOC/Prose consumers), 02-architecture.md (fonts config).
