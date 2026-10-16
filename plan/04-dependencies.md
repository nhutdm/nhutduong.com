# 04 — Dependency Table (new package.json vs required pins)

Required pins from t_f72e3533 (verbatim). "New spec" is the recommended `package.json` range for the fresh scaffold (decision D7 #2 — caret + committed lockfile). Legacy column shows the proven combination (research/01).

| Package | Required pin | New spec (recommended) | Type | Legacy | Verdict |
| --- | --- | --- | --- | --- | --- |
| `astro` | ^7.3 | `^7.3.2` | dependencies | ^7.3.2 | MATCH |
| `@astrojs/mdx` | ^8 | `^8.0.1` | dependencies | ^8.0.1 | MATCH |
| `@astrojs/rss` | ^4 | `^4.0.19` | dependencies | ^4.0.19 | MATCH (pin says "rss"; package is `@astrojs/rss`) |
| `@astrojs/sitemap` | ^3.7 | `^3.7.4` | dependencies | ^3.7.4 | MATCH (same note) |
| `astro-og-canvas` | ^0.13 | `^0.13.1` | dependencies | ^0.13.1 | MATCH |
| `tailwindcss` | ^4.3 | `^4.3.3` | dependencies | ^4.3.3 | MATCH |
| `@tailwindcss/vite` | (Tailwind ^4.3 via vite plugin) | `^4.3.3` | dependencies | ^4.3.3 | MATCH |
| `@tailwindcss/typography` | ^0.5 | `^0.5.20` | devDependencies | ^0.5.20 | MATCH |
| `clsx` | (presence pinned, version free) | `^2.1.1` | dependencies | ^2.1.1 | MATCH |
| `tailwind-merge` | (presence pinned, version free) | `^3.6.0` | dependencies | ^3.6.0 | MATCH — major 3 chosen in D7 #3 |
| `typescript` | ^6 | `^6.0.3` | devDependencies | ^6.0.3 | MATCH |
| `@biomejs/biome` | ^2.5 | `^2.5.13` | devDependencies | ^2.5.13 | MATCH |
| `schema-dts` | (presence pinned, version free) | `^2.0.0` | devDependencies | ^2.0.0 | MATCH |
| `wrangler` | ^4.13 | `^4.131.1` | devDependencies | ^4.131.1 | MATCH (^4.131.1 ⊇ ^4.13) |
| `@astrojs/check` | — not in pin list — | `^0.9.10` | devDependencies | ^0.9.10 | **DELTA — addition, D7 #1** (required for `astro check`) |
| `engines.node` | >= 22.12 | `>=22.12.0` | engines | >=22.12.0 | MATCH |

## Rules

1. **Nothing outside this table** may be added without a new owner decision (root-task hard rule; logged as a D-row amendment, never silent).
2. Lockfile (`package-lock.json`) is committed at T1 and every dependency-touching task — reproducible builds, and the rollback path for R4 is `git checkout` of the lockfile.
3. Fresh install resolves latest-within-caret (that is the "from scratch" spirit); if resolution drift breaks the build (R4), fallback is pinning the legacy-proven exact versions — as a recorded decision, not a quiet edit.
4. The legacy repo also carries `@astrojs/check` — the addition restores parity with the proven set, it does not innovate.

## Scripts (package.json)

| Script | Command | Delta vs legacy |
| --- | --- | --- |
| `dev` | `astro dev` | none |
| `build` | `astro build` | none |
| `preview` | `astro preview` | none |
| `lint` | `biome lint --write` | none |
| `format` | `biome format --write` | none |
| `check` | `biome check --write` | none |
| `astro` | `astro` | none |
| `ci` | `biome ci && astro check && astro build` | **+ `astro build`** — root task FINAL VERIFY mandates it; legacy `ci` stopped after `astro check` (research/01). Deliberate, mandated delta — not an owner decision, recorded here for traceability. |

Deploy stays manual and owner-side (`npm run build && npx wrangler deploy` documented in README; workers never run it).

## SOURCES

- `/opt/data/workspace/nhutduong.com/research/01-architecture-config.md` — pin-vs-legacy table (authoritative version source), scripts, extras note.
- Board t_f72e3533 body — pin list + FINAL VERIFY ci contract.
- Legacy `package.json` (read-only): `/opt/data/workspace/nhut-duong/package.json`.
