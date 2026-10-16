(function () {
  "use strict";
  const cards = document.querySelectorAll(".project-card-integrated");
  cards.forEach((card, index) => {
    const number = Number((card.querySelector(".num")?.textContent || "").trim()) || index + 1;
    let level, duration, detail;
    if (number <= 10) {
      level = "Débutant"; duration = "20–35 min"; detail = "Découverte et structure";
    } else if (number <= 25) {
      level = "Débutant +"; duration = "30–50 min"; detail = "Logique et interfaces";
    } else if (number <= 40) {
      level = "Intermédiaire"; duration = "40–70 min"; detail = "Données et automatisation";
    } else {
      level = "Avancé"; duration = "50–90 min"; detail = "Systèmes et cybersécurité";
    }
    const meta = document.createElement("div");
    meta.className = "project-learning-meta";
    const levelTag = document.createElement("span");
    levelTag.className = "project-level";
    levelTag.textContent = level;
    const time = document.createElement("span");
    time.className = "project-time";
    time.textContent = "Temps estimé : " + duration;
    const description = document.createElement("p");
    description.className = "project-meta-detail";
    description.textContent = detail + " · estimation indicative";
    meta.append(levelTag, time);
    card.append(meta, description);
  });
})();
