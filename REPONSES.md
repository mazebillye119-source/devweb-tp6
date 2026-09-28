### Donner la commande httpie correspondant à la commande curl donnée par la doc pour la route POST.
    - http POST http://localhost:8080/api-v1/ url="https://perdu.com"

### Démarrer l’application en mode production avec npm run prod puis en mode développement avec npm run dev. Donner les principales différences entre les deux modes.
    - dev : redémarre automatiquement à chaque modification et trace des erreurs.
    - prod : ne redemarre pas automatiquement, pas de Morgan

### Donner le script npm qui permet de formatter automatiquement tous les fichiers .mjs
    - il faut ajoute "format": "prettier --write \"**/*.mjs\"" dans le script du fichier package.json

### Les réponses HTTP contiennent une en-tête X-Powered-By. Donner la configuration Express à modifier pour qu’elle n’apparaisse plus.
    - La configuration Express est : app.disable("x-powered-by");

### Créer un nouveau middleware (niveau application) qui ajoute un header X-API-version avec la version de l’application. Donner le code.
    app.use((request, response, next) => {
    response.setHeader("X-API-version", "1.0.0");
    next();
    });
    
### Trouver un middleware Express qui permet de répondre aux requêtes favicon.ico avec static/logo_univ_16.png. Donner le code.
    import favicon from "serve-favicon";
    app.use(favicon("static/logo_univ_16.png"));

### Donner les liens vers la documentation du driver SQLite utilisé dans l’application.
    Le driver utilisé est "better-sqlite3" :
    - https://github.com/WiseLibs/better-sqlite3
    - https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md

### Indiquer à quels moments la connexion à la base de données est ouverte est quand elle est fermée.


### Avec un navigateur en mode privé visiter une première fois http://localhost:8080/, puis une deuxième. Ensuite rechargez avec Ctrl+Shift+R. Conclure sur la gestion du cache par Express.


### Ouvrir deux instances de l’application, une sur le port 8080 avec npm run dev et une autre sur le port 8081 avec la commande cross-env PORT=8081 NODE_ENV=development npx nodemon server.mjs. Créer un lien sur la première instance http://localhost:8080/ et ensuite un autre sur la seconde instante http://localhost:8081/. Les liens de l’un doivent être visibles avec l’autre. Expliquer pourquoi.