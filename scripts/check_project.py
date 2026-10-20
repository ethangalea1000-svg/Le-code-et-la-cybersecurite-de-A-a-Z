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

class TagsWithLinks(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "link":
            self.links.append(values)

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
        if not any(m.get("property") == "og:image" for m in parser.meta):
            errors.append("index.html : métadonnée Open Graph og:image absente.")
        if not any(m.get("name") == "twitter:image" for m in parser.meta):
            errors.append("index.html : métadonnée twitter:image absente.")
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
    # Contrôles PWA, SEO et accessibilité de base, sans dépendance externe.
    manifest_path = ROOT / "manifest.webmanifest"
    manifest = {}
    try:
        import json
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        if not isinstance(manifest, dict):
            raise ValueError("la racine doit être un objet JSON")
    except (OSError, UnicodeError, ValueError) as exc:
        errors.append(f"manifest.webmanifest invalide : {exc}")
    else:
        for field in ("name", "short_name", "description", "lang", "start_url", "scope", "display", "background_color", "theme_color"):
            if not isinstance(manifest.get(field), str) or not manifest[field].strip():
                errors.append(f"manifest.webmanifest : champ {field} manquant ou vide.")
        if manifest.get("lang") != "fr-FR":
            errors.append("manifest.webmanifest : lang doit rester fr-FR.")
        if manifest.get("display") not in {"standalone", "minimal-ui", "fullscreen"}:
            errors.append("manifest.webmanifest : mode d'affichage PWA non adapté.")
        if not str(manifest.get("start_url", "")).startswith(BASE):
            errors.append("manifest.webmanifest : start_url doit rester dans le sous-chemin GitHub Pages.")
        if not str(manifest.get("scope", "")).startswith(BASE):
            errors.append("manifest.webmanifest : scope doit rester dans le sous-chemin GitHub Pages.")
        icons = manifest.get("icons")
        if not isinstance(icons, list) or not icons:
            errors.append("manifest.webmanifest : au moins une icône est requise.")
        else:
            for icon in icons:
                if not isinstance(icon, dict) or not icon.get("src"):
                    errors.append("manifest.webmanifest : entrée d'icône sans src.")
                elif not (ROOT / str(icon["src"]).lstrip("/")).is_file():
                    errors.append(f"manifest.webmanifest : icône introuvable ({icon['src']}).")

    robots_path = ROOT / "robots.txt"
    try:
        robots = robots_path.read_text(encoding="utf-8")
        if "User-agent:" not in robots:
            errors.append("robots.txt : directive User-agent absente.")
        if BASE + "sitemap.xml" not in robots:
            errors.append("robots.txt : URL absolue du sitemap absente ou incorrecte.")
    except (OSError, UnicodeError) as exc:
        errors.append(f"robots.txt illisible : {exc}")

    if len(urls) != len([node for node in root.findall(".//s:loc", ns) if node.text]) if 'root' in locals() and 'ns' in locals() else False:
        errors.append("sitemap.xml : des URL sont dupliquées.")

    if index.exists():
        try:
            source = index.read_text(encoding="utf-8")
            if '<html lang="fr">' not in source.lower() and '<html lang="fr-fr">' not in source.lower():
                errors.append("index.html : attribut lang français absent.")
            if not any(m.get("name") == "description" and len(m.get("content", "").strip()) >= 50 for m in parser.meta):
                errors.append("index.html : description SEO absente ou trop courte.")
            if not any(m.get("name") == "viewport" for m in parser.meta):
                errors.append("index.html : métadonnée viewport absente.")
            if not any(m.get("charset") for m in parser.meta):
                errors.append("index.html : encodage charset absent.")
            if not any(m.get("name") == "author" for m in parser.meta):
                errors.append("index.html : auteur absent.")
            if not any(m.get("name") == "twitter:card" for m in parser.meta):
                errors.append("index.html : type de carte Twitter absent.")
            if not any(m.get("name") == "twitter:title" for m in parser.meta):
                errors.append("index.html : titre Twitter absent.")
            if not any(m.get("name") == "twitter:description" for m in parser.meta):
                errors.append("index.html : description Twitter absente.")
            if not any(m.get("name") == "twitter:url" for m in parser.meta):
                errors.append("index.html : URL Twitter absente.")
            if not any(m.get("rel") == "canonical" for m in TagsWithLinks(source).links):
                errors.append("index.html : URL canonique absente.")
        except (OSError, UnicodeError) as exc:
            errors.append(f"index.html illisible : {exc}")

    offline = ROOT / "offline.html"
    if offline.exists():
        try:
            offline_source = offline.read_text(encoding="utf-8")
            for href in ('href="cours.html"', 'href="parcours.html"', 'href="quiz.html"'):
                if href not in offline_source:
                    errors.append(f"offline.html : lien de secours absent ({href}).")
            if "<h1>" not in offline_source:
                errors.append("offline.html : titre principal absent.")
        except (OSError, UnicodeError) as exc:
            errors.append(f"offline.html illisible : {exc}")

    sw_path = ROOT / "sw.js"
    try:
        sw_source = sw_path.read_text(encoding="utf-8")
        if "const CACHE_NAME = " not in sw_source:
            errors.append("sw.js : version de cache nommée absente.")
        if "const BASE = " not in sw_source:
            errors.append("sw.js : périmètre de cache explicite absent.")
        if '"/api/' in sw_source or "'/api/" in sw_source:
            errors.append("sw.js : ne pas mettre les routes API dans le précache statique.")
    except (OSError, UnicodeError) as exc:
        errors.append(f"sw.js illisible : {exc}")

    if errors:
        print("ÉCHEC — contrôles projet :")
        for err in errors:
            print(" - " + err)
        return 1
    print(f"OK — sitemap aligné sur {len(html_files)} pages publiques, Open Graph, aperçu sandbox et modèles de contribution validés.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
