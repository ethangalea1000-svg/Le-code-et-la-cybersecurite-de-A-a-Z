#!/usr/bin/env python3
"""Lightweight static-site checks using only Python's standard library."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
IGNORED_SCHEMES = {"http", "https", "mailto", "tel", "javascript", "data", "blob"}

class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.assets = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        for attr in ("href", "src", "poster"):
            value = values.get(attr)
            if value:
                self.assets.append((tag, attr, value.strip()))

def main():
    errors = []
    html_files = sorted(ROOT.rglob("*.html"))
    if not html_files:
        errors.append("Aucun fichier HTML trouvé.")
    for html_file in html_files:
        parser = AssetParser()
        try:
            parser.feed(html_file.read_text(encoding="utf-8"))
        except (OSError, UnicodeError) as exc:
            errors.append(f"{html_file.relative_to(ROOT)}: lecture impossible ({exc})")
            continue
        for tag, attr, raw in parser.assets:
            if not raw or raw.startswith("#") or raw.startswith("//"):
                continue
            parsed = urlsplit(raw)
            if parsed.scheme.lower() in IGNORED_SCHEMES or parsed.netloc:
                continue
            path = parsed.path
            if not path:
                continue
            # Site is deployed below a GitHub Pages project prefix; root-relative
            # paths are resolved against the repository root for this check.
            target = (ROOT / path.lstrip("/")) if path.startswith("/") else (html_file.parent / path)
            target = target.resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                errors.append(f"{html_file.relative_to(ROOT)}: chemin sortant du dépôt: {raw}")
                continue
            if not target.exists():
                errors.append(f"{html_file.relative_to(ROOT)}: {attr} local introuvable: {raw}")
    if errors:
        print("ÉCHEC — références locales invalides :")
        for error in errors:
            print(f" - {error}")
        return 1
    print(f"OK — {len(html_files)} fichiers HTML analysés, références locales présentes.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
