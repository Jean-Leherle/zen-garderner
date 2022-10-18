# Zen Gardener #

## Présentation ##

**Zen gardener** est le mvp d'un site mobile et destok d'assistance au jardiange.
Ce repos présente la partie back du site : une API REST consommé par [la partie front disponible ici](https://zen-gardener.netlify.app/)

## contexte ##

Ce rendu est le résultat de 1 mois de projet, conclusion de la formation [developpeur fullstack js](https://oclock.io/formations/developpeur-web-fullstack-javascript).
Nous étions 5 répartie en deux équipes de 3 dev front et 2 dev back.
La méthode SCRUM Agile a été utilisé pour gérer ce projet avec 4 sprint de 1 semaine.

### sprint 0 : la conception ###

Mise en place du cahier des charges avec MVP,  user stories, mcd, mld, modèle de données, wireframe, spécifications techniques, arborescence du site... Nous avions l'obligation de ne pas commencer a coder tant que ces documents n'étaient pas validé par l'équipe pédagogique.

### sprint 1 : premiere semaine de code ###

Création de la bdd sur pgsql avec un premier seeding et mise en place de versionning avec sqitch.
Déploiement (à vide) pour trouver une plateforme compatible.
Mise en place de JWT pour l'authentification et des premieres routes user et task.

### sprint 2 : deuxieme semaine de code ###

Verification de données avec joi, création de requetes SQL complexe (voir [concernant les fiches](./app/model/sheetsModel.js))Création des routes fiches et favorite. Mise en place de nodeMailer.

### sprint 3 : présentation imminente ###

Nous avions l'interdiction d'ajout de nouvelles fonctionnalités.
Donc correction de document, amélioration de [la doc swagger](https://zen-gardener-api.herokuapp.com/docs), création de test en réutilisant le banc d'essaie de Insomnia.
Préparation aussi de la présentation.

