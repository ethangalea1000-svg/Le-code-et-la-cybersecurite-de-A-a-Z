const { test, expect } = require("@playwright/test");

test("le thème suit le système puis mémorise le choix manuel", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/index.html");
  const toggle = page.locator("#azThemeToggle");
  await expect(toggle).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("azThemePreference"))).toBe("light");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("une réponse au quiz met à jour le résultat et la progression locale", async ({ page }) => {
  await page.goto("/quiz.html");
  const answers = page.locator("#answers button.answer");
  await expect(answers).toHaveCount(4);
  await expect(page.locator("#next")).toBeDisabled();

  await answers.first().click();
  await expect(page.locator("#result")).not.toBeEmpty();
  await expect(page.locator("#next")).toBeEnabled();

  await expect.poll(async () => {
    return page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem("quizAZProgressV3") || "null");
      return state && state.answered;
    });
  }).toBe(1);
  await expect(page.locator("#stats")).toContainText("Répondues : 1");
});
