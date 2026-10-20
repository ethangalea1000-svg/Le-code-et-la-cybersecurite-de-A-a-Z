/* Référentiel pédagogique versionné : exemples courts, vérifiables et exécutables dans un environnement adapté. */
window.courseReference = {
"01": {title:"HTML — balises et attributs", intro:"HTML décrit la structure et le sens du contenu. Les balises ne sont pas des commandes terminal : elles composent un document.", entries:[
["Document minimal","<!doctype html>","Annonce un document HTML moderne. Puis utiliser html, head et body.","<!doctype html>\n<html lang=\"fr\"><head><meta charset=\"utf-8\"><title>Ma page</title></head><body><h1>Bonjour</h1></body></html>","Garder une seule structure html/head/body et préciser la langue."],
["Titres et paragraphes","h1…h6, p","Les titres expriment la hiérarchie du document ; p délimite un paragraphe.","<h1>Mon site</h1><h2>Présentation</h2><p>Un paragraphe.</p>","Choisir les titres pour leur sens, pas pour leur taille visuelle."],
["Liens","a href=\"URL\"","Crée un lien vers une page ou une ressource.","<a href=\"cours.html\">Voir les cours</a>","Le texte du lien doit indiquer sa destination."],
["Images","img src=\"…\" alt=\"…\"","Intègre une image ; alt fournit une alternative textuelle.","<img src=\"chat.jpg\" alt=\"Chat assis sur un fauteuil\">","Un alt vide convient aux images purement décoratives."],
["Formulaires","form, label, input, button","Collecte des données ; associer label et champ avec for/id.","<label for=\"email\">E-mail</label><input id=\"email\" type=\"email\">","Une validation côté navigateur ne remplace pas la validation serveur."],
["Sémantique","header, nav, main, section, article, footer","Décrit le rôle des différentes zones de la page.","<main><section><h2>Leçon</h2><p>Contenu</p></section></main>","Privilégier l'élément qui décrit réellement le contenu."]
]},
"02": {title:"CSS — propriétés et mise en page", intro:"Une règle CSS associe un sélecteur à des déclarations propriété: valeur.", entries:[
["Sélecteurs","element, .classe, #identifiant","Cible des éléments HTML selon leur type ou leurs attributs.",".carte { padding: 1rem; }","Éviter une spécificité inutilement élevée."],
["Couleurs et texte","color, background-color, font-size, line-height","Règle l'apparence du texte et du fond.","body { color: #222; line-height: 1.5; }","Vérifier le contraste et la lisibilité."],
["Modèle de boîte","margin, padding, border, box-sizing","Chaque élément possède contenu, remplissage, bordure et marge.","* { box-sizing: border-box; }","Margin est à l'extérieur de la bordure ; padding à l'intérieur."],
["Flexbox","display:flex; gap; justify-content; align-items","Dispose des éléments le long d'un axe principal et d'un axe secondaire.",".ligne { display:flex; gap:1rem; align-items:center; }","Prévoir le comportement quand l'espace manque."],
["Grid","display:grid; grid-template-columns","Crée une mise en page en lignes et colonnes.",".grille { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }","Tester les petites largeurs d'écran."],
["Responsive","@media (max-width: …)","Applique des règles selon les caractéristiques de l'écran.","@media (max-width:600px) { .ligne { flex-direction:column; } }","Partir d'une mise en page flexible plutôt que de tailles fixes."]
]},
"03": {title:"JavaScript — syntaxe et navigateur", intro:"JavaScript exécute des instructions. Le navigateur expose aussi des API comme le DOM.", entries:[
["Variables","const, let","const lie un nom à une référence non réassignable ; let autorise la réassignation.","const nom = 'Ada'; let score = 0;","const n'empêche pas de modifier le contenu d'un objet."],
["Conditions","if, else if, else","Exécute un bloc selon une expression booléenne.","if (score >= 10) { console.log('Réussi'); } else { console.log('Continue'); }","Utiliser === pour comparer sans conversion implicite inattendue."],
["Boucles","for, for…of, while","Répètent des instructions selon une règle.","for (const fruit of ['pomme','poire']) console.log(fruit);","S'assurer que la condition d'une boucle while peut devenir fausse."],
["Fonctions","function, paramètres, return","Regroupe une tâche et peut renvoyer un résultat.","function doubler(n) { return n * 2; }","Distinguer afficher un résultat et le retourner."],
["DOM et événements","querySelector, addEventListener","Sélectionne un élément puis réagit à une interaction.","document.querySelector('button')?.addEventListener('click', () => console.log('clic'));","Ne pas injecter de texte non fiable avec innerHTML ; préférer textContent."],
["Erreurs et débogage","try/catch, console, DevTools","Observe les valeurs et traite certaines erreurs attendues.","try { JSON.parse('{'); } catch (e) { console.error('JSON invalide'); }","Ne pas masquer silencieusement toutes les erreurs."]
]},
"04": {title:"Python — instructions et bibliothèque standard", intro:"Python est un langage. La syntaxe, les objets, les modules et l'interpréteur doivent être compris séparément.", entries:[
["Afficher et lire","print(), input()","print affiche ; input lit une chaîne saisie par l'utilisateur.","nom = input('Ton prénom : ')\nprint('Bonjour', nom)","input renvoie une chaîne : convertir explicitement si un nombre est attendu."],
["Types et conversion","int, float, str, bool","Représentent des nombres entiers, décimaux, chaînes et booléens.","age = int('14')","Une conversion invalide peut lever ValueError."],
["Conditions et boucles","if/elif/else, for, while, range","Décident ou répètent l'exécution ; l'indentation délimite les blocs.","for n in range(3):\n    print(n)","range(3) produit 0, 1 et 2, pas 3."],
["Collections","list, tuple, dict, set","Stockent des groupes de valeurs avec des propriétés différentes.","profil = {'nom': 'Ada', 'actif': True}","Choisir une structure selon l'accès et les modifications nécessaires."],
["Fonctions","def, paramètres, return","Crée un bloc réutilisable et transmet éventuellement un résultat.","def doubler(n):\n    return n * 2","Une fonction sans return renvoie None."],
["Fichiers et exceptions","with open(), try/except","Lit ou écrit un fichier et gère des erreurs attendues.","with open('notes.txt', encoding='utf-8') as f:\n    contenu = f.read()","N'ouvrir que des fichiers attendus et gérer les erreurs d'accès."]
]},
"05": {title:"Git et GitHub — commandes de versionnement", intro:"Git suit l'historique local ; GitHub héberge des dépôts et ajoute des fonctions de collaboration.", entries:[
["État et changements","git status; git diff","Montre les fichiers modifiés et les différences non enregistrées dans un commit.","git status\ngit diff","Lire les différences avant de préparer un commit."],
["Préparer et enregistrer","git add fichier; git commit -m \"message\"","Place les changements dans l'index puis crée un commit.","git add index.html\ngit commit -m \"Corrige le titre\"","Ne jamais inclure de mot de passe, jeton ou fichier secret."],
["Historique","git log --oneline","Affiche les commits de façon compacte.","git log --oneline -10","Un commit décrit un état ; il ne remplace pas une sauvegarde complète."],
["Branches","git branch; git switch -c nom","Liste les branches ou crée et sélectionne une branche.","git switch -c feature/navigation","Vérifier la branche avant de modifier ou fusionner."],
["Synchronisation","git fetch; git pull; git push","fetch récupère les références distantes ; pull récupère et intègre ; push envoie les commits.","git fetch origin\ngit status","Comprendre les différences locales/distantes avant une synchronisation."],
["Annulation prudente","git restore fichier; git revert COMMIT","restore abandonne des modifications locales ciblées ; revert crée un commit inverse.","git revert <identifiant_commit>","Éviter reset --hard et les suppressions forcées tant que l'historique n'est pas compris."]
]},
"06": {title:"SQL — requêtes et données", intro:"SQL décrit des opérations sur des données relationnelles. Les résultats dépendent du schéma et du moteur de base de données.", entries:[
["Lire des données","SELECT colonnes FROM table","Sélectionne les colonnes demandées.","SELECT nom, ville FROM utilisateurs;","Limiter les colonnes aux données nécessaires."],
["Filtrer et trier","WHERE, ORDER BY, LIMIT","Filtre les lignes, les trie et limite le nombre de résultats.","SELECT nom FROM utilisateurs WHERE actif = TRUE ORDER BY nom;","Les valeurs nulles se testent avec IS NULL."],
["Agrégations","COUNT, SUM, AVG, GROUP BY, HAVING","Calcule des statistiques par groupe.","SELECT ville, COUNT(*) FROM utilisateurs GROUP BY ville;","Comprendre quelles colonnes sont agrégées ou groupées."],
["Jointures","JOIN … ON","Associe les lignes de tables liées.","SELECT u.nom, c.titre FROM utilisateurs u JOIN cours c ON c.user_id = u.id;","Vérifier les clés de jointure pour éviter les doublons inattendus."],
["Écrire des données","INSERT, UPDATE, DELETE","Ajoute, modifie ou supprime des lignes.","UPDATE utilisateurs SET actif = FALSE WHERE id = 12;","Toujours vérifier le WHERE et utiliser une transaction lorsque nécessaire."],
["Sécurité des requêtes","Requêtes paramétrées","Sépare la structure SQL des valeurs fournies par l'utilisateur.","SELECT * FROM utilisateurs WHERE email = ?","Ne pas construire une requête en concaténant directement une entrée utilisateur."]
]},
"07": {title:"Réseaux — protocoles et diagnostic", intro:"Les commandes réseau inspectent une configuration ou testent une connexion. Le résultat dépend du système et du réseau.", entries:[
["Configuration IP","ip addr; ip route (Linux)","Affiche les adresses des interfaces et les routes connues.","ip addr\nip route","Sur Windows, les commandes courantes diffèrent, par exemple ipconfig."],
["Résolution DNS","nslookup nom; dig nom","Interroge le système DNS pour obtenir des informations sur un nom.","nslookup example.com","Un échec DNS ne signifie pas toujours que la connexion IP est coupée."],
["Connectivité","ping hôte","Teste si des réponses ICMP reviennent d'un hôte.","ping example.com","Certains réseaux bloquent ICMP ; l'absence de réponse ne prouve pas à elle seule une panne."],
["Chemin réseau","traceroute hôte / tracert hôte","Aide à observer les sauts sur un chemin réseau.","tracert example.com","Les routeurs peuvent ne pas répondre aux sondes."],
["HTTP","GET, POST, status codes, headers","HTTP définit les requêtes et réponses entre client et serveur.","GET / HTTP/1.1","Ne pas placer de secrets dans les URL ; HTTPS protège le transport, pas toutes les erreurs applicatives."],
["Ports et services","IP, TCP/UDP, port","L'adresse IP identifie une interface réseau ; le port désigne un point de communication.","Exemple conceptuel : 192.0.2.10:443","N'analyser que ses systèmes ou des environnements explicitement autorisés."]
]},
"08": {title:"Linux — commandes et shell", intro:"Le shell interprète les commandes. Une commande peut avoir des options, des arguments, une entrée, une sortie et un code de retour.", entries:[
["Se repérer","pwd; ls; cd","Affiche le dossier courant, liste le contenu et change de dossier.","pwd\nls -la\ncd Documents","Comprendre chemins absolus et relatifs avant toute modification."],
["Créer et copier","mkdir; cp; mv","Crée un dossier, copie ou déplace/renomme des fichiers.","mkdir labo\ncp exemple.txt labo/","Vérifier la destination et les fichiers existants."],
["Lire et rechercher","cat; less; head; tail; grep; find","Affiche des fichiers, parcourt leur contenu ou recherche des correspondances.","grep -n 'erreur' journal.txt","Éviter d'afficher des fichiers contenant des secrets."],
["Pipes et redirections","|, >, >>, <","Relie la sortie d'une commande à une autre ou redirige les flux.","grep 'INFO' journal.txt | wc -l","> remplace le contenu du fichier de destination ; >> ajoute à la fin."],
["Permissions","chmod; chown; rwx","Contrôle les droits de lecture, écriture et exécution pour les catégories d'utilisateurs.","ls -l","Ne pas élargir les droits sans raison ; privilégier le moindre privilège."],
["Processus et aide","ps; top; man; commande --help","Observe les processus et consulte la documentation d'une commande.","ps aux\nls --help","Comprendre une commande avant de l'exécuter ; éviter les commandes destructrices ou privilégiées non comprises."]
]},
"09": {title:"Cybersécurité — concepts défensifs", intro:"Ce module privilégie l'identification des risques, la configuration sûre, la surveillance et les exercices défensifs.", entries:[
["Risque et vulnérabilité","Actif → menace → vulnérabilité → impact","Décrit ce qui doit être protégé, ce qui peut mal tourner et ses conséquences.","Exercice : analyser une application fictive.","Ne pas confondre une vulnérabilité et un incident confirmé."],
["Authentification et autorisation","MFA; rôles; moindre privilège","L'authentification vérifie l'identité ; l'autorisation définit les actions permises.","Créer une matrice rôle / permissions.","Ne pas partager les comptes ni les secrets d'accès."],
["Mises à jour","Inventaire; versions; correctifs","Les versions et correctifs réduisent l'exposition aux failles connues.","Tenir un inventaire de logiciels de laboratoire.","Tester les mises à jour avant déploiement critique."],
["Journaux","Événement, horodatage, source, résultat","Les journaux permettent de corréler des événements et construire une chronologie.","Analyser un jeu de logs fictifs.","Minimiser les données personnelles et protéger les journaux."],
["Sauvegardes","Copie; rétention; test de restauration","Une sauvegarde utile doit pouvoir être restaurée.","Restaurer un fichier de test depuis une copie.","Une sauvegarde jamais testée n'est pas une preuve de récupération."],
["Réponse à incident","Détecter, contenir, préserver, corriger, apprendre","Suit une procédure documentée et traçable.","Rédiger un rapport d'incident simulé.","Respecter les autorisations et préserver les preuves."]
]},
"10": {title:"Cryptographie — primitives et usages", intro:"La cryptographie repose sur des primitives différentes, qui ne sont pas interchangeables.", entries:[
["Encodage vs chiffrement","Base64 n'est pas un chiffrement","Un encodage transforme la représentation ; le chiffrement nécessite une clé et vise la confidentialité.","Comparer texte, Base64 et chiffrement dans un exemple pédagogique.","Ne jamais considérer Base64 comme une protection d'un secret."],
["Hachage","SHA-256 et fonction de hachage","Produit une empreinte de taille fixe pour vérifier l'intégrité.","Calculer l'empreinte d'un fichier de test avec un outil local.","Un hachage simple ne remplace pas un mécanisme adapté au stockage de mots de passe."],
["Chiffrement symétrique","Même clé secrète pour chiffrer et déchiffrer","Convient aux données volumineuses lorsque la clé est gérée correctement.","Étudier un exemple avec une bibliothèque maintenue.","Ne pas inventer son propre algorithme cryptographique."],
["Cryptographie asymétrique","Clé publique et clé privée","Permet notamment l'échange de clés et les signatures numériques.","Observer une paire de clés de démonstration.","La clé privée doit rester confidentielle."],
["Signatures et certificats","Signature, chaîne de confiance, certificat","Aide à vérifier l'origine et l'intégrité et à associer une clé à une identité.","Inspecter les détails d'un certificat public dans le navigateur.","Un cadenas ne prouve pas que le contenu du site est honnête."],
["Gestion des clés","Génération, stockage, rotation, révocation","La sécurité dépend aussi de la gestion du cycle de vie des clés.","Dessiner le cycle de vie d'une clé fictive.","Ne jamais publier de clé privée ou de secret."]
]},
"11": {title:"Sécurité web — prévention et tests autorisés", intro:"Les tests pratiques doivent se faire sur une application locale, un laboratoire ou un système pour lequel l'autorisation est explicite.", entries:[
["Validation des entrées","Type, longueur, format, règles métier","Valide les données selon ce que l'application attend.","Tester une liste d'entrées fictives dans un formulaire local.","La validation seule ne remplace pas l'encodage en sortie ou les requêtes paramétrées."],
["Injection SQL","Requêtes paramétrées","Transmet les valeurs séparément de la structure de la requête SQL.","Comparer une requête concaténée et une requête paramétrée dans un exemple local.","Ne pas tester un site tiers sans autorisation."],
["XSS et affichage","textContent; encodage contextuel; CSP","Évite que des données soient interprétées comme du code actif dans le navigateur.","Afficher une chaîne de test comme texte inerte.","Éviter innerHTML pour afficher des données non fiables."],
["Sessions et cookies","Secure; HttpOnly; SameSite","Réduit certains risques liés au vol ou à l'envoi involontaire de cookies.","Inspecter les attributs de cookies d'une application de test.","Un cookie correctement configuré ne corrige pas à lui seul tous les défauts de session."],
["Contrôle d'accès","Autorisation côté serveur","Vérifie les permissions sur chaque ressource et action sensible.","Tester des rôles fictifs dans une application locale.","Masquer un bouton côté interface n'est pas un contrôle d'accès suffisant."],
["Méthodologie de test","Portée, preuve, impact, correction, re-test","Documente les tests et confirme que les corrections fonctionnent.","Créer un rapport de test sur une application volontairement vulnérable locale.","Respecter strictement la portée autorisée."]
]},
"12": {title:"OSINT — recherche responsable d'informations publiques", intro:"L'OSINT organise des informations accessibles légalement pour répondre à une question définie, en minimisant les données personnelles.", entries:[
["Définir la question","Objectif, périmètre, sources","Formule une question précise avant de collecter des informations.","Étude fictive d'une entreprise inventée.","Ne pas cibler la vie privée d'une personne ni collecter des données sensibles sans nécessité légitime."],
["Évaluer une source","Auteur, date, provenance, corroboration","Évalue la fiabilité et compare les informations entre sources indépendantes.","Comparer deux pages publiques de test.","Une information publique peut être fausse ou sortie de son contexte."],
["Recherches web","Opérateurs de recherche documentés","Affinent une recherche dans des contenus publics.","Rechercher les documents publics d'une organisation fictive.","Respecter les conditions d'utilisation et les limites d'accès."],
["Métadonnées","Auteur, date, logiciel, contexte","Les métadonnées peuvent donner du contexte sur un fichier ou document.","Inspecter un fichier d'exemple créé pour l'exercice.","Retirer les métadonnées personnelles avant publication si nécessaire."],
["Vérification d'images","Contexte, date, source originale","Recherche la provenance et vérifie les indices plutôt que de conclure trop vite.","Analyser une image libre prévue pour l'exercice.","Ne pas identifier ou localiser une personne privée."],
["Rapport OSINT","Faits, hypothèses, confiance, limites","Sépare les observations vérifiées des interprétations.","Écrire un rapport sur une organisation fictive.","Collecter le minimum nécessaire et documenter les incertitudes."]
]},
"13": {title:"Analyse d'incidents — investigation défensive", intro:"L'objectif est d'établir les faits, préserver les données pertinentes et produire des actions correctives vérifiables.", entries:[
["Préserver les éléments","Horodatage, copie, intégrité, traçabilité","Documente la provenance et les transformations des éléments analysés.","Tenir un journal de manipulation d'un fichier de test.","Ne pas altérer la source originale ; suivre les règles de l'organisation."],
["Lire des journaux","Filtres, chronologie, corrélation","Relie les événements avec des horodatages et des identifiants pertinents.","Construire une chronologie depuis des logs fictifs.","Tenir compte des fuseaux horaires et des horloges désynchronisées."],
["Hypothèses","Indice, hypothèse, vérification","Une hypothèse doit pouvoir être testée et remise en question.","Lister les preuves qui confirment ou contredisent chaque hypothèse.","Ne pas présenter une supposition comme un fait établi."],
["Contenir et corriger","Procédure, responsables, validation","Applique des mesures proportionnées et documentées.","Simuler une décision de confinement dans un scénario écrit.","Les actions sur un système réel suivent la procédure et les autorisations prévues."],
["Rapport","Résumé, portée, faits, impact, actions","Communique les faits, les limites et les prochaines étapes.","Rédiger un rapport sur un incident fictif.","Éviter d'inclure des secrets ou des données personnelles inutiles."],
["Retour d'expérience","Cause racine et mesures durables","Réduit le risque de répétition plutôt que de chercher uniquement un responsable.","Proposer trois mesures mesurables.","Chaque action doit avoir un responsable et un critère de vérification."]
]},
"14": {title:"Projet final — autonomie et documentation", intro:"Le projet final valide la capacité à concevoir, expliquer, tester, sécuriser et documenter une réalisation.", entries:[
["Planifier","Objectifs, utilisateurs, contraintes, critères","Définit le résultat attendu et les conditions de réussite.","Écrire un mini cahier des charges.","Réduire le périmètre si les critères ne peuvent pas être testés."],
["Construire","Petites étapes et commits compréhensibles","Développe progressivement en conservant un historique exploitable.","Créer une branche et livrer une petite fonctionnalité.","Ne pas stocker de secrets dans le dépôt."],
["Tester","Cas normaux, limites, erreurs, accessibilité","Vérifie le comportement attendu et les situations inhabituelles.","Créer une checklist de tests reproductibles.","Un test réussi ne prouve pas l'absence de tous les défauts."],
["Sécuriser","Données, permissions, dépendances, erreurs","Réduit les risques et évite d'exposer des informations inutiles.","Faire une revue défensive de sa propre application.","Ne tester que les ressources incluses dans le périmètre autorisé."],
["Documenter","README, installation, usage, limites","Permet à une autre personne de reproduire et comprendre le projet.","Rédiger une procédure de démarrage étape par étape.","Préciser les prérequis et les versions."],
["Soutenance","Démonstration, décisions, limites, améliorations","Explique les choix et reconnaît les points à améliorer.","Présenter le projet en cinq minutes.","Ne pas revendiquer une fonctionnalité ou un test non réalisé."]
]}
};
