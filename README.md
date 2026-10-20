# Le Code et la Cybersécurité de A à Z

**Parcours pédagogique statique, gratuit et accessible** pour apprendre progressivement le développement web et la cybersécurité défensive.

**Parcours :** HTML → CSS → JavaScript → Python → Git/GitHub → SQL → Réseaux → Linux → Cybersécurité → Cryptographie → Sécurité web → OSINT → Analyse → Projet final.

Les exercices de sécurité sont destinés à des environnements autorisés et à des données fictives. Aucun exercice ne doit être lancé contre un système tiers sans autorisation explicite.

## Démarrer

Le site est publié avec GitHub Pages :
https://ethangalea1000-svg.github.io/Le-code-et-la-cybersecurite-de-A-a-Z/

Pour tester localement, clonez le dépôt puis servez le dossier racine avec un serveur HTTP statique. Ouvrir directement les fichiers avec `file://` peut empêcher certaines fonctions du navigateur.

## Tests qualité

Prérequis : Python 3 et Node.js.

```bash
python3 scripts/check_site.py
python3 scripts/check_project.py
node scripts/check_learning.js
npm install
npx playwright install chromium
npm run test:e2e
```

La CI GitHub Actions exécute les contrôles statiques et les tests Playwright à chaque push sur `main` et sur les pull requests.

## Laboratoire SQL local

Le fichier `labs/sql/mock-data.sql` crée une table `utilisateurs` et 50 enregistrements fictifs pour les exercices SQLite/sql.js. Les valeurs de `password_hash` sont des marqueurs de démonstration non exploitables, pas de vrais hashes. N'importez jamais ce jeu de données dans une base de production.

## Contribuer

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) avant de proposer un changement. Signalez les problèmes de sécurité selon [SECURITY.md](SECURITY.md).

---

# English

**Le Code et la Cybersécurité de A à Z** is a free, static learning platform for web development and defensive cybersecurity.

The learning path covers HTML, CSS, JavaScript, Python, Git/GitHub, SQL, networking, Linux, cybersecurity, cryptography, web security, OSINT, analysis and a final project.

All security exercises must remain within authorized environments and use fictional data. Never test against third-party systems without explicit permission.

## Run quality checks

Requirements: Python 3 and Node.js.

```bash
python3 scripts/check_site.py
python3 scripts/check_project.py
node scripts/check_learning.js
npm install
npx playwright install chromium
npm run test:e2e
```

The SQL demo dataset at `labs/sql/mock-data.sql` contains 50 fictional records for local SQLite/sql.js practice. Password-hash fields are clearly marked non-usable demo placeholders, not real hashes. Do not import this dataset into production.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contributions and [SECURITY.md](SECURITY.md) for security reporting.
