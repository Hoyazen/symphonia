# Symphonia

Application web de gestion et de partage de partitions pour ensembles musicaux
(chorales, groupes, orchestres).

## Structure du projet

```
Symphonia/
├── database/       schéma SQL (init.sql)
├── design/         maquette de référence (HTML)
├── backend/        API Spring Boot (Java)
├── frontend/       application Next.js
└── docker-compose.yml
```

## Prérequis

- Docker + Docker Compose
- Java 21+ et Maven
- Node.js 18+ et npm

## Lancer le projet en local

### 1. Base de données et emails (Docker)

```bash
docker compose up -d
```

Cela démarre :
- **PostgreSQL** sur le port `5432` (schéma créé automatiquement via `database/init.sql`)
- **Mailpit** (serveur mail de test) : SMTP sur `1025`, interface web sur http://localhost:8025

### 2. Backend (Spring Boot)

```bash
cd backend
cp .env.example .env   # puis complète les valeurs si besoin
mvn spring-boot:run
```

L'API démarre sur http://localhost:8080

### 3. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Le site est accessible sur http://localhost:3000

## Arrêter les conteneurs

```bash
docker compose down
```

Ajoute `-v` pour supprimer aussi les données de la base (`docker compose down -v`).
