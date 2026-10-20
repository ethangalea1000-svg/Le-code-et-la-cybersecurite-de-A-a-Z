/* Service worker GitHub Pages — cache borné au site, sans intercepter les API. */
const CACHE_NAME = "code-cyber-static-v10";
const BASE = "/Le-code-et-la-cybersecurite-de-A-a-Z/";
const PRECACHE = [
  "index.html", "offline.html", "style.css", "enhancements.css", "site.js", "learning-focus.js", "guided-challenges.js",
  "parcours.html", "cours.html", "projets.html", "quiz.html", "exercices.html",
  "progression.html", "atelier.html", "bibliotheque.html", "recherche.html",
  "laboratoire-python-sql.html", "retour.html",
  "ressources.html", "examens.html", "certificats.html",
  "cours/html.html", "cours/css.html", "cours/javascript.html", "cours/python.html",
  "cours/git-github.html", "cours/sql.html", "cours/reseaux.html", "cours/linux.html",
  "cours/cybersecurite.html", "cours/cryptographie.html", "cours/securite-web.html",
  "cours/osint.html", "cours/analyse-incidents.html", "cours/projet-final.html",
  "cours/course-page.js", "cours/course-page.css", "cours/mentor.css", "cours/mentor.js",
  "cours/project-curriculum.js", "cours/course-reference.js", "cours/course-reference-extra.js", "cours/course-practice.js",
  "data/quiz-bank.js", "directory.js", "project-metadata.js",
  "courses-01.js", "courses-02.js", "courses-03.js", "courses-04.js", "courses-05.js",
  "courses-06.js", "courses-07.js", "courses-08.js", "courses-09.js", "courses-10.js",
  "courses-11.js", "courses-12.js", "courses-13.js", "courses-14.js",
  "manifest.webmanifest", "icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(PRECACHE.map(async path => {
      try {
        const response = await fetch(BASE + path, { cache: "reload" });
        if (response.ok && response.type === "basic") {
          await cache.put(BASE + path, response);
        }
      } catch (_) { /* une ressource manquante ne doit pas empêcher l'installation */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("code-cyber-static-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes("/api/")) return;
  if (!url.pathname.startsWith(BASE)) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (_) {
        const cached = await caches.match(request);
        if (cached) return cached;
        const offline = await caches.match(BASE + "offline.html");
        return offline || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === "basic") {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
