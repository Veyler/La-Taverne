# La Taverne

Application collaborative multi-plateforme pour partager et discuter en temps réel.

## Description

La Taverne est une application composée de trois parties :
- **Serveur** : Backend Node.js avec Express, Firebase et Socket.io pour la communication en temps réel
- **Client Web** : Application web pour accéder à La Taverne via navigateur
- **Client Desktop** : Application Electron pour une expérience native sur Windows, macOS et Linux

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Firebase (credentials configurées via `serviceAccountKey.json`)

## Installation

### 1. Cloner le dépôt
```bash
git clone <repository-url>
cd la_taverne
```

### 2. Installer les dépendances du serveur
```bash
cd server
npm install
```

### 3. Installer les dépendances du client web
```bash
cd ../client_web
npm install
```

### 4. Installer les dépendances du client desktop
```bash
cd ../client_app
npm install
```

## Configuration

### Serveur
Créez un fichier `.env` dans le dossier `server/` :
```
PORT=3000
FIREBASE_PROJECT_ID=<votre-project-id>
JWT_SECRET=<votre-secret>
```

Assurez-vous que `serviceAccountKey.json` est présent dans le dossier `server/`.

## Démarrage

### Démarrer le serveur
```bash
cd server
npm start
```
Le serveur démarre sur `http://localhost:3000`

### Démarrer le client web
```bash
cd client_web
npm start
```

### Démarrer le client desktop
```bash
cd client_app
npm start
```

## Build

### Build du client Electron
```bash
cd client_app
npm run build:win     # Pour Windows
npm run build         # Pour toutes les plateformes
```
Vous pouvez également installer l'installateur dans la dernière release.

## Structure du projet

```
la_taverne/
├── server/                    # Backend Node.js
│   ├── index.js              # Point d'entrée du serveur
│   ├── firestore.js          # Configuration Firebase
│   ├── package.json
│   └── serviceAccountKey.json
│
├── client_web/               # Application web
│   ├── pages/                # Pages HTML
│   ├── js/                   # Scripts JavaScript
│   ├── css/                  # Feuilles de style
│   └── assets/               # Images et ressources
│
├── client_app/               # Application Electron
│   ├── main.js               # Point d'entrée Electron
│   ├── pages/                # Pages HTML
│   ├── js/                   # Scripts JavaScript
│   ├── css/                  # Feuilles de style
│   ├── assets/               # Icônes et ressources
│   └── package.json
│
└── README.md
```

## Technologies utilisées

### Backend
- **Express** : Framework web Node.js
- **Firebase Admin SDK** : Gestion de la base de données Firestore
- **Socket.io** : Communication en temps réel via WebSocket
- **JWT** : Authentification sécurisée
- **CORS** : Gestion des requêtes cross-origin

### Frontend
- **Electron** : Framework pour application desktop
- **HTML5/CSS3/JavaScript** : Technologies web standard

## Scripts disponibles

### Serveur
- `npm start` : Démarre le serveur

### Client App (Electron)
- `npm start` : Lance l'application en développement
- `npm run build` : Build pour toutes les plateformes
- `npm run build:win` : Build pour Windows (NSIS + Portable)


<h3 align="center">Fait avec ❤️ par Veyler</h3>










