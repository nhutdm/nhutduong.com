# Signal Prompt Adaptation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt the designmd.app Signal AI-Prompt directives into nhutduong.com per owner decisions D14–D19: selective landing anatomy, entry animations, moderate texture, interaction polish — on the already-adopted Signal token system.

**Architecture:** Pure presentation layer on the existing Astro 7 + Tailwind 4 token pipeline (all values trace to DESIGN.md tokens; no new dependencies). One new component (FeatureCard), one animation system (CSS keyframes + index assignment script), token-derived card/shadow utilities. Content copy for the new section is drafted from about.mdx and flagged for owner review at the gate.

**Tech Stack:** Astro 7.3, Tailwind 4.3 (@theme inline tokens), TypeScript, Biome, wrangler 4 (unchanged — dependency pins frozen).

**Spec:** `DESIGN.md` (repo root — verified byte-identical to designmd.app/library/signal), scope-filtered by owner answers D14–D18 in `plan/decision-log.md`.

## Global Constraints

- Hover transitions 200–250ms (spec Elevation); entry animations fade + translateY(16px→0), 420ms ease-out, 80ms stagger between list items
- Only `transform` and `opacity` animated — no layout-triggering properties; `prefers-reduced-motion` disables all entry animation
- Cards: 4px corners, surface background, shadow `0 2px 12px rgba(0,0,0,0.06)`, 1px border stroke
- No emojis in UI — icons are inline SVG (Lucide path data)
- No 3-column equal-width feature layouts — asymmetric/staggered grid (D19)
- Typography scale: hero `clamp(2.5rem,5vw,4rem)`, H1 2.25rem, H2 1.5rem, body 1rem/1.6, small 0.875rem
- Fonts stay self-hosted via Astro Fonts API (D9/D18) — NO Google Fonts CDN
- Generous spacing retained — no compaction to 1.2rem gaps, no alternating navy full-bleed sections (D16)
- Workers commit locally only; gateway ships after owner review; zero new npm dependencies

## Review Focus

1. **Reduced-motion users must get zero animation** — keyframes live only inside a `prefers-reduced-motion: no-preference` media query (verify in built CSS).
2. **Animations must not replay jankily on Astro client-side navigation** — index assignment runs on every `astro:page-load`; elements must end at `opacity:1` even if the script fails (forwards fill + no-JS fallback: elements visible without the class).
3. **Dark-mode cards must flip tokens** — `--card` maps to background (light) / navy-alt (dark); grep the `.dark` block.
4. **Keyboard focus must remain visible everywhere** — unified `outline-2 offset-2 outline-ring`; no component left with neither old ring nor new outline.
5. **The 3-card section must not render as 3 equal columns ≥768px** — asymmetric spans survive at `lg`; below 768px it stacks (spec mobile rule).

---

### Task 1: Interaction baseline — 200ms hovers, unified focus rings

**Files:**
- Modify: `src/styles/global.css` (@theme block)
- Modify: `src/components/Button.astro:16`, `src/components/ThemeToggle.astro:9`, `src/components/SocialLink.astro:13`, `src/components/Badge.astro:17`

**Interfaces:** Produces: `--default-transition-duration: 200ms` theme var consumed by every `transition-*` utility; canonical focus recipe `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`.

- [ ] **Step 1:** In `@theme inline` add `--default-transition-duration: 200ms;` — every existing `transition-colors` utility now runs at spec timing without touching components.
- [ ] **Step 2:** Replace `focus-visible:ring-1` variants on the four components with the canonical outline recipe (matches `global.css:109-112` link treatment).
- [ ] **Step 3:** Verify: `npm run ci` exit 0; built CSS contains `--default-transition-duration:.2s` (or `200ms`) and zero remaining `focus-visible` ring-1 rules: `grep -c 'ring-1' dist/_astro/*.css` → 0.
- [ ] **Step 4:** Commit: `feat(design): 200ms hover baseline, unified 2px/offset-2 focus rings`

### Task 2: Entry animation system

**Files:**
- Modify: `src/styles/global.css` (keyframes + `.anim` utilities)
- Modify: `src/layouts/BaseLayout.astro` (page-load index script)
- Modify: `src/components/Hero.astro`, `src/pages/index.astro` (data-animate groups)

**Interfaces:** Produces: `[data-animate-group]` containers and `[data-animate]` children; script sets `--i` per child in DOM order; CSS consumes `animation-delay: calc(var(--i, 0) * 80ms)`.

- [ ] **Step 1:** CSS — inside `@media (prefers-reduced-motion: no-preference)`: `@keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }` and `[data-animate] { opacity: 0; animation: rise 420ms ease-out forwards; animation-delay: calc(var(--i, 0) * 80ms); }`. Elements WITHOUT JS assignment default `--i: 0` and still animate in; no-JS never hides content because the rule itself only applies under no-preference + the attribute is only on enhanced elements… if the script never runs, `[data-animate]` still fills forwards — visible after 420ms worst case.
- [ ] **Step 2:** Script in BaseLayout (`astro:page-load`): for each `[data-animate-group]`, set `style.setProperty('--i', idx)` on its `[data-animate]` children in DOM order.
- [ ] **Step 3:** Apply groups: hero (eyebrow, h1, subtitle, buttons), "What I do" cards, home post list items, final CTA block.
- [ ] **Step 4:** Verify: `npm run ci`; built CSS contains `rise` keyframes AND they appear only inside the `prefers-reduced-motion:no-preference` query; `dist/index.html` has `data-animate-group`; only `transform`/`opacity` appear in the keyframes.
- [ ] **Step 5:** Commit: `feat(design): Signal entry animations — 420ms rise, 80ms stagger, reduced-motion safe`

### Task 3: Texture — bone cards, lift shadows, gold rules

**Files:**
- Modify: `src/styles/global.css` (`--card` token pair, `--shadow-lift`, `.card` utility)
- Modify: `src/components/PostListItem.astro` (card presentation)
- Modify: `src/pages/index.astro`, `src/pages/blog/index.astro` (section header gold rules)

**Interfaces:** Produces: `--card` (light: `var(--background)`, dark: `var(--navy-alt)`), `--shadow-lift: 0 2px 12px rgb(0 0 0 / 0.06)`, `.card` utility (border-border, rounded-[4px], bg-card, shadow-lift).

- [ ] **Step 1:** Add tokens + `.card` utility; hover lift: `transition` (Task 1 baseline) + `hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgb(0_0_0/0.08)]` — transform/shadow only.
- [ ] **Step 2:** PostListItem adopts `.card` (padding via spacing scale; title/date/tags unchanged inside).
- [ ] **Step 3:** Section headers: 2rem gold rule (`h-0.5 w-8 bg-gold`) above H2 on home sections + blog index — restrained punctuation, not decoration.
- [ ] **Step 4:** Verify: `npm run ci`; built CSS: `.dark` block contains `--card:#232f55`-equivalent (via var), `.card` rule present with the shadow value; contrast pairs unchanged (fg on card = fg on background, 12.6:1 light).
- [ ] **Step 5:** Commit: `feat(design): bone cards, lift shadows, gold section rules`

### Task 4: Home anatomy — hero second button, "What I do", final CTA

**Files:**
- Modify: `src/components/Hero.astro` (secondary button)
- Create: `src/components/FeatureCard.astro`
- Create: `src/icons/{code,layers,pen-tool}.astro` (Lucide inline SVG paths)
- Modify: `src/pages/index.astro`

**Interfaces:** Consumes: Button secondary variant (existing), `.card` (Task 3), `[data-animate-group]` (Task 2). Produces: `FeatureCard({ icon: string, title: string, body: string })`.

- [ ] **Step 1:** Hero: secondary ghost Button "About me" → `/about` beside the existing primary.
- [ ] **Step 2:** `src/icons/*.astro` — three Lucide icons as inline SVG (`stroke="currentColor"`, `class="size-5"`), no emojis anywhere.
- [ ] **Step 3:** "What I do" section on `/`: H2 at `text-2xl` (1.5rem — spec H2) with gold rule; three FeatureCards in an ASYMMETRIC grid — `lg:grid-cols-12` with spans 5/4/3 and a `lg:mt-8` offset on the middle card (staggered, not 3-equal; D19). Copy drafted from `src/content/about.mdx` + cv themes: Web Development / Architecture & Consulting / Technical Writing — **OWNER REVIEW: final copy at gate.**
- [ ] **Step 4:** Final CTA before footer: centered H2 + primary Button "Read the blog" → `/blog` + plain mailto text link `hello@nhutduong.com`. No navy full-bleed band (D16).
- [ ] **Step 5:** Verify: `npm run ci`; `dist/index.html`: two hero buttons, 3 `FeatureCard` roots, asymmetric spans (`lg:col-span-5` etc.), CTA present; `grep -P '[\x{1F300}-\x{1FAFF}]' dist/index.html` → no emojis; grid stacks below 768px (single column classes).
- [ ] **Step 6:** Commit: `feat(home): hero secondary CTA, asymmetric what-I-do cards, final CTA per D14/D19`

### Task 5: Ledger sync, fresh audit, ship

**Files:**
- Modify: `plan/decision-log.md` (D14–D19 status APPROVED on ship)
- Modify: `plan/03-design-tokens.md` (supersede resolutions #7/#8 → resolved; entry animations → adopted per D15)

- [ ] **Step 1:** Dispatch fresh-context design audit (astro-site-ops `references/design-audit.md` focus list + this plan as requirements, full task range). Fix Critical immediately, Important before ship; record every deferral in the ledger.
- [ ] **Step 2:** Owner gate: present audit verdict + the Task 4 copy for approval.
- [ ] **Step 3:** Ship procedure: `npm run ci` → built-CSS greps → commit → push (`set -a && source /opt/data/.env && set +a` + gh auth) → `npx wrangler deploy` → live verify (CSS hash equals local dist; `/`, `/about/`, `/blog/`, one post, `/rss.xml` → 200; redirected slug → 301; bogus → 404).
- [ ] **Step 4:** Commit ledger updates: `docs: D14–D19 approved, Signal prompt adaptation shipped`
