# Surface brief — home + derived pages (src/pages/index.astro)

## Scope and visitor mode

Persuade. Engineers first: technical writing leads, consulting credibility rides along. All 15 routes derive from one grammar; the home poster is the lead surface.

## Direction contract

THESIS: The home page is a typographic poster — the name at poster scale on bone paper is the entire hero, the writing index sits beneath it, and nothing decorative exists. Refuses: hero-plus-abstract-card, "Hey, I'm X" eyebrow formula, card grids, pill badges.

OWN-WORLD: Bone-paper canvas (#f0ece3) with navy ink (#1c2644) in light mode (the designed mode); dark mode inverts to navy canvas per Signal tokens. Source Serif 4 700 display, DM Sans body, IBM Plex Mono for dates/metadata in tracked caps. 1px hairlines between entries, 3px gold rules for major separations, gold dot as the only repeated ornament. No cards, no shadows, no icons in UI chrome.

STORY: A visitor lands, reads who this is at full scale in one second, sees the latest writing immediately below, reads or subscribes. Inner pages repeat the grammar: compact wordmark masthead, serif statement headings, manifest rows of dated entries, quiet mono metadata.

FIRST VIEWPORT: Light bone. Top mono line: "EST. 2012 — HO CHI MINH CITY" left, nav + theme toggle right, hairline under. Role line in tracked mono caps, then "Nhut / Duong." set two lines at clamp(4.5rem, 11vw, 9.5rem) serif with gold dot — poster scale is owner-pinned, deliberately exceeding the spec's hero clamp. Role row beneath in mono caps; 3px gold rule; bottom third: "LATEST WRITING" mono label, newest entry large with excerpt, two more rows, "All writing →" close.

FORM: The Typographic Poster — dealt structure #7 of grounded round 0, user-pinned across two re-rolls, light-mode rendition chosen by owner. seed: a07dfccd (surface, persuade).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Notes

- Gold text on light canvas uses an accessible darkened-gold token (computed ≥4.5:1); raw gold #c8a870 stays on rules, dots, and dark canvas only.
- Dark mode preserved (full inversion); light is the default regardless of OS preference.
- OG image template keeps the incumbent navy treatment this round (deferred, non-blocking).
