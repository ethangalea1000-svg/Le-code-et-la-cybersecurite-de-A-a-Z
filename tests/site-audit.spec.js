const { test, expect } = require("@playwright/test");

const pages = [
  "/index.html", "/parcours.html", "/cours.html", "/projets.html", "/quiz.html",
  "/exercices.html", "/progression.html", "/atelier.html", "/bibliotheque.html",
  "/recherche.html", "/ressources.html", "/examens.html", "/certificats.html",
  "/cours/html.html", "/cours/css.html", "/cours/javascript.html", "/cours/python.html",
  "/cours/git-github.html", "/cours/sql.html", "/cours/reseaux.html", "/cours/linux.html",
  "/cours/cybersecurite.html", "/cours/cryptographie.html", "/cours/securite-web.html",
  "/cours/osint.html", "/cours/analyse-incidents.html", "/cours/projet-final.html",
  "/cours/lecon.html", "/simulateur-chmod.html", "/laboratoire-python-sql.html"
];

test("les pages principales ne déclenchent pas d'exception JavaScript non interceptée", async ({ page }) => {
  const failures = [];
  page.on("pageerror", error => failures.push({ url: page.url(), message: error.message }));
  for (const path of pages) {
    const response = await page.goto(path);
    expect(response && response.ok(), path + " doit répondre avec un statut HTTP réussi").toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
  }
  expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
});

test("les liens d'évitement des cours fonctionnent au clavier", async ({ page }) => {
  const courses = [
    "/cours/html.html", "/cours/css.html", "/cours/javascript.html", "/cours/python.html",
    "/cours/git-github.html", "/cours/sql.html", "/cours/reseaux.html", "/cours/linux.html",
    "/cours/cybersecurite.html", "/cours/cryptographie.html", "/cours/securite-web.html",
    "/cours/osint.html", "/cours/analyse-incidents.html", "/cours/projet-final.html"
  ];
  for (const path of courses) {
    await page.goto(path);
    const skip = page.locator("a.skip-link");
    await expect(skip).toHaveCount(1);
    let found = false;
    for (let i = 0; i < 30; i++) {
      const isSkip = await page.evaluate(() => document.activeElement?.matches("a.skip-link") || false);
      if (isSkip) { found = true; break; }
      await page.keyboard.press("Tab");
    }
    expect(found, path + " : le lien d'évitement doit être atteignable avec Tab").toBeTruthy();
    const target = await skip.getAttribute("href");
    expect(target, path + " : cible du lien d'évitement absente").toBeTruthy();
    await page.keyboard.press("Enter");
    const focused = await page.evaluate(() => document.activeElement?.id || "");
    expect(focused, path + " : Enter doit transférer le focus vers la cible").toBe(target.slice(1));
  }
});
