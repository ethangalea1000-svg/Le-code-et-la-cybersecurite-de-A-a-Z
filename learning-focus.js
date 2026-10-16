(function () {
  "use strict";
  const grid = document.querySelector(".project-directory");
  if (!grid || document.querySelector("#azFocusPanel")) return;

  const KEY = "azFocusSessionsV1";
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const getSessions = () => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(value)) return [];
      return value.filter(item => item && typeof item === "object" &&
        typeof item.finishedAt === "string" && Number.isFinite(Number(item.minutes)) &&
        Number(item.minutes) >= 1).slice(-100);
    } catch (_) { return []; }
  };
  const mondayStart = (date) => {
    const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
    result.setHours(0, 0, 0, 0);
    return result;
  };
  const formatTime = (seconds) => {
    const safe = Math.max(0, Math.ceil(seconds));
    return String(Math.floor(safe / 60)).padStart(2, "0") + ":" + String(safe % 60).padStart(2, "0");
  };
  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date inconnue";
    return new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" }).format(date);
  };

  const style = document.createElement("style");
  style.textContent = `
    .az-focus-panel{margin:24px 0;padding:clamp(18px,3vw,28px);border:1px solid #315044;border-radius:18px;background:radial-gradient(ellipse at 100% 0%,#15382b 0,transparent 45%),#0c151b;color:#f0f6f4;box-shadow:0 18px 44px #0002}
    .az-focus-panel *{box-sizing:border-box}.az-focus-kicker{margin:0 0 8px;color:#7fe9b6;font:700 11px/1.5 ui-monospace,monospace;letter-spacing:.12em}
    .az-focus-head{display:flex;justify-content:space-between;align-items:start;gap:18px;flex-wrap:wrap}.az-focus-head h2{margin:0;color:#f4faf7;font-size:clamp(22px,3vw,30px);line-height:1.15}.az-focus-head p{max-width:620px;margin:9px 0 0;color:#c0d0ca;line-height:1.65}
    .az-focus-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(210px,.72fr);gap:18px;margin-top:22px}.az-focus-controls,.az-focus-summary{min-width:0;padding:17px;border:1px solid #2a4039;border-radius:12px;background:#0a1116}
    .az-focus-controls label{display:block;margin:0 0 7px;color:#c8d8d1;font-size:13px;font-weight:700}.az-focus-controls select{display:block;width:100%;min-width:0;margin:0 0 14px;padding:11px 12px;border:1px solid #53685f;border-radius:8px;background:#101e22;color:#f5fbf8;font:inherit}
    .az-focus-clock{margin:8px 0 12px;color:#f5fbf8;font:800 clamp(38px,6vw,58px)/1 ui-monospace,monospace;font-variant-numeric:tabular-nums;letter-spacing:-.06em}
    .az-focus-status{min-height:24px;margin:0 0 12px;color:#b9cbc4;font-size:13px;line-height:1.5}.az-focus-actions{display:flex;flex-wrap:wrap;gap:8px}
    .az-focus-actions button{min-height:42px;padding:10px 13px;border:1px solid #50665d;border-radius:8px;background:#172722;color:#f5fbf8;font:700 13px/1.3 system-ui,sans-serif;cursor:pointer}
    .az-focus-actions button.primary{border-color:#75e7ae;background:#75e7ae;color:#092016}.az-focus-actions button:disabled{opacity:.48;cursor:not-allowed}
    .az-focus-actions button:focus-visible,.az-focus-controls select:focus-visible{outline:3px solid #a3f5ca;outline-offset:3px}
    .az-focus-summary h3{margin:0 0 13px;color:#f5fbf8;font-size:16px}.az-focus-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .az-focus-stat{padding:12px;border:1px solid #293b35;border-radius:9px;background:#101b1c}.az-focus-stat strong{display:block;color:#8ff0bb;font-size:24px;line-height:1.2;font-variant-numeric:tabular-nums}.az-focus-stat span{display:block;margin-top:5px;color:#c0d0ca;font-size:11px;line-height:1.4}
    .az-focus-recent{margin:16px 0 0;padding:0;list-style:none}.az-focus-recent li{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid #24352f;color:#c4d2cc;font-size:12px;line-height:1.45}.az-focus-recent li span:last-child{flex-shrink:0;color:#8ff0bb;font-variant-numeric:tabular-nums}.az-focus-empty{color:#b3c5bd;font-size:12px;line-height:1.6}
    @media(max-width:760px){.az-focus-layout{grid-template-columns:1fr}.az-focus-clock{font-size:48px}}@media(prefers-reduced-motion:reduce){.az-focus-panel *{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
  `;
  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.className = "az-focus-panel";
  panel.id = "azFocusPanel";
  panel.setAttribute("aria-labelledby", "azFocusTitle");
  panel.innerHTML = `
    <p class="az-focus-kicker">MODE FOCUS · SÉANCES LOCALES</p>
    <div class="az-focus-head"><div><h2 id="azFocusTitle">Une étape à la fois.</h2><p>Choisis un projet, lance une séance et reprends quand tu veux. Tes séances sont enregistrées uniquement dans le stockage local de ce navigateur ; aucun compte n’est nécessaire.</p></div></div>
    <div class="az-focus-layout">
      <div class="az-focus-controls">
        <label for="azFocusProject">Projet à travailler</label><select id="azFocusProject"></select>
        <label for="azFocusDuration">Durée de la séance</label><select id="azFocusDuration"><option value="15">15 minutes</option><option value="25" selected>25 minutes</option><option value="45">45 minutes</option></select>
        <div class="az-focus-clock" id="azFocusClock" aria-label="Temps restant">25:00</div>
        <p class="az-focus-status" id="azFocusStatus" role="status" aria-live="polite">Prêt quand tu l’es. Tu peux faire une pause à tout moment.</p>
        <div class="az-focus-actions"><button type="button" class="primary" id="azFocusStart">Démarrer</button><button type="button" id="azFocusPause" disabled>Mettre en pause</button><button type="button" id="azFocusFinish" disabled>Terminer et enregistrer</button></div>
      </div>
      <aside class="az-focus-summary" aria-labelledby="azFocusStatsTitle"><h3 id="azFocusStatsTitle">Cette semaine</h3><div class="az-focus-stats"><div class="az-focus-stat"><strong id="azFocusMinutes">0</strong><span>minutes enregistrées</span></div><div class="az-focus-stat"><strong id="azFocusCount">0</strong><span>séances terminées</span></div></div><h3 style="margin-top:18px">Activité récente</h3><ul class="az-focus-recent" id="azFocusRecent"></ul></aside>
    </div>`;
  grid.parentNode.insertBefore(panel, grid);

  const $ = id => document.getElementById(id);
  const projectSelect = $("azFocusProject");
  const durationSelect = $("azFocusDuration");
  const clock = $("azFocusClock");
  const status = $("azFocusStatus");
  const startButton = $("azFocusStart");
  const pauseButton = $("azFocusPause");
  const finishButton = $("azFocusFinish");
  let durationSeconds = Number(durationSelect.value) * 60;
  let remainingSeconds = durationSeconds;
  let sessionStartedAt = 0;
  let elapsedBeforePause = 0;
  let running = false;
  let paused = false;
  let timerId = null;

  [...grid.querySelectorAll(".project-card-integrated")].forEach((card, index) => {
    const title = card.querySelector("p")?.textContent?.trim() || "Projet " + (index + 1);
    const option = document.createElement("option");
    option.value = title;
    option.textContent = String(index + 1).padStart(2, "0") + " · " + title;
    projectSelect.appendChild(option);
  });

  function getElapsedSeconds() {
    if (!running) return Math.max(0, elapsedBeforePause);
    return Math.max(0, elapsedBeforePause + (Date.now() - sessionStartedAt) / 1000);
  }
  function setControls() {
    startButton.disabled = running && !paused;
    startButton.textContent = running && paused ? "Reprendre" : running ? "Séance en cours" : "Démarrer";
    pauseButton.disabled = !running || paused;
    finishButton.disabled = !running && !paused;
    projectSelect.disabled = running;
    durationSelect.disabled = running;
  }
  function updateClock() {
    if (running && !paused) {
      remainingSeconds = Math.max(0, durationSeconds - getElapsedSeconds());
      clock.textContent = formatTime(remainingSeconds);
      clock.setAttribute("aria-label", Math.ceil(remainingSeconds) + " secondes restantes");
      if (remainingSeconds <= 0) {
        saveSession(true);
        return;
      }
    } else {
      clock.textContent = formatTime(remainingSeconds);
      clock.setAttribute("aria-label", Math.ceil(remainingSeconds) + " secondes restantes");
    }
  }
  function refreshStats() {
    const sessions = getSessions();
    const monday = mondayStart(new Date()).getTime();
    const thisWeek = sessions.filter(item => {
      const time = new Date(item.finishedAt).getTime();
      return Number.isFinite(time) && time >= monday;
    });
    $("azFocusMinutes").textContent = String(thisWeek.reduce((sum, item) => sum + Number(item.minutes), 0));
    $("azFocusCount").textContent = String(thisWeek.length);
    const recent = $("azFocusRecent");
    recent.replaceChildren();
    if (!sessions.length) {
      const li = document.createElement("li");
      li.className = "az-focus-empty";
      li.textContent = "Tes premières séances apparaîtront ici après leur enregistrement.";
      recent.appendChild(li);
      return;
    }
    sessions.slice(-4).reverse().forEach(item => {
      const li = document.createElement("li");
      const label = document.createElement("span");
      const minutes = document.createElement("span");
      label.textContent = String(item.project) + " · " + formatDate(item.finishedAt);
      minutes.textContent = Number(item.minutes) + " min";
      li.append(label, minutes);
      recent.appendChild(li);
    });
  }
  function saveSession(completed) {
    if (!running && !paused) return;
    const elapsed = completed ? durationSeconds : Math.min(durationSeconds, running ? getElapsedSeconds() : elapsedBeforePause);
    const minutes = completed ? Math.round(durationSeconds / 60) : Math.floor(elapsed / 60);
    clearInterval(timerId);
    timerId = null;
    running = false;
    paused = false;
    elapsedBeforePause = 0;
    sessionStartedAt = 0;
    remainingSeconds = completed ? 0 : durationSeconds - elapsed;
    if (minutes >= 1) {
      const sessions = getSessions();
      sessions.push({
        project: projectSelect.value || "Projet libre",
        minutes: clamp(minutes, 1, 45),
        finishedAt: new Date().toISOString(),
        completed: Boolean(completed)
      });
      try {
        localStorage.setItem(KEY, JSON.stringify(sessions.slice(-100)));
        status.textContent = completed
          ? "Séance terminée : " + minutes + " minutes enregistrées sur cet appareil."
          : "Séance enregistrée : " + minutes + " minute" + (minutes > 1 ? "s" : "") + ". Tu pourras reprendre plus tard.";
      } catch (_) {
        status.textContent = "Séance terminée, mais le navigateur n’a pas pu l’enregistrer. Vérifie le stockage local.";
      }
    } else {
      status.textContent = "Séance arrêtée avant une minute : rien n’a été ajouté aux statistiques.";
    }
    updateClock();
    setControls();
    refreshStats();
  }
  startButton.addEventListener("click", () => {
    if (running && paused) {
      sessionStartedAt = Date.now();
      running = true;
      paused = false;
      status.textContent = "Séance reprise. Concentre-toi sur une petite étape à la fois.";
      timerId = window.setInterval(updateClock, 250);
      setControls();
      return;
    }
    if (running) return;
    durationSeconds = Number(durationSelect.value) * 60;
    remainingSeconds = durationSeconds;
    elapsedBeforePause = 0;
    sessionStartedAt = Date.now();
    running = true;
    paused = false;
    status.textContent = "Séance lancée pour « " + projectSelect.value + " ». Tu peux mettre en pause ou terminer quand tu veux.";
    timerId = window.setInterval(updateClock, 250);
    setControls();
    updateClock();
  });
  pauseButton.addEventListener("click", () => {
    if (!running || paused) return;
    elapsedBeforePause = getElapsedSeconds();
    remainingSeconds = Math.max(0, durationSeconds - elapsedBeforePause);
    running = false;
    paused = true;
    clearInterval(timerId);
    timerId = null;
    status.textContent = "En pause. Reprends quand tu es prêt.";
    updateClock();
    setControls();
  });
  finishButton.addEventListener("click", () => saveSession(false));
  durationSelect.addEventListener("change", () => {
    if (running) return;
    durationSeconds = Number(durationSelect.value) * 60;
    remainingSeconds = durationSeconds;
    updateClock();
  });
  window.addEventListener("pagehide", () => {
    if (timerId) clearInterval(timerId);
  });
  updateClock();
  setControls();
  refreshStats();
})();