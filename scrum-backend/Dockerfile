FROM openjdk:17-alpine AS build

WORKDIR /app

# Installer Maven et dockerize
RUN apk --no-cache add maven wget && \
    wget -O /usr/local/bin/dockerize https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf /usr/local/bin/dockerize && \
    chmod +x /usr/local/bin/dockerize

# Copier uniquement les fichiers pom.xml et settings.xml
COPY pom.xml ./

# Télécharger les dépendances uniquement
RUN mvn dependency:go-offline

# Copier le reste des fichiers du projet
COPY src ./src

# Construire le projet
RUN mvn package -DskipTests

# Copier le fichier JAR final dans un répertoire approprié à l'intérieur du conteneur
RUN cp target/scrumbackend-0.0.1-SNAPSHOT.jar /app/app.jar

# Commande pour démarrer l'application
CMD ["java", "-jar", "/app/app.jar"]
