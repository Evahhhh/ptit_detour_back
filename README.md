# Back-end du projet "P'tit Détour" (avec Docker Compose)

Ce dépôt contient le code source du serveur back-end pour le projet "P'tit Détour".

Il s'agit d'une API centrale qui gère toute la logique métier et les données. Elle est conçue pour être consommée par deux clients :
- Une **application mobile**.
- Un **back-office web** pour l'administration.
Pour faciliter le déploiement, ce projet inclut une configuration Docker Compose.
## Technologies utilisées

Ce projet est construit avec les technologies suivantes :
- **Node.js**
- **Express.js** pour le serveur et le routage
- **Sequelize** comme ORM pour interagir avec la base de données

# Démarrage

### Méthode 1 : Sans Docker (installation manuelle)

1.  **Base de données :** Vous devez avoir une instance MySQL fonctionnant localement.
2.  **Configuration :** Dans le fichier `util/database.js`, assurez-vous que les informations (`host`, `database`, `user`, `password`) correspondent à votre configuration MySQL.

3.  **Installation des dépendances :**

    ```bash
    $ npm install
    ```

4.  **Lancement de l'application :**

    ```bash
    $ npm run dev
    ```

### Méthode 2 : Avec Docker Compose (recommandé)

Cette méthode utilise Docker pour lancer et gérer la base de données, vous n'avez donc pas besoin d'installer MySQL manuellement.

1.  **Lancer la base de données :** Si vous avez Docker et Docker Compose installés, exécutez la commande suivante. Elle va télécharger l'image MySQL, créer un conteneur pour la base de données nommée `centrale` et un autre pour phpMyAdmin.

    ```bash
    docker-compose up
    ```
    La base de données sera accessible sur `localhost:3306`, ce qui correspond à la configuration par défaut dans `util/database.js`.

2.  **Lancer l'application :** Dans un **autre terminal**, lancez l'application Node.js. Elle se connectera automatiquement à la base de données Docker, créera les tables et insérera les données initiales.

    ```bash
    # (Après avoir fait 'npm install' si ce n'est pas déjà fait)
    $ npm run dev
    ```
