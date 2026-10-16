"""Extract frontmatter + stats from legacy nhut-duong content files (read-only).

Emits JSON to scratch for the inventory report. Reference repo is never modified.
"""
import json
import re
import sys
from pathlib import Path

import os

REPO = Path(os.environ.get("LEGACY_REPO", "/opt/data/workspace/nhut-duong"))

try:
    import yaml  # type: ignore
    HAVE_YAML = True
except ImportError:
    HAVE_YAML = False


def parse_frontmatter(text: str):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not m:
        return {}, text
    raw = m.group(1)
    body = text[m.end():]
    if HAVE_YAML:
        try:
            return yaml.safe_load(raw) or {}, body
        except Exception as e:  # noqa: BLE001
            return {"_parse_error": str(e)}, body
    return {"_no_yaml_lib": raw}, body


def main() -> None:
    out = {"have_yaml": HAVE_YAML, "blog": [], "pages": []}
    for coll in ("blog", "pages"):
        base = REPO / "src" / "content" / coll
        files = sorted(base.glob("*.*"))
        for f in files:
            text = f.read_text(encoding="utf-8")
            fm, body = parse_frontmatter(text)
            words = len(re.findall(r"\S+", body))
            # structural probes
            headings = re.findall(r"^(#{2,3})\s+(.+)$", body, re.MULTILINE)
            has_code = "```" in body
            entry = {
                "file": f.relative_to(REPO).as_posix(),
                "slug": f.stem,
                "ext": f.suffix,
                "bytes": f.stat().st_size,
                "frontmatter": fm,
                "body_words": words,
                "h2_count": sum(1 for lvl, _ in headings if lvl == "##"),
                "h3_count": sum(1 for lvl, _ in headings if lvl == "###"),
                "first_headings": [t for _, t in headings[:6]],
                "has_code_blocks": has_code,
                "component_imports": sorted(set(re.findall(r"import\s+(\w+)", body))),
                "jsx_components_used": sorted(set(re.findall(r"<([A-Z]\w+)", body))),
            }
            out[coll].append(entry)
    dest = Path(__file__).resolve().parent / "content-inventory.json"
    dest.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"\nwrote {dest}", file=sys.stderr)


if __name__ == "__main__":
    main()
