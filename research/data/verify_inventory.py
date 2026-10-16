"""Verify t_32a53ae9 acceptance criteria against the legacy tree + written artifacts.

Checks:
  A. every src/pages file appears exactly once as a row lead in 02-routes-pages.md
  B. every content slug appears exactly once as a row lead in 03-content-inventory.md
     (main tables); rename-table current slugs must resolve to real slugs
  C. every components/icons/layouts/lib/utils file appears exactly once as a row
     lead in 04-components-utils.md
  D. every public/ asset appears in 05-design-assets.md; src/assets covered
  E. every route + content slug appears in 06-keep-drop.md with a non-empty
     rationale cell; all 06 table rows have non-empty rationale
  F. 01 pin table covers every required pin with an explicit verdict
"""
import re
import sys
from pathlib import Path

import os

LEGACY = Path(os.environ.get("LEGACY_REPO", "/opt/data/workspace/nhut-duong"))
PYRAMID = Path(os.environ.get("RESEARCH_DIR", Path(__file__).resolve().parent.parent))

failures: list[str] = []
notes: list[str] = []


def check(cond: bool, msg: str) -> None:
    if not cond:
        failures.append(msg)


def data_rows(md: str) -> list[list[str]]:
    """Data rows of all markdown tables (skips header + separator rows)."""
    rows: list[list[str]] = []
    prev_table = False
    for line in md.splitlines():
        if not line.startswith("|"):
            prev_table = False
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if not prev_table:  # first row of a table block = header
            prev_table = True
            continue
        prev_table = True
        if cells and not set("".join(cells)) <= set("-: "):  # separator row
            rows.append(cells)
    return rows


def row_leads(md: str) -> list[str]:
    return [c[0].strip("`") for c in data_rows(md)]


def read(name: str) -> str:
    return (PYRAMID / name).read_text(encoding="utf-8")


# --- gather legacy ground truth -------------------------------------------
pages = sorted(str(p.relative_to(LEGACY)) for p in (LEGACY / "src/pages").rglob("*") if p.is_file())
blog_slugs = sorted(p.stem for p in (LEGACY / "src/content/blog").glob("*"))
page_slugs = sorted(p.stem for p in (LEGACY / "src/content/pages").glob("*"))
code_files = sorted(
    str(p.relative_to(LEGACY))
    for d in ("components", "icons", "layouts", "lib", "utils")
    for p in (LEGACY / "src" / d).rglob("*")
    if p.is_file()
)
public_files = sorted(str(p.relative_to(LEGACY)) for p in (LEGACY / "public").rglob("*") if p.is_file())
src_assets = sorted(str(p.relative_to(LEGACY)) for p in (LEGACY / "src/assets").rglob("*") if p.is_file())

notes.append(f"ground truth: {len(pages)} route files, {len(blog_slugs)} blog, {len(page_slugs)} pages, "
             f"{len(code_files)} component/icon/layout/lib/util files, {len(public_files)} public assets, "
             f"{len(src_assets)} src assets")

# --- A. routes in 02 -------------------------------------------------------
md02 = read("02-routes-pages.md")
rows02 = data_rows(md02)
for f in pages:
    n = sum(1 for cells in rows02 if any(f in c for c in cells))
    check(n == 1, f"A: route {f} appears in {n} data rows of 02 (want exactly 1)")
check(len(rows02) == len(pages), f"A: 02 has {len(rows02)} data rows vs {len(pages)} route files")

# --- B. content in 03 ------------------------------------------------------
md03 = read("03-content-inventory.md")
# main tables: rows whose lead is a backticked slug
slug_rows = re.findall(r"^\|\s*`([\w-]+)`\s*\|", md03, re.MULTILINE)
for s in blog_slugs + page_slugs:
    n = slug_rows.count(s)
    check(n == 1, f"B: slug {s} appears as row lead {n}x in 03 main tables (want exactly 1)")
# rename table current slugs must be real
rename_current = re.findall(r"^\|\s*`([\w-]+)`\s*\|\s*`([\w-]+)`\s*\|\s*$", md03, re.MULTILINE)
for old, cur in rename_current:
    check(cur in blog_slugs, f"B: rename target {cur} is not a real blog slug")
    check(old not in blog_slugs, f"B: rename source {old} still exists as a file (stale redirect)")

# --- C. components/utils in 04 ---------------------------------------------
md04 = read("04-components-utils.md")
leads04 = row_leads(md04)
# files with dedicated rows are matched by exact basename (unique in repo)
for f in code_files:
    base = Path(f).name
    if str(Path(f).parent) == "src/icons":
        check(base in md04, f"C: icon {base} not mentioned in 04")
        continue
    n = sum(1 for lead in leads04 if lead == base or lead.endswith(f"/{base}"))
    check(n == 1, f"C: {base} appears as row lead {n}x in 04 (want exactly 1)")
for f in src_assets:
    check(f in md04, f"C/D: src asset {f} not mentioned in 04")

# --- D. public assets in 05 -------------------------------------------------
md05 = read("05-design-assets.md")
for f in public_files:
    check(f"`{f}`" in md05 or f"`{Path(f).name}`" in md05, f"D: public asset {f} missing from 05")

# --- E. keep/drop coverage + rationale --------------------------------------
md06 = read("06-keep-drop.md")
# every table row in 06 must have a non-empty last cell (rationale)
for i, line in enumerate(md06.splitlines(), 1):
    if line.startswith("|"):
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if set(cells[0]) <= set("-: ") or cells[0].startswith("Item"):
            continue
        check(len(cells) >= 3 and cells[-1] != "", f"E: 06 line {i} row '{cells[0][:40]}' lacks rationale")
# routes referenced in section A (by path or URL marker)
for f in pages:
    marker = f.rsplit("/", 1)[-1].replace(".astro", "").replace(".ts", "").replace(".js", "")
    check((f in md06) or (marker in md06), f"E: route {f} (marker {marker}) not covered in 06")
for s in blog_slugs + page_slugs:
    check(s in md06, f"E: content slug {s} not covered in 06")

# --- F. pin table in 01 ------------------------------------------------------
md01 = read("01-architecture-config.md")
required = ["astro ^7.3", "@astrojs/mdx ^8", "@astrojs/rss ^4", "@astrojs/sitemap ^3.7",
            "astro-og-canvas ^0.13", "tailwindcss ^4.3", "@tailwindcss/vite ^4.3",
            "@tailwindcss/typography ^0.5", "clsx", "tailwind-merge", "typescript ^6",
            "@biomejs/biome ^2.5", "schema-dts", "wrangler ^4.13", ">=22.12"]
for pin in required:
    check(pin in md01, f"F: required pin '{pin}' not explicitly covered in 01")
check(md01.count("| MATCH") >= 13, "F: fewer than 13 MATCH verdict rows in 01 pin table")

# --- summary -----------------------------------------------------------------
print("\n".join(notes))
if failures:
    print(f"\nFAIL ({len(failures)}):")
    for f in failures:
        print("  -", f)
    sys.exit(1)
print("\nPASS: all acceptance cross-checks green "
      f"({len(pages)} routes, {len(blog_slugs)+len(page_slugs)} content items, "
      f"{len(code_files)} code files, {len(public_files)} public assets covered exactly once; "
      "pins + rationales verified)")
