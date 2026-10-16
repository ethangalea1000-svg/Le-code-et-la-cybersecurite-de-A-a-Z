(function () {
  "use strict";
  const projects = [
    ["Débutant","20–30 min","Aucun","HTML sémantique · titres et paragraphes"],
    ["Débutant","20–30 min","Projet 1 conseillé","Structure HTML · liens · sections"],
    ["Débutant","25–35 min","Bases HTML","Hiérarchie visuelle · blocs de contenu"],
    ["Débutant","30–45 min","Bases HTML et CSS","Mise en page · identité visuelle"],
    ["Débutant","25–40 min","Bases HTML et CSS","Sections de CV · liens accessibles"],
    ["Débutant +","30–45 min","Sélecteurs CSS","Grille d’images · adaptation mobile"],
    ["Débutant +","35–50 min","HTML et CSS","Cartes de données · alignement"],
    ["Débutant +","25–40 min","Couleurs et sélecteurs CSS","Thème sombre · variables CSS"],
    ["Débutant +","35–50 min","Bases HTML","Labels · champs · messages d’erreur"],
    ["Débutant +","40–55 min","HTML et CSS","Couleurs · espacements · composants réutilisables"],
    ["Débutant","20–30 min","Bases HTML","Événements JavaScript · mise à jour du DOM"],
    ["Débutant +","30–45 min","Projet 11 conseillé","Tableaux · ajout et suppression d’éléments"],
    ["Débutant +","35–50 min","Événements JavaScript","Questions · réponses · score"],
    ["Débutant +","30–45 min","Événements JavaScript","Temps écoulé · intervalle · arrêt"],
    ["Intermédiaire","40–60 min","Variables et conditions","Opérations · saisie · validation"],
    ["Intermédiaire","35–50 min","Fonctions JavaScript","Conversion d’unités · gestion des cas limites"],
    ["Intermédiaire","40–60 min","Tableaux et chaînes","Filtrage local · recherche"],
    ["Intermédiaire","40–60 min","Objets et stockage local","Enregistrement et restauration des notes"],
    ["Intermédiaire","35–55 min","Fonctions et chaînes","Génération aléatoire · bonnes pratiques"],
    ["Intermédiaire","35–55 min","Chaînes et tableaux","Comptage · statistiques de texte"],
    ["Intermédiaire","45–65 min","Objets et tableaux","CRUD local · recherche de contacts"],
    ["Intermédiaire","45–65 min","Tableaux et fonctions","Catégories · totaux · synthèse"],
    ["Intermédiaire","45–70 min","DOM et stockage local","Colonnes · déplacement de cartes"],
    ["Intermédiaire","40–60 min","JSON et tableaux","Lecture · validation · affichage de données"],
    ["Intermédiaire +","50–70 min","Recherche et filtrage","Indexation simple · pertinence des résultats"],
    ["Débutant Python","25–40 min","Bases Python","Variables · calculs · affichage"],
    ["Débutant Python","30–45 min","Variables et listes","Carnet structuré · fonctions"],
    ["Intermédiaire Python","40–60 min","Fichiers et listes","CSV · lecture et statistiques"],
    ["Intermédiaire Python","40–60 min","Dictionnaires et JSON","Sérialisation · validation des données"],
    ["Intermédiaire Python","40–60 min","Fonctions Python","Tests simples · cas limites"],
    ["Intermédiaire Python","45–65 min","Fonctions et dictionnaires","Simulation d’API · réponses structurées"],
    ["Intermédiaire Python","40–60 min","Listes et ensembles","Détection de doublons · normalisation"],
    ["Intermédiaire Python","45–70 min","Fichiers et chaînes","Lecture de journaux · filtres"],
    ["Intermédiaire Python","45–65 min","Dictionnaires et listes","Modèle d’inventaire · quantités"],
    ["Intermédiaire Python","50–75 min","Fichiers et fonctions","Rapport automatisé · export"],
    ["Débutant SQL","30–45 min","Tables et SELECT","Créer une table · filtrer des livres"],
    ["Débutant SQL","35–50 min","INSERT, UPDATE, DELETE","Gestion de tâches · états"],
    ["Intermédiaire SQL","40–60 min","SELECT et agrégats","COUNT · GROUP BY · statistiques"],
    ["Intermédiaire SQL","45–65 min","Clés et relations","JOIN · relier deux tables"],
    ["Intermédiaire SQL","40–60 min","Tables et dates","Journal d’événements · tri et filtres"],
    ["Débutant réseau","35–50 min","Notions IP et réseau","Adresses · ports · vocabulaire réseau"],
    ["Intermédiaire réseau","45–60 min","Notions réseau","Diagnostic simulé · démarche méthodique"],
    ["Intermédiaire Linux","40–60 min","Commandes de base","Commandes simulées · navigation"],
    ["Intermédiaire Linux","40–60 min","Fichiers et utilisateurs","Droits d’accès · moindre privilège"],
    ["Avancé","50–70 min","Bases cybersécurité","Mesures complémentaires · défense en profondeur"],
    ["Avancé","50–70 min","Format de journaux","Repérer des événements suspects dans des exemples fictifs"],
    ["Avancé","40–60 min","Notions de hachage","Intégrité · empreintes de démonstration"],
    ["Avancé","50–75 min","Bases HTML et sécurité web","Audit défensif d’une page fictive"],
    ["Avancé","50–75 min","Journaux et tri d’événements","Chronologie · impact · mesures correctives"],
    ["Projet final","90–150 min","Choisir plusieurs projets précédents","Assembler · tester · documenter · présenter"]
  ];
  const cards = document.querySelectorAll(".project-card-integrated");
  cards.forEach((card, index) => {
    const number = Number((card.querySelector(".num")?.textContent || "").trim()) || index + 1;
    const data = projects[number - 1];
    if (!data) return;
    const [level, duration, prerequisites, skills] = data;
    const meta = document.createElement("div");
    meta.className = "project-learning-meta";
    const levelTag = document.createElement("span");
    levelTag.className = "project-level";
    levelTag.textContent = level;
    const time = document.createElement("span");
    time.className = "project-time";
    time.textContent = "Temps estimé : " + duration;
    const detail = document.createElement("p");
    detail.className = "project-meta-detail";
    detail.textContent = "Prérequis : " + prerequisites + " · Compétences : " + skills;
    card.append(meta, detail);
    meta.append(levelTag, time);
  });
})();
