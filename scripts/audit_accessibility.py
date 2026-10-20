#!/usr/bin/env python3
"""Report accessible-HTML checks across the static site; warnings do not block deployment."""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]

class PageAudit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = False
        self.title = False
        self.title_text = False
        self.in_title = False
        self.viewport = False
        self.description = False
        self.main = False
        self.skip_link = False
        self.images_without_alt = 0
        self.inputs_without_label = []
        self.labels_for = set()
        self.input_ids = set()
        self.ids = set()
        self.duplicate_ids = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = bool(a.get("lang"))
        elif tag == "title":
            self.title = True
            self.in_title = True
        elif tag == "meta":
            self.viewport |= a.get("name", "").lower() == "viewport"
            self.description |= a.get("name", "").lower() == "description" and bool(a.get("content", "").strip())
        elif tag == "main":
            self.main = True
        elif tag == "a" and "skip-link" in a.get("class", "").split():
            self.skip_link = True
        elif tag == "img":
            if "alt" not in a:
                self.images_without_alt += 1
        elif tag == "label" and a.get("for"):
            self.labels_for.add(a["for"])
        elif tag in {"input", "select", "textarea"} and a.get("id"):
            self.input_ids.add(a["id"])
        if a.get("id"):
            if a["id"] in self.ids:
                self.duplicate_ids.add(a["id"])
            self.ids.add(a["id"])
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, data):
        if self.in_title and data.strip():
            self.title_text = True

def main():
    pages = sorted(ROOT.rglob("*.html"))
    totals = Counter()
    examples = []
    for page in pages:
        audit = PageAudit()
        try:
            audit.feed(page.read_text(encoding="utf-8"))
        except (OSError, UnicodeError) as exc:
            totals["unreadable"] += 1
            examples.append(f"{page.relative_to(ROOT)}: lecture impossible ({exc})")
            continue
        rel = page.relative_to(ROOT).as_posix()
        checks = {
            "lang absent": audit.lang,
            "title absent/vide": audit.title and audit.title_text,
            "viewport absent": audit.viewport,
            "description absente": audit.description,
            "main absent": audit.main,
            "lien d'évitement absent": audit.skip_link,
        }
        for issue, ok in checks.items():
            if not ok:
                totals[issue] += 1
                if len(examples) < 80:
                    examples.append(f"{rel}: {issue}")
        if audit.images_without_alt:
            totals["images sans alt"] += audit.images_without_alt
            if len(examples) < 80:
                examples.append(f"{rel}: {audit.images_without_alt} image(s) sans attribut alt")
        if audit.duplicate_ids:
            totals["ID dupliqués"] += len(audit.duplicate_ids)
            if len(examples) < 80:
                examples.append(f"{rel}: ID dupliqués: {', '.join(sorted(audit.duplicate_ids))}")
        unlabeled = audit.input_ids - audit.labels_for
        if unlabeled:
            totals["champs potentiellement sans label"] += len(unlabeled)
            if len(examples) < 80:
                examples.append(f"{rel}: champs à vérifier: {', '.join(sorted(unlabeled))}")
    print(f"AUDIT ACCESSIBILITÉ — {len(pages)} pages HTML analysées.")
    if not totals:
        print("Aucun problème détecté par ces contrôles statiques ciblés.")
    else:
        print("Points à vérifier (signalements heuristiques, revue humaine nécessaire) :")
        for issue, count in sorted(totals.items()):
            print(f" - {issue}: {count}")
        for example in examples:
            print("   • " + example)
        if len(examples) >= 80:
            print("   • Affichage limité aux 80 premiers signalements.")
    print("Cet audit statique ne remplace pas un test au clavier, un lecteur d'écran ou une mesure WCAG de contraste.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
