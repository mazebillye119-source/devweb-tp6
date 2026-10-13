# TP6 – Réducteur d'URL
    Service de réduction d'URL en Node.js / Express.

## Installation
    npm install
    npm run dev

## Scripts
    - npm run dev : mode développement
    - npm run prod : mode production
    - npm run format : formate le code

## URLs
    - Application : http://localhost:8080/
    - Client AJAX : http://localhost:8080/client.html
    - Documentation : http://localhost:8080/api-docs/

## API

### API v1 (`/api-v1`)
    - GET / : nombre de liens
    - POST / : créer un lien
    - GET /status/:url : statut d'un lien
    - GET /:url : redirection

### API v2 (`/api-v2`)
    - GET / : count (JSON) ou page (HTML)
    - POST / : créer (JSON ou HTML)
    - GET /:url : infos (JSON) ou redirection (HTML)
    - DELETE /:url : supprimer avec header X-API-KEY

## Déploiement

En ligne sur Render : https://devweb-tp6-maze.onrender.com