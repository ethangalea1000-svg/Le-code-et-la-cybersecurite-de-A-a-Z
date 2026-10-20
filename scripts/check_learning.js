"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);

for (let i = 1; i <= 14; i++) {
  const file = path.join(root, "courses-" + String(i).padStart(2, "0") + ".js");
  assert.ok(fs.existsSync(file), "Cours source manquant : " + path.relative(root, file));
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
}
assert.equal(Object.keys(sandbox.window.courseData || {}).length, 14, "Les 14 cours doivent charger leurs données.");
for (const [id, course] of Object.entries(sandbox.window.courseData)) {
  assert.ok(course.title, "Titre absent pour le cours " + id);
  assert.ok(Array.isArray(course.sections) && course.sections.length >= 3, "Contenu insuffisant pour le cours " + id);
  for (const [index, section] of course.sections.entries()) {
    assert.ok(Array.isArray(section) && section.length >= 2, "Leçon mal formée : cours " + id + ", leçon " + (index + 1));
    assert.ok(String(section[0]).trim() && String(section[1]).trim(), "Leçon vide : cours " + id + ", leçon " + (index + 1));
  }
}

const practicePath = path.join(root, "cours", "course-practice.js");
vm.runInContext(fs.readFileSync(practicePath, "utf8"), sandbox, { filename: practicePath });
const practice = sandbox.window.coursePractice;
assert.ok(practice, "Banque de missions pratiques absente.");
assert.equal(Object.keys(practice).length, 14, "Chaque cours doit avoir des missions pratiques.");
let missionCount = 0;
for (const [id, course] of Object.entries(practice)) {
  assert.ok(course.title, "Titre des missions absent pour le cours " + id);
  assert.ok(Array.isArray(course.missions) && course.missions.length >= 3, "Il faut au moins trois missions pour le cours " + id);
  for (const [index, mission] of course.missions.entries()) {
    missionCount++;
    assert.ok(mission.q && mission.why, "Question ou explication absente : " + id + "/" + (index + 1));
    assert.ok(Array.isArray(mission.options) && mission.options.length >= 2, "Choix manquants : " + id + "/" + (index + 1));
    assert.ok(Number.isInteger(mission.answer) && mission.answer >= 0 && mission.answer < mission.options.length, "Réponse correcte invalide : " + id + "/" + (index + 1));
    assert.equal(new Set(mission.options).size, mission.options.length, "Choix en double : " + id + "/" + (index + 1));
  }
}
assert.ok(missionCount >= 42, "La banque doit proposer au moins 42 missions.");

const quizPath = path.join(root, "data", "quiz-bank.js");
const quizSource = fs.readFileSync(quizPath, "utf8");
const seedStart = quizSource.indexOf("window.quizSeeds=");
const seedArrayStart = quizSource.indexOf("[", seedStart);
const seedArrayEnd = quizSource.lastIndexOf("];");
assert.ok(seedStart >= 0 && seedArrayStart > seedStart && seedArrayEnd > seedArrayStart, "La banque de quiz doit exposer un tableau de notions.");
const seeds = JSON.parse(quizSource.slice(seedArrayStart, seedArrayEnd + 1));
assert.ok(Array.isArray(seeds) && seeds.length >= 100, "La banque de quiz doit contenir au moins 100 notions.");
for (const [index, seed] of seeds.entries()) {
  assert.ok(seed.title && seed.body, "Notion de quiz incomplète : " + index);
  assert.ok(sandbox.window.courseData[seed.course], "Cours inconnu dans la banque de quiz : " + seed.course);
}
const quizHtml = fs.readFileSync(path.join(root, "quiz.html"), "utf8");
assert.ok(quizHtml.includes("explanation:s.body"), "Les quiz doivent associer les explications au contenu des cours.");
assert.ok(quizHtml.includes("function shuffle(a)"), "La fonction de mélange des réponses doit être présente.");
assert.ok(quizHtml.includes('role="status" aria-live="polite"'), "Le retour du quiz doit être annoncé aux technologies d'assistance.");

const coursePage = fs.readFileSync(path.join(root, "cours", "course-page.js"), "utf8");
for (const asset of ["project-curriculum.js", "course-reference.js", "course-reference-extra.js", "course-practice.js"]) {
  assert.ok(fs.existsSync(path.join(root, "cours", asset)), "Ressource dynamique de cours absente : " + asset);
  assert.ok(coursePage.includes(asset), "Ressource de cours non chargée : " + asset);
}
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");
for (const asset of ["cours/project-curriculum.js", "cours/course-reference.js", "cours/course-reference-extra.js", "cours/course-practice.js", "data/quiz-bank.js"]) {
  assert.ok(serviceWorker.includes('"' + asset + '"'), "Ressource pédagogique absente du cache hors ligne : " + asset);
}
assert.ok(serviceWorker.includes('const CACHE_NAME = "code-cyber-static-v8"'), "La version du cache hors ligne doit être mise à jour.");
assert.ok(serviceWorker.includes('if (url.pathname.includes("/api/")) return;'), "Le service worker ne doit pas intercepter les API.");
const sharedUx = fs.readFileSync(path.join(root, "site.js"), "utf8");
assert.ok(sharedUx.includes("azThemePreference"), "Le choix du thème doit être mémorisé.");
assert.ok(sharedUx.includes("prefers-color-scheme: dark"), "Le thème système doit être détecté.");
assert.ok(sharedUx.includes("azReadingProgress"), "La progression de lecture doit être présente.");
assert.ok(sharedUx.includes('hint.rel="prefetch"'), "Le préchargement des pages internes doit être présent.");
assert.ok(sharedUx.includes('initiallyVisible?"eager":"lazy"'), "Les images visibles au premier affichage ne doivent pas être différées.");
assert.ok(sharedUx.includes("AZ.exportProgress"), "L'export de progression doit être disponible.");
assert.ok(sharedUx.includes("AZ.importProgress"), "L'import de progression doit être disponible.");

console.log("OK — 14 cours, " + Object.values(sandbox.window.courseData).reduce((n, c) => n + c.sections.length, 0) + " leçons, " + missionCount + " missions et " + seeds.length + " notions de quiz validés.");
