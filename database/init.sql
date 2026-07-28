-- Schéma de la base Symphonia
-- Ce script est exécuté automatiquement au premier démarrage du conteneur PostgreSQL.

-- Table des utilisateurs de l'application
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL, -- haché avec BCrypt, jamais en clair
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    -- rôle global de l'utilisateur dans l'application
    role VARCHAR(30) NOT NULL DEFAULT 'membre'
        CHECK (role IN ('super_admin', 'administrateur_ensemble', 'responsable_partition', 'membre')),
    email_valide BOOLEAN NOT NULL DEFAULT FALSE,
    token_validation VARCHAR(255), -- token unique envoyé par email, effacé une fois le compte validé
    date_creation TIMESTAMP NOT NULL DEFAULT NOW()
);
