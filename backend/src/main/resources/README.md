# Gestion des environnements

Démarrer le serveur en développement :

```sh
mvn spring-boot:run "-Dspring-boot.run.profiles=dev"
```

ou en production (`app.jar` à modifier en fonction du nom du `jar`) :

```sh
java -jar app.jar --spring.profiles.active=prod
```
