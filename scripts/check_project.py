#!/usr/bin/env python3
"""Project-level SEO, sandbox, and contribution checks (stdlib only)."""
from html.parser import HTMLParser
from pathlib import Path
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://ethangalea1000-svg.github.io/Le-code-et-la-cybersecurite-de-A-a-Z/"
EXCLUDED = {"404.html", "admin.html", "offline.html", "cours/lecon.html"}

class Tags(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = []
        self.iframes = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "meta":
            self.meta.append(values)
        if tag == "iframe":
            self.iframes.append(values)

def main():
    errors = []
    html_files = sorted(p for p in ROOT.rglob("*.html") if p.relative_to(ROOT).as_posix() not in EXCLUDED)
    sitemap = ROOT / "sitemap.xml"
    try:
        root = ET.parse(sitemap).getroot()
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = {node.text for node in root.findall(".//s:loc", ns) if node.text}
    except (OSError, ET.ParseError) as exc:
        errors.append(f"sitemap.xml illisible : {exc}")
        urls = set()
    expected = {BASE + ("" if p.name == "index.html" and p.parent == ROOT else p.relative_to(ROOT).as_posix()) for p in html_files}
    missing = sorted(expected - urls)
    stale = sorted(urls - expected)
    if missing:
        errors.append("Pages publiques absentes du sitemap : " + ", ".join(u.removeprefix(BASE) or "/" for u in missing))
    if stale:
        errors.append("URL de sitemap sans page publique correspondante : " + ", ".join(stale))
    index = ROOT / "index.html"
    if index.exists():
        parser = Tags()
        parser.feed(index.read_text(encoding="utf-8"))
        if not any(m.get("property") == "og:title" for m in parser.meta):
            errors.append("index.html : métadonnée Open Graph og:title absente.")
        if not any(m.get("property") == "og:description" for m in parser.meta):
            errors.append("index.html : métadonnée Open Graph og:description absente.")
    atelier = ROOT / "atelier.html"
    if atelier.exists():
        parser = Tags()
        parser.feed(atelier.read_text(encoding="utf-8"))
        for frame in parser.iframes:
            sandbox = set((frame.get("sandbox") or "").split())
            if "allow-scripts" not in sandbox or "allow-same-origin" in sandbox:
                errors.append("atelier.html : l'aperçu doit utiliser sandbox=allow-scripts sans allow-same-origin.")
    for rel in (".github/ISSUE_TEMPLATE/bug_report.yml", ".github/ISSUE_TEMPLATE/feature_request.yml", ".github/PULL_REQUEST_TEMPLATE.md", "CONTRIBUTING.md"):
        if not (ROOT / rel).is_file():
            errors.append(f"Fichier de contribution manquant : {rel}")
    if errors:
        print("ÉCHEC — contrôles projet :")
        for err in errors:
            print(" - " + err)
        return 1
    print(f"OK — sitemap aligné sur {len(html_files)} pages publiques, Open Graph, aperçu sandbox et modèles de contribution validés.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
