# research/data — machine-readable backing data

- `content-inventory.json` — scripted extraction of every content file's frontmatter + body stats from the legacy repo (`LEGACY_REPO`, default `/opt/data/workspace/nhut-duong`). Regenerate: `python3 extract_frontmatter.py`.
- `verify_inventory.py` — acceptance cross-check: re-walks the legacy tree and asserts every route file, content slug, component/layout/lib/util file, and public asset appears exactly once across `../0[2-6]*.md`, that every keep/drop row carries a rationale, and that the dependency pin table in `01` covers all required pins. Run: `python3 verify_inventory.py` (env: `LEGACY_REPO`, `RESEARCH_DIR`).

Last run against legacy HEAD `4fcd26a8d7cbb1ac41213fa04dbf2ce08001fc9d`: PASS — 9 routes, 7 content items, 32 code files (21 components + 4 icons + 1 layout + 1 lib + 5 utils), 9 public assets, 2 src assets.
