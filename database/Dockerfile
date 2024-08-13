# Utiliser l'image de base de MongoDB
FROM mongo:latest

# Copier les fichiers CSV dans le répertoire d'initialisation de MongoDB
COPY . /docker-entrypoint-initdb.d/

# Assurez-vous que MongoDB utilise le bon répertoire
VOLUME ["/data/db"]

# Exposez le port MongoDB
EXPOSE 27017