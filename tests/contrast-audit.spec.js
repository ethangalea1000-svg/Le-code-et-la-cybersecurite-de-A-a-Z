const { test, expect } = require("@playwright/test");

const pages = [
  "/index.html", "/cours.html", "/parcours.html", "/projets.html",
  "/quiz.html", "/progression.html", "/cours/html.html",
  "/cours/css.html", "/cours/cybersecurite.html",
  "/exercices.html", "/atelier.html", "/bibliotheque.html", "/recherche.html",
  "/ressources.html", "/examens.html", "/certificats.html",
  "/cours/javascript.html", "/cours/python.html", "/cours/git-github.html",
  "/cours/sql.html", "/cours/reseaux.html", "/cours/linux.html",
  "/cours/cryptographie.html", "/cours/securite-web.html", "/cours/osint.html",
  "/cours/analyse-incidents.html", "/cours/lecon.html", "/simulateur-chmod.html",
  "/laboratoire-python-sql.html"
];

test("le texte visible des composants principaux respecte le contraste WCAG", async ({ page }) => {
  const failures = [];
  for (const path of pages) {
    await page.goto(path);
    const samples = page.locator("header nav a, main h1, main h2, main p, main .btn, main button");
    const count = await samples.count();
    for (let i = 0; i < Math.min(count, 80); i++) {
      const el = samples.nth(i);
      const result = await el.evaluate(node => {
        if (!node.getClientRects().length) return null;
        const fg = getComputedStyle(node).color;
        const parse = value => {
          const m = value.match(/[0-9.]+/g);
          if (!m || m.length < 3) return null;
          return [Number(m[0]), Number(m[1]), Number(m[2]), m.length > 3 ? Number(m[3]) : 1];
        };
        const foreground = parse(fg);
        if (!foreground) return null;
        let ancestor = node;
        let background = null;
        while (ancestor) {
          const style = getComputedStyle(ancestor);
          if (style.backgroundImage && style.backgroundImage !== "none") return null;
          const color = parse(style.backgroundColor);
          if (color && color[3] >= 0.99) { background = color; break; }
          ancestor = ancestor.parentElement;
        }
        if (!background) return null;
        const linear = value => {
          value /= 255;
          return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };
        const luminance = color => 0.2126 * linear(color[0]) + 0.7152 * linear(color[1]) + 0.0722 * linear(color[2]);
        const a = luminance(foreground), b = luminance(background);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        const size = parseFloat(getComputedStyle(node).fontSize);
        const weight = Number(getComputedStyle(node).fontWeight) || 400;
        const large = size >= 24 || (size >= 18.66 && weight >= 700);
        return { text: (node.innerText || node.getAttribute("aria-label") || "").trim().slice(0, 90), fg, bg: styleColor(background), ratio: Number(ratio.toFixed(2)), threshold: large ? 3 : 4.5 };
        function styleColor(c) { return "rgb(" + c.slice(0, 3).join(", ") + ")"; }
      });
      if (result && result.ratio + 0.001 < result.threshold) {
        failures.push({ path, ...result });
      }
    }
  }
  expect(failures, "Contrastes calculés depuis les styles rendus : " + JSON.stringify(failures, null, 2)).toEqual([]);
});


test("la navigation a des noms accessibles et un focus clavier visible", async ({ page }) => {
  const failures = [];
  for (const path of pages) {
    await page.goto(path);
    const links = page.locator("header nav a:visible");
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const name = (await links.nth(i).innerText()).trim();
      if (!name) failures.push({ path, issue: "Lien de navigation sans nom visible", index: i });
    }
    let found = false;
    for (let i = 0; i < 24; i++) {
      if (await page.evaluate(() => document.activeElement?.matches("header nav a:focus-visible") || false)) { found = true; break; }
      await page.keyboard.press("Tab");
    }
    if (!found) {
      failures.push({ path, issue: "Aucun lien de navigation atteignable avec un focus clavier visible" });
      continue;
    }
    const focus = await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement);
      return { outlineStyle: s.outlineStyle, outlineWidth: s.outlineWidth, outlineColor: s.outlineColor, boxShadow: s.boxShadow };
    });
    const visibleOutline = focus.outlineStyle !== "none" && parseFloat(focus.outlineWidth) >= 2;
    const visibleShadow = focus.boxShadow !== "none";
    if (!visibleOutline && !visibleShadow) failures.push({ path, issue: "Indicateur de focus absent ou trop discret", focus });
  }
  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});
