/* Compléments du référentiel : couverture étendue, sources officielles et notions à pratiquer.
   Les exemples sont pédagogiques ; vérifier la version et le système avant exécution. */
(function(){
 const R=window.courseReference;
 const add=(id,items)=>{if(R&&R[id])R[id].entries.push(...items)};
 add("01",[
 ["Listes","ul, ol, li","Crée une liste non ordonnée ou ordonnée et ses éléments.","<ol><li>Étape une</li><li>Étape deux</li></ol>","Les listes servent à exprimer une collection ou une séquence, pas à créer des espacements."],
 ["Tableaux","table, caption, thead, tbody, tr, th, td","Structure des données tabulaires avec des en-têtes explicites.","<table><caption>Scores</caption><thead><tr><th scope=\"col\">Nom</th><th scope=\"col\">Score</th></tr></thead><tbody><tr><td>Ada</td><td>10</td></tr></tbody></table>","Ne pas utiliser les tableaux pour la mise en page."],
 ["Attributs globaux","id, class, lang, title, hidden, tabindex","Apporte des informations ou identifiants aux éléments HTML.","<p id=\"intro\" class=\"important\">Introduction</p>","Un id doit être unique dans le document ; tabindex ne doit pas créer un ordre clavier incohérent."],
 ["Médias","audio, video, source, controls","Intègre des médias avec des contrôles et des sources compatibles.","<video controls src=\"demo.mp4\"></video>","Prévoir des sous-titres pour les vidéos parlées et respecter les préférences de réduction des animations."],
 ["Métadonnées","title, meta charset, meta viewport, description","Décrit le document et indique comment le navigateur doit interpréter certaines informations.","<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">","La description ne remplace pas un titre clair et les métadonnées ne garantissent pas le classement SEO."],
 ["Chargement des scripts","script, defer, type=\"module\"","Contrôle comment le navigateur charge et exécute JavaScript.","<script src=\"app.js\" defer></script>","Un script classique sans defer peut bloquer l'analyse du HTML pendant son chargement."],
 ["Éléments interactifs","button, details, summary, dialog","Utilise des éléments natifs pour des actions ou du contenu repliable.","<details><summary>Indice</summary><p>Relis la syntaxe.</p></details>","Le clavier et le focus doivent rester utilisables."],
 ["Validation HTML","Validateur HTML, console, inspecteur DOM","Repère les erreurs de structure et observe le DOM construit par le navigateur.","Ouvre les outils de développement puis inspecte un élément.","Un DOM affiché ne prouve pas que le HTML source est valide."]
 ]);
 add("02",[
 ["Cascade","origine, importance, spécificité, ordre","Détermine quelle déclaration s'applique quand plusieurs règles ciblent un élément.","p { color: navy; } .alerte { color: darkred; }","Éviter de multiplier !important pour masquer un problème de cascade."],
 ["Pseudo-classes",":hover, :focus-visible, :checked, :disabled","Cible un état d'un élément sans ajouter de classe JavaScript.",".bouton:focus-visible { outline: 3px solid currentColor; }","Ne pas dépendre uniquement de hover : les écrans tactiles et claviers existent."],
 ["Pseudo-éléments","::before, ::after, ::first-letter","Crée des éléments de présentation ou cible une partie visuelle.",".obligatoire::after { content: \" *\"; }","Ne pas placer une information indispensable uniquement dans un pseudo-élément."],
 ["Unités","px, rem, em, %, vw, vh, fr","Définit tailles, espacements et dimensions selon un référentiel.",".contenu { max-width: 70rem; width: 100%; }","Les tailles relatives facilitent l'adaptation et le zoom."],
 ["Positionnement","static, relative, absolute, fixed, sticky","Définit comment un élément se place dans le flux et par rapport à son contexte.",".parent { position: relative; } .badge { position: absolute; top: 0; right: 0; }","Le positionnement absolu peut faire chevaucher le contenu."],
 ["Transitions et animations","transition, @keyframes, animation","Anime des changements visuels de façon contrôlée.",".carte { transition: transform .2s ease; }","Respecter prefers-reduced-motion pour les utilisateurs sensibles aux animations."],
 ["Variables CSS","--nom, var()","Réutilise des valeurs et facilite les thèmes.",":root { --accent: #4338ca; } a { color: var(--accent); }","Définir une valeur de secours lorsque c'est pertinent."],
 ["Débogage CSS","Styles calculés, box model, règles barrées","Les outils de développement montrent quelles règles gagnent et pourquoi.","Inspecte un élément puis ouvre Computed / Calculé.","Vérifier la cascade avant d'ajouter une nouvelle règle."]
 ]);
 add("03",[
 ["Types et conversions","string, number, boolean, null, undefined","Les valeurs ont des types et certaines opérations peuvent convertir implicitement.","console.log(typeof 42, typeof '42');","Préférer des conversions explicites quand une entrée externe est utilisée."],
 ["Comparaisons et logique","===, !==, >, &&, ||, !","Compare des valeurs et combine des conditions.","const valide = age >= 13 && accepte;","Comprendre les valeurs truthy/falsy et éviter les comparaisons ambiguës."],
 ["Tableaux","push, map, filter, find, reduce","Stocke et transforme des collections ordonnées.","const doubles = [1,2,3].map(n => n * 2);","map transforme chaque élément ; filter sélectionne les éléments."],
 ["Objets","propriétés, clés, valeurs, destructuration","Associe des clés à des valeurs.","const utilisateur = { nom: 'Ada', actif: true };","Ne jamais supposer qu'une donnée reçue d'une API possède toutes les propriétés attendues."],
 ["Chaînes et modèles","includes, slice, trim, template literals","Recherche, découpe et formate du texte.","const message = `Bonjour ${nom}`;","Échapper ou encoder les données selon le contexte d'affichage."],
 ["Asynchrone","Promise, async, await, fetch","Gère des opérations qui se terminent plus tard, comme une requête réseau.","async function charger(){ const r = await fetch('/api/demo'); if(!r.ok) throw new Error('HTTP'); return r.json(); }","Gérer les erreurs réseau et vérifier response.ok."],
 ["Modules","export, import","Sépare le code en fichiers et partage des fonctions ou valeurs.","export function addition(a,b){ return a+b; }","Le navigateur doit charger les modules dans un contexte compatible, souvent via un serveur local."],
 ["Stockage navigateur","localStorage, sessionStorage","Stocke de petites chaînes côté navigateur.","localStorage.setItem('theme','sombre');","Ne pas stocker de mots de passe, jetons sensibles ou données privées dans ce stockage."],
 ["Tests et débogage","breakpoints, console, assertions","Permet d'observer l'exécution et de vérifier des résultats attendus.","console.assert(2 + 2 === 4, 'Résultat inattendu');","Supprimer ou contrôler les traces de débogage qui exposeraient des informations."]
 ]);
 add("04",[
 ["Opérateurs","+, -, *, /, //, %, **, in, is","Effectue des calculs ou teste l'appartenance et l'identité.","print(7 // 2, 7 % 2, 2 ** 3)","// est une division entière arrondie vers le bas ; / renvoie une division réelle."],
 ["Compréhensions","[expression for élément in iterable if condition]","Construit une collection à partir d'une itération.","carres = [n*n for n in range(5)]","Pour une logique complexe, une boucle explicite peut être plus lisible."],
 ["Modules et imports","import, from … import","Réutilise le code d'un module de la bibliothèque ou du projet.","from pathlib import Path\nprint(Path.cwd())","Éviter de nommer ses fichiers comme des modules standards, par exemple random.py."],
 ["Environnements virtuels","python -m venv .venv","Isole les dépendances d'un projet.","python -m venv .venv","La commande d'activation dépend du système ; l'environnement n'est pas à committer en général."],
 ["Gestion des dépendances","pip install, pip freeze","Installe et documente les bibliothèques d'un environnement Python.","python -m pip --version","N'installer que des paquets nécessaires et fiables."],
 ["Itérateurs et générateurs","iter, next, yield","Produit les éléments progressivement plutôt que de tout stocker immédiatement.","def compte(n):\n    for i in range(n):\n        yield i","Un générateur peut être consommé une seule fois."],
 ["Classes","class, __init__, self, méthodes","Définit des types d'objets qui regroupent données et comportements.","class Compteur:\n    def __init__(self):\n        self.valeur = 0","Utiliser les classes quand elles clarifient le modèle, pas systématiquement."],
 ["Tests unitaires","assert, unittest","Vérifie automatiquement les comportements attendus.","assert 2 * 3 == 6","Les tests doivent inclure les limites et les cas d'erreur."]
 ]);
 add("05",[
 ["Initialiser un dépôt","git init","Crée un dépôt Git local dans le dossier courant.","git init","Vérifier le dossier courant avant l’initialisation ; un dépôt existant n’a généralement pas besoin d’être réinitialisé."],
 ["Configurer l’identité","git config --global user.name; git config --global user.email","Définit le nom et l’adresse associés aux nouveaux commits sur cette machine.","git config --global user.name \"Ton nom\"\ngit config --global user.email \"toi@example.com\"","Ces valeurs identifient les commits ; elles ne configurent pas la connexion à GitHub."],
 ["Configurer un dépôt distant","git remote add origin URL; git remote -v","Associe le dépôt local à une adresse distante et permet de vérifier les remotes configurés.","git remote add origin https://github.com/UTILISATEUR/DEPOT.git\ngit remote -v","Remplacer l’URL d’exemple par celle du dépôt autorisé et vérifier la destination avant git push."],
 ["Cloner un dépôt","git clone URL","Crée une copie locale d'un dépôt distant.","git clone https://github.com/octocat/Hello-World.git","Ne cloner que des dépôts que tu es autorisé à consulter ; vérifier les scripts avant de les exécuter."],
 ["Index et répertoire de travail","git add, git diff --staged","L'index prépare précisément le contenu du prochain commit.","git add fichier.txt\ngit diff --staged","Un fichier ajouté à l'index peut encore contenir des secrets : inspecter avant commit."],
 ["Fusionner","git merge branche","Intègre les changements d'une branche dans la branche courante.","git switch main\ngit merge feature","S'assurer de la bonne branche cible et résoudre chaque conflit consciemment."],
 ["Conflits","<<<<<<<, =======, >>>>>>>","Signale des lignes concurrentes que Git ne peut pas fusionner automatiquement.","Ouvre le fichier en conflit, choisis ou combine les changements, puis relance git status.","Supprimer tous les marqueurs et vérifier le résultat avant commit."],
 ["Ignorer des fichiers"," .gitignore","Définit les fichiers non suivis que Git doit ignorer.","printf \".env\\n.venv/\\n\" >> .gitignore","Ajouter .gitignore n'efface pas les secrets déjà suivis dans l'historique."],
 ["Étiquettes de version","git tag","Associe un nom à un commit, souvent pour une version publiée.","git tag -a v1.0.0 -m \"Version 1.0.0\"","Vérifier le commit avant de créer et publier une étiquette."],
 ["Stash","git stash; git stash list; git stash pop","Met temporairement de côté des changements locaux.","git stash push -m \"travail en cours\"","Le stash n'est pas une sauvegarde durable ; vérifier les changements récupérés."],
 ["Aide Git","git help commande; git commande -h","Consulte l'aide de la commande et ses options.","git help commit","Les options peuvent varier selon la version de Git."]
 ]);
 add("06",[
 ["NULL et valeurs manquantes","IS NULL, IS NOT NULL, COALESCE","Traite les valeurs absentes sans les confondre avec zéro ou chaîne vide.","SELECT COALESCE(prenom, 'Inconnu') FROM utilisateurs;","Les comparaisons = NULL ne donnent pas le résultat attendu ; utiliser IS NULL."],
 ["Fonctions de texte et dates","LOWER, UPPER, LENGTH, date functions","Transforme du texte et travaille avec les dates selon le moteur SQL.","SELECT LOWER(nom) FROM utilisateurs;","Les noms de fonctions et les fonctions de date diffèrent selon le moteur."],
 ["Contraintes","PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL","Impose des règles d'intégrité aux données.","CREATE TABLE cours (id INTEGER PRIMARY KEY, titre TEXT NOT NULL);","Choisir des contraintes qui reflètent les règles métier."],
 ["Transactions","BEGIN, COMMIT, ROLLBACK","Groupe plusieurs opérations afin de les valider ou annuler ensemble.","BEGIN; UPDATE comptes SET solde = solde - 10 WHERE id = 1; ROLLBACK;","Exemple conceptuel : tester dans une base dédiée, jamais sur des données réelles sans autorisation."],
 ["Index","CREATE INDEX","Peut accélérer certaines recherches au prix d'espace et de coût d'écriture.","CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);","Un index n'améliore pas automatiquement toutes les requêtes."],
 ["Pagination","LIMIT/OFFSET ou pagination par curseur","Renvoie des portions de résultats plutôt que toute la table.","SELECT id, nom FROM utilisateurs ORDER BY id LIMIT 20 OFFSET 0;","Utiliser un tri stable et tenir compte des différences entre moteurs."],
 ["Plan d'exécution","EXPLAIN","Aide à comprendre comment le moteur prévoit d'exécuter une requête.","EXPLAIN SELECT * FROM utilisateurs WHERE id = 1;","Lire un plan nécessite de connaître le moteur et la taille des données."],
 ["Droits d'accès","GRANT, REVOKE selon le moteur","Attribue ou retire des permissions à des rôles.","Exercice : définir un rôle de lecture seule dans une base locale.","Les commandes de permissions diffèrent entre SQLite, PostgreSQL, MySQL et autres moteurs."]
 ]);
 add("07",[
 ["Adresse MAC et ARP","Adresse de liaison, cache ARP","Explique comment un appareil local associe une adresse IP à une adresse de liaison.","Étude de schéma : hôte A → passerelle → hôte B.","Une adresse MAC ne traverse généralement pas les routeurs comme l'adresse IP."],
 ["Sous-réseaux","CIDR, masque, adresse réseau, broadcast","Décrit une plage d'adresses IPv4 et les hôtes possibles.","Exercice papier : analyser 192.0.2.0/24.","Les calculs IPv4 et IPv6 diffèrent ; ne pas appliquer les règles IPv4 à IPv6."],
 ["DHCP","Bail, passerelle, DNS, serveur DHCP","Attribue automatiquement une configuration réseau à un client.","Observe les paramètres réseau de ton propre appareil.","Ne pas lancer de serveur DHCP sur un réseau partagé sans autorisation."],
 ["TLS et certificats","Certificat, nom d'hôte, autorité, expiration","Protège le transport et permet de vérifier l'identité du serveur selon la chaîne de confiance.","Inspecte le certificat d'un site public dans le navigateur.","Un certificat valide ne prouve pas que le site est digne de confiance dans son contenu."],
 ["Proxy et CDN","Intermédiaire, cache, distribution","Explique comment une requête peut passer par des intermédiaires et des caches.","Schéma client → CDN → serveur d'origine.","Les caches doivent respecter les règles de confidentialité des réponses."],
 ["Pare-feu","Règles, source, destination, protocole, port","Autorise ou bloque le trafic selon une politique.","Construis une matrice fictive des flux autorisés.","Tester les règles en environnement contrôlé pour éviter de couper l'accès légitime."],
 ["Outils selon le système","ipconfig, ip, ping, nslookup, tracert/traceroute","Les commandes d'observation varient selon Windows, macOS et Linux.","Compare les résultats de configuration sur ton appareil.","Les outils ne garantissent pas qu'un hôte distant est accessible par tous les protocoles."],
 ["Modèle OSI et TCP/IP","Couches, encapsulation, client/serveur","Organise le raisonnement sur la transmission et le diagnostic.","Associe DNS, IP, TCP, TLS et HTTP à leurs rôles.","Les modèles sont des outils d'explication, pas toujours une correspondance exacte un-à-un."]
 ]);
 add("08",[
 ["Options et aide","--help, man, info, type, command -v","Découvre l'usage d'une commande et le programme qui sera lancé.","grep --help\ncommand -v grep","L'aide locale dépend de la version installée."],
 ["Quoting et espaces","guillemets simples, doubles, échappement","Empêche le shell d'interpréter certains caractères ou espaces comme de la syntaxe.","printf '%s\\n' 'un nom avec espaces'","Le comportement varie entre Bash, Zsh, PowerShell et cmd.exe."],
 ["Variables d'environnement","export, echo, env","Transmet des paramètres de configuration aux programmes lancés par le shell.","export LANG=fr_FR.UTF-8","Ne jamais afficher ou publier en clair les variables qui contiennent des secrets."],
 ["Codes de retour","$?, exit","Indique si une commande a réussi selon sa convention de code de sortie.","grep -q 'mot' fichier.txt; echo $?","Le code 0 signifie souvent succès, mais la convention exacte dépend de la commande."],
 ["Permissions symboliques","u, g, o, r, w, x","Définit les droits du propriétaire, du groupe et des autres.","chmod u+x script.sh","Éviter chmod 777 ; donner uniquement les droits nécessaires."],
 ["Processus en arrière-plan","&, jobs, fg, bg","Permet d'observer et de gérer les tâches du shell interactif.","sleep 5 &\njobs","Un processus en arrière-plan n'est pas nécessairement un service durable."],
 ["Archives et compression","tar, gzip, zip, unzip","Regroupe et/ou compresse des fichiers.","tar -czf archive-demo.tar.gz dossier-demo/","Inspecter le contenu d'une archive inconnue avant extraction."],
 ["Scripts shell","shebang, variables, conditions, fonctions","Automatise une suite d'actions reproductibles.","#!/bin/sh\nprintf '%s\\n' 'Bonjour'","Tester sur des données jetables et citer correctement les variables pour éviter les expansions inattendues."]
 ]);
 add("09",[
 ["Modèle de menace","Actifs, frontières, adversaires, contrôles","Structure l'analyse des risques avant de choisir les protections.","Dessine les flux d'une application fictive et identifie ses actifs.","Une analyse de menace dépend du contexte et doit être mise à jour."],
 ["Gestion des identifiants","Gestionnaire, MFA, récupération","Réduit le risque lié à la réutilisation des mots de passe et au vol de compte.","Évaluer une politique fictive d'authentification.","Ne pas demander ni partager les identifiants d'une autre personne."],
 ["Moindre privilège","Rôles, séparation des tâches, permissions minimales","Limite les conséquences d'une erreur ou d'un compte compromis.","Construire une matrice permissions / rôles.","Revoir régulièrement les accès inutilisés."],
 ["Mises à jour et dépendances","Inventaire, versions, advisories, correctifs","Repère les composants obsolètes et planifie leur mise à jour.","Inventorier les dépendances d'un petit projet personnel.","Utiliser les sources officielles et tester les mises à jour."],
 ["Sauvegarde et récupération","RPO, RTO, rétention, restauration","Définit combien de données et de temps d'interruption sont acceptables.","Proposer un plan de restauration pour une application fictive.","Une copie connectée en permanence peut être affectée par le même incident."],
 ["Phishing et ingénierie sociale","Signaux, vérification indépendante, signalement","Aide à repérer les demandes inhabituelles et à les vérifier par un canal fiable.","Analyser des exemples fictifs de messages suspects.","Ne pas cliquer sur un lien suspect pour le tester."],
 ["Sécurité de configuration","Paramètres sûrs, secrets, permissions, logs","Réduit les paramètres par défaut risqués et les expositions accidentelles.","Faire une checklist de configuration pour une application locale.","Ne pas publier les secrets dans les dépôts ou captures d'écran."],
 ["Indicateurs et détection","Événements, seuils, faux positifs, alertes","Définit ce qui mérite une investigation et comment éviter les alertes inutiles.","Analyser un tableau d'alertes simulées.","Une alerte est un signal à vérifier, pas une preuve automatique d'attaque."]
 ]);
 add("10",[
 ["Aléatoire cryptographique","Générateur cryptographiquement sûr","Produit des valeurs difficiles à prédire pour les clés ou jetons.","Utiliser la fonction secrets de Python pour une démonstration locale.","Ne pas utiliser le générateur pseudo-aléatoire général pour créer des secrets."],
 ["Nonce et vecteur d'initialisation","Valeur de contexte unique selon l'algorithme","Certains modes de chiffrement exigent une valeur unique ou imprévisible selon leurs spécifications.","Étudier le rôle d'un nonce dans une documentation de bibliothèque.","Réutiliser un nonce peut compromettre la sécurité de certains schémas."],
 ["Authentification des messages","MAC et AEAD","Permet de détecter les modifications et, selon le mécanisme, de protéger la confidentialité.","Comparer les propriétés d'un chiffrement authentifié dans un exemple conceptuel.","Ne pas concevoir soi-même un protocole cryptographique."],
 ["Dérivation de clés","KDF, sel, coût de calcul","Transforme un secret de départ en clé selon un mécanisme défini.","Étudier Argon2id ou scrypt pour le stockage de mots de passe.","Ne pas stocker les mots de passe en clair ni avec un hachage rapide simple."],
 ["Échange de clés","Accord de clé et clés éphémères","Permet à deux parties d'établir un secret partagé selon un protocole.","Dessiner les étapes d'un échange authentifié.","Sans authentification, un échange peut rester vulnérable à une interception active."],
 ["Rotation et révocation","Expiration, remplacement, inventaire","Limite la durée d'utilisation d'une clé compromise ou obsolète.","Créer un calendrier fictif de rotation des clés.","Prévoir comment révoquer et remplacer une clé sans interruption excessive."],
 ["Vérifier une empreinte","Calcul local et comparaison de source fiable","Permet de détecter si un fichier diffère de la version attendue.","Comparer l'empreinte d'un fichier de test avec une valeur fournie indépendamment.","Une empreinte téléchargée depuis la même source compromise n'est pas une preuve indépendante."]
 ]);
 add("11",[
 ["CORS","Origines, en-têtes, preflight","Le navigateur applique une politique qui contrôle l'accès de scripts à certaines réponses inter-origines.","Étudier un exemple local avec deux origines fictives.","CORS n'est pas un mécanisme d'authentification."],
 ["CSP","Content-Security-Policy","Réduit certains risques d'injection en limitant les sources de contenu autorisées.","Écrire une politique de démonstration pour une page locale.","Une politique doit être testée avant d'être appliquée à un site existant."],
 ["CSRF","Jeton anti-CSRF, SameSite, vérification d'origine","Réduit les risques qu'un navigateur envoie involontairement une action authentifiée.","Analyser un formulaire local fictif.","La protection dépend du type d'authentification et de l'architecture."],
 ["En-têtes de sécurité","HSTS, nosniff, frame-ancestors, Referrer-Policy","Configure certains comportements de sécurité du navigateur.","Inspecter les en-têtes de réponse d'une application de test.","Un en-tête isolé ne corrige pas une faille logique."],
 ["Dépendances front-end","Verrouillage des versions, audit, provenance","Réduit les risques liés aux bibliothèques tierces et aux mises à jour non contrôlées.","Examiner le manifeste d'un projet personnel.","Examiner les alertes et mises à jour avant de les appliquer."],
 ["Gestion des erreurs","Messages génériques, logs protégés","Évite de révéler des détails internes aux utilisateurs tout en conservant des journaux utiles.","Comparer deux messages d'erreur fictifs.","Ne pas renvoyer de traces d'exécution ou de secrets dans la réponse publique."],
 ["Téléversement de fichiers","Type, taille, nom, stockage, analyse","Limite les risques liés aux fichiers envoyés par les utilisateurs.","Concevoir une checklist pour une application locale.","Ne jamais se fier uniquement au nom ou au type déclaré par le navigateur."],
 ["Revue de sécurité","Portée, scénarios, preuve, correction, retest","Organise les tests autorisés et leur traçabilité.","Rédiger une fiche de test pour une application créée par l'apprenant.","Aucune analyse intrusive de site tiers sans autorisation explicite."]
 ]);
 add("12",[
 ["Recherche avancée","Opérateurs, filtres de date, domaines publics","Affiner une recherche documentaire sans automatiser une collecte intrusive.","Recherche sur un sujet fictif avec plusieurs sources publiques.","Les opérateurs varient selon le moteur et ne contournent pas les restrictions d'accès."],
 ["Archives web","Versions datées et contexte historique","Permet de comparer les versions publiques d'une page au fil du temps.","Comparer deux versions d'une page de démonstration.","Une archive peut être incomplète ou privée de certains contenus."],
 ["Métadonnées de fichiers","Propriétés, horodatages, logiciel","Apporte des indices sur la création ou le traitement d'un fichier.","Inspecter un document d'exercice sans données personnelles.","Les métadonnées peuvent être modifiées et ne prouvent pas à elles seules l'origine."],
 ["Corroboration","Sources indépendantes, cohérence, contre-indices","Renforce ou nuance une conclusion en croisant des sources.","Trouver deux sources indépendantes pour une affirmation fictive.","Deux pages qui se recopient ne sont pas deux confirmations indépendantes."],
 ["Niveaux de confiance","Fait observé, inférence, hypothèse","Exprime le degré de certitude et les limites de l'analyse.","Annoter chaque conclusion d'un rapport avec sa justification.","Ne pas confondre absence de preuve et preuve d'absence."],
 ["Protection des personnes","Minimisation, anonymisation, finalité","Limite la collecte aux informations nécessaires à un objectif légitime.","Réécrire un rapport fictif pour retirer les données inutiles.","Ne pas rechercher l'adresse personnelle ou les informations privées d'une personne."]
 ]);
 add("13",[
 ["Chronologie","Horodatage, fuseau, ordre, source","Assemble les événements en tenant compte des différences d'horloge.","Trier un jeu de logs fictifs et noter le fuseau de chaque source.","Ne pas supposer que toutes les machines ont une horloge parfaitement synchronisée."],
 ["Intégrité des preuves","Copie de travail, empreinte, journal de chaîne de conservation","Documente comment les éléments sont copiés et manipulés.","Comparer les empreintes de deux copies de fichiers de test.","Suivre les procédures légales et internes applicables."],
 ["Indicateurs","IP, domaine, empreinte, compte, événement","Peut aider à relier des événements à une investigation.","Classer des indicateurs fictifs selon leur source et date.","Un indicateur peut être partagé ou réutilisé par des activités légitimes."],
 ["Faux positifs","Contexte, répétition, validation","Évite de conclure à un incident à partir d'un signal isolé.","Examiner plusieurs explications possibles pour une alerte simulée.","Documenter les raisons de la conclusion et les incertitudes."],
 ["Confinement et reprise","Décision, approbation, vérification","Réduit l'impact tout en maintenant la traçabilité des décisions.","Choisir une mesure dans un scénario d'incident fictif.","Sur un système réel, suivre la procédure d'incident et les responsables désignés."],
 ["Actions correctives","Cause, mesure, responsable, échéance, test","Transforme les conclusions en changements vérifiables.","Établir un plan d'action avec critères d'acceptation.","Vérifier que la correction a réellement réduit le risque."]
 ]);
 add("14",[
 ["Architecture","Composants, flux, frontières de confiance","Décrit comment les parties du projet interagissent.","Dessiner les composants et les flux de données.","Identifier les données sensibles et les frontières de confiance."],
 ["Plan de test","Cas nominal, limite, erreur, régression","Rend les vérifications reproductibles.","Créer une matrice fonctionnalité / cas de test / résultat attendu.","Chaque critère important doit être vérifiable."],
 ["Qualité du code","Lisibilité, modularité, nommage, duplication","Facilite la maintenance et réduit les erreurs.","Faire une revue de code avec une checklist.","La simplicité est préférable à une abstraction inutile."],
 ["Accessibilité et compatibilité","Clavier, focus, contraste, mobile, navigateurs","Permet à davantage de personnes d'utiliser le projet dans différents contextes.","Tester toutes les actions sans souris.","Ne pas se fier uniquement à un score automatique."],
 ["Publication","Build, configuration, secrets, rollback","Déploie une version reproductible avec une possibilité de retour arrière.","Rédiger une procédure de publication pour un projet de test.","Vérifier les paramètres et éviter d'exposer les secrets."],
 ["Documentation de l'API","Entrées, sorties, erreurs, authentification","Explique comment utiliser une interface de manière fiable.","Documenter un endpoint fictif avec exemples de requête/réponse.","Ne jamais inclure de vrais jetons d'accès dans la documentation."],
 ["Bilan final","Démonstration, limites, prochaines étapes","Évalue ce qui fonctionne et identifie les améliorations prioritaires.","Présenter les tests réalisés et les défauts connus.","Ne revendiquer que les tests réellement exécutés."]
 ]);
 const sources={
 "01":[["MDN — HTML","https://developer.mozilla.org/fr/docs/Web/HTML"],["WHATWG — HTML Standard","https://html.spec.whatwg.org/"]],
 "02":[["MDN — CSS","https://developer.mozilla.org/fr/docs/Web/CSS"],["MDN — CSS layout","https://developer.mozilla.org/fr/docs/Learn_web_development/Core/CSS_layout"]],
 "03":[["MDN — JavaScript","https://developer.mozilla.org/fr/docs/Web/JavaScript"],["MDN — Web APIs","https://developer.mozilla.org/fr/docs/Web/API"]],
 "04":[["Tutoriel officiel Python","https://docs.python.org/fr/3/tutorial/"],["Référence du langage Python","https://docs.python.org/fr/3/reference/"]],
 "05":[["Livre Pro Git en français","https://git-scm.com/book/fr/v2"],["Référence des commandes Git","https://git-scm.com/docs"]],
 "06":[["SQL Tutorial — PostgreSQL","https://www.postgresql.org/docs/current/tutorial.html"],["SQLite — Documentation","https://www.sqlite.org/docs.html"]],
 "07":[["MDN — HTTP","https://developer.mozilla.org/fr/docs/Web/HTTP"],["Cloudflare — Learning Center","https://www.cloudflare.com/learning/"]],
 "08":[["GNU Coreutils","https://www.gnu.org/software/coreutils/manual/"],["GNU Bash Reference Manual","https://www.gnu.org/software/bash/manual/"]],
 "09":[["NIST Cybersecurity Framework","https://www.nist.gov/cyberframework"],["CISA Secure Our World","https://www.cisa.gov/secure-our-world"]],
 "10":[["NIST — Cryptographic Standards","https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines"],["OWASP Password Storage Cheat Sheet","https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"]],
 "11":[["OWASP Web Security Testing Guide","https://owasp.org/www-project-web-security-testing-guide/"],["OWASP Cheat Sheet Series","https://cheatsheetseries.owasp.org/"]],
 "12":[["Bellingcat — Online Investigation Toolkit","https://bellingcat.gitbook.io/toolkit"],["EDMO — Media literacy resources","https://edmo.eu/"]],
 "13":[["NIST Computer Security Incident Handling Guide","https://csrc.nist.gov/pubs/sp/800/61/r2/final"],["CISA Incident Response","https://www.cisa.gov/topics/cyber-threats-and-advisories/incident-detection-response"]],
 "14":[["MDN — Accessibility","https://developer.mozilla.org/fr/docs/Web/Accessibility"],["OWASP Cheat Sheet Series","https://cheatsheetseries.owasp.org/"]]
 };
 Object.keys(sources).forEach(id=>{if(R&&R[id])R[id].sources=sources[id]});
})();