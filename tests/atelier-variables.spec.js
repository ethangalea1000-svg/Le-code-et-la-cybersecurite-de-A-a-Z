const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const PAGE = "/cours/atelier-variables.html";

test.describe("atelier variables", () => {
  test("parcours complet : prévoir, modifier, écrire, bilan", async ({ page }) => {
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(PAGE);
    await expect(page.locator("h1")).toContainText("Une variable");

    // Étape 1 → 2
    await page.getByRole("button", { name: /Prévoir le résultat/ }).click();
    await expect(page.locator("#sceneTitle")).toContainText("Quelle valeur sera affichée");

    // Mauvaise réponse puis bonne réponse
    await page.getByRole("radio", { name: "Alex" }).check();
    await page.getByRole("button", { name: "Vérifier ma prévision" }).click();
    await expect(page.locator("#feedback")).toContainText("Reprends la deuxième ligne");
    await page.getByRole("radio", { name: "Lina" }).check();
    await page.getByRole("button", { name: "Vérifier ma prévision" }).click();
    await expect(page.locator("#feedback")).toContainText("résultat attendu est Lina");
    await page.getByRole("button", { name: /Essayer une modification/ }).click();

    // Étape 3 : modifier la valeur
    await page.getByRole("button", { name: "Vérifier ma modification" }).click();
    await expect(page.locator("#feedback")).toContainText("reste une modification à faire");
    await page.locator("#name").fill("Lina");
    await expect(page.locator("#expected")).toHaveText("Lina");
    await page.getByRole("button", { name: "Vérifier ma modification" }).click();
    await expect(page.locator("#feedback")).toContainText("La valeur a changé");
    await page.getByRole("button", { name: /Essayer avec un club/ }).click();

    // Étape 4 : écrire l'affectation, avec indice
    await page.locator("#hint summary").click();
    await expect(page.locator("#hint p")).toBeVisible();
    await page.locator("#line").fill('club = "Foot"');
    await page.getByRole("button", { name: "Vérifier cette ligne" }).click();
    await expect(page.locator("#feedback")).toContainText("pas encore la valeur");
    await page.locator("#line").fill("club = 'Échecs'");
    await page.getByRole("button", { name: "Vérifier cette ligne" }).click();
    await expect(page.locator("#feedback")).toContainText("correspond à la consigne");
    await page.getByRole("button", { name: /Voir le bilan/ }).click();

    // Bilan puis remise à zéro
    await expect(page.locator("#sceneTitle")).toContainText("Tu as fait varier une valeur");
    await page.getByRole("button", { name: /Recommencer/ }).click();
    await expect(page.locator("#sceneTitle")).toContainText("Un nom pour retrouver une valeur");
    expect(errors).toEqual([]);
  });

  test("validation refuse les entrées hors consigne et neutralise le HTML", async ({ page }) => {
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(PAGE);
    await page.getByRole("button", { name: /Prévoir le résultat/ }).click();
    await page.getByRole("radio", { name: "Lina" }).check();
    await page.getByRole("button", { name: "Vérifier ma prévision" }).click();
    await page.getByRole("button", { name: /Essayer une modification/ }).click();
    await page.locator("#name").fill('<img src=x onerror=alert(1)>');
    // maxlength=20 tronque la saisie ; le texte doit rester du texte, jamais du HTML interprété
    await expect(page.locator("#expected")).toHaveText('<img src=x onerror=a');
    expect(await page.locator("#expected img").count()).toBe(0);
    expect(await page.locator("#editedCode img").count()).toBe(0);
    await page.getByRole("button", { name: "Vérifier ma modification" }).click();
    await expect(page.locator("#feedback")).toContainText("prénom fictif simple");
    await page.locator("#name").fill("Lina");
    await page.getByRole("button", { name: "Vérifier ma modification" }).click();
    await page.getByRole("button", { name: /Essayer avec un club/ }).click();
    await page.locator("#line").fill('club = "Échecs"; alert(1)');
    await page.getByRole("button", { name: "Vérifier cette ligne" }).click();
    await expect(page.locator("#feedback")).toContainText("ne correspond pas encore à la consigne");
    expect(errors).toEqual([]);
  });

  test("navigation clavier complète au moins jusqu'à la première action", async ({ page }) => {
    await page.goto(PAGE);
    for (let i = 0; i < 20; i++) {
      const hit = await page.evaluate(() => {
        const el = document.activeElement;
        return el && el.tagName === "BUTTON" && /Prévoir le résultat/.test(el.textContent);
      });
      if (hit) break;
      await page.keyboard.press("Tab");
    }
    await page.keyboard.press("Enter");
    await expect(page.locator("#sceneTitle")).toContainText("Quelle valeur sera affichée");
  });

  for (const width of [320, 390, 1280]) {
    test(`pas de débordement horizontal à ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(PAGE);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
      await page.getByRole("button", { name: /Prévoir le résultat/ }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    });
  }

  test("accessibilité axe-core sur les états principaux", async ({ page }) => {
    const axePath = path.resolve(__dirname, "../node_modules/axe-core/axe.min.js");
    await page.goto(PAGE);
    await page.addScriptTag({ path: axePath });
    const run = () => page.evaluate(async () => {
      const r = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
      return r.violations.map(v => v.id);
    });
    expect(await run()).toEqual([]);
    await page.getByRole("button", { name: /Prévoir le résultat/ }).click();
    await page.getByRole("radio", { name: "Alex" }).check();
    await page.getByRole("button", { name: "Vérifier ma prévision" }).click();
    expect(await run()).toEqual([]);
  });

  test("la leçon 1 du cours Python propose l'atelier", async ({ page }) => {
    await page.addInitScript(() => { try {
      localStorage.setItem("azLessonTutorialSeen", "1");
      localStorage.setItem("azMentorV1", JSON.stringify({ name: "Alex", avatar: "🤖", color: "#5544cc", style: "calme" }));
      localStorage.setItem("azCookieConsentV1", JSON.stringify({ choice: "essential", date: "2026-11-20" }));
    } catch (e) {} });
    await page.route("**/courses-*.js*", async route => {
      const file = new URL(route.request().url()).pathname.split("/").pop();
      await route.fulfill({ path: file, contentType: "application/javascript" });
    });
    await page.goto("/cours/lecon.html?id=04&lesson=1");
    const link = page.locator(".beginner-guide .beginner-workshop a");
    await expect(link).toHaveAttribute("href", "atelier-variables.html");
    await link.click();
    await expect(page).toHaveURL(/atelier-variables\.html$/);
    await expect(page.locator("h1")).toContainText("Une variable");
  });
});
