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
        self.ids = set()
        self.fragments = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        for attr in ("href", "src", "poster"):
            value = values.get(attr)
            if value:
                self.assets.append((tag, attr, value.strip()))
                if attr == "href" and tag == "a":
                    parsed = urlsplit(value.strip())
                    if parsed.fragment and parsed.scheme.lower() not in IGNORED_SCHEMES and not parsed.netloc:
                        self.fragments.append((value.strip(), parsed.path, parsed.fragment))

def main():
    errors = []
    html_files = sorted(ROOT.rglob("*.html"))
    if not html_files:
        errors.append("Aucun fichier HTML trouvé.")
    parsed_pages = {}
    for html_file in html_files:
        parser = AssetParser()
        try:
            parser.feed(html_file.read_text(encoding="utf-8"))
        except (OSError, UnicodeError) as exc:
            errors.append(f"{html_file.relative_to(ROOT)}: lecture impossible ({exc})")
            continue
        parsed_pages[html_file.resolve()] = (parser.ids, parser.fragments)
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
    # IDs injected by client-side scripts count as valid only when an explicit
    # id assignment or HTML id attribute is present in a local JavaScript file.
    import re
    dynamic_ids = set()
    for js_file in ROOT.rglob("*.js"):
        try:
            source = js_file.read_text(encoding="utf-8")
        except (OSError, UnicodeError):
            continue
        dynamic_ids.update(re.findall(r"""[.]id[ ]*=[ ]*["']([^"']+)["']""", source))
        dynamic_ids.update(re.findall(r"""id=["']([^"']+)["']""", source))
    for html_file in html_files:
        entry = parsed_pages.get(html_file.resolve())
        if not entry:
            continue
        _, fragments = entry
        for raw, path, fragment in fragments:
            target = (html_file.parent / path).resolve() if path else html_file.resolve()
            if not target.exists() or target.suffix.lower() != ".html":
                continue
            target_entry = parsed_pages.get(target)
            if target_entry and fragment not in target_entry[0] and fragment not in dynamic_ids:
                errors.append(f"{html_file.relative_to(ROOT)}: ancre locale introuvable: {raw}")
    if errors:
        print("ÉCHEC — références locales invalides :")
        for error in errors:
            print(f" - {error}")
        return 1
    print(f"OK — {len(html_files)} fichiers HTML analysés, références locales présentes.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
