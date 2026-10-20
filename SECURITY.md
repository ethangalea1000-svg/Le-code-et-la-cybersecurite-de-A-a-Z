# Sécurité du projet

## Signaler une vulnérabilité

Merci de ne pas publier de mot de passe, de jeton, de donnée personnelle ou d'exploit utilisable contre un tiers dans une issue publique.

Pour signaler un problème, ouvre une issue GitHub en décrivant :
- la page et le composant concernés ;
- les étapes minimales pour reproduire le problème ;
- l'impact observé et, si possible, une capture expurgée de données personnelles.

En attendant une procédure privée dédiée, ne joins aucun secret ou donnée sensible. Les issues publiques sont visibles par tous.

## Périmètre et limites

- Le site est un site statique hébergé sur GitHub Pages.
- Les exercices de cybersécurité doivent rester dans le laboratoire pédagogique ou sur des systèmes pour lesquels l'utilisateur a une autorisation explicite.
- Ne colle pas de vrais identifiants, de jetons d'accès, de données personnelles ou de journaux sensibles dans les exercices.
- Les contrôles automatisés du dépôt vérifient notamment la syntaxe JavaScript, certaines données pédagogiques, les références locales, le sitemap et le sandbox de l'atelier. Ils ne remplacent pas un audit de sécurité, un test navigateur complet ni une mesure des en-têtes HTTP en production.
- GitHub Pages ne permet pas de configurer tous les en-têtes HTTP de serveur comme le ferait un serveur contrôlé par le projet. Ne considère pas une politique de sécurité comme effective tant qu'elle n'a pas été mesurée sur le site déployé.

## Bonnes pratiques de contribution

- N'ajoute jamais de clé API, mot de passe ou jeton au dépôt.
- Valide et neutralise les données avant de les insérer dans le DOM.
- Garde les exercices offensifs simulés et limités à des données fictives.
- Ajoute des tests qui reproduisent le défaut corrigé.
