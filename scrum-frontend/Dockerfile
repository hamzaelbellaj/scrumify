# Étape de construction
FROM node:18 AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Étape de production
FROM node:18

WORKDIR /app

# Copier les fichiers construits depuis l'étape de construction
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules /app/node_modules

# Ajouter un simple serveur express pour servir les fichiers statiques
RUN npm install express

# Créer un fichier server.js pour servir les fichiers construits
RUN echo "const express = require('express'); const path = require('path'); const app = express(); app.use(express.static(path.join(__dirname, 'build'))); app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')); }); app.listen(3000, () => { console.log('Server is running on port 3000'); });" > server.js

# Exposer le port 3000
EXPOSE 3000

# Commande par défaut pour démarrer le serveur Express
CMD ["node", "server.js"]
