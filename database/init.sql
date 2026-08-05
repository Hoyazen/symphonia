-- Schéma de la base Symphonia
-- Ce script est exécuté automatiquement au premier démarrage du conteneur PostgreSQL.

BEGIN;

-- Utilisateurs et validation du compte

-- Table des utilisateurs de l'application
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    validated BOOLEAN NOT NULL DEFAULT FALSE,
    token_validation VARCHAR(255) UNIQUE,
    token_expiration TIMESTAMPTZ,
    profile_picture_url VARCHAR(1024),
    super_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Mise à jour de la structure si la table existait déjà
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_picture_url VARCHAR(1024);
ALTER TABLE users ADD COLUMN IF NOT EXISTS super_admin BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ALTER COLUMN validated SET DEFAULT FALSE;
ALTER TABLE users ALTER COLUMN created_at SET DEFAULT NOW();

-- Tokens utilisés lors de la validation des comptes
CREATE TABLE IF NOT EXISTS verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE, -- token envoyé par email
    expires_at TIMESTAMPTZ NOT NULL, -- date d'expiration du token
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Ensembles, membres et invitations

-- Table des ensembles musicaux
CREATE TABLE IF NOT EXISTS ensembles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL
);

-- Association entre un utilisateur et un ensemble

CREATE TYPE members_role AS ENUM (
    'MEMBER',
    'PARTITION_MANAGER',
    'ADMIN'
);

CREATE TABLE IF NOT EXISTS ensemble_members (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ensemble_id BIGINT NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE,

    -- rôle de l'utilisateur dans l'ensemble
    role members_role NOT NULL DEFAULT 'MEMBER';

    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, ensemble_id)
);

-- Invitations envoyées aux futurs membres
CREATE TABLE IF NOT EXISTS invitations (
    id BIGSERIAL PRIMARY KEY,
    ensemble_id BIGINT NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE,
    invited_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    invited_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT,
    token VARCHAR(255) NOT NULL UNIQUE, -- lien d'invitation
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'ACCEPTED', 'REFUSED', 'EXPIRED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ
);

-- Instruments ou pupitres appartenant à un ensemble
-- Exemples : soprano, alto, ténor, guitare, batterie...
CREATE TABLE IF NOT EXISTS instruments (
    id BIGSERIAL PRIMARY KEY,
    ensemble_id BIGINT NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,

    UNIQUE (ensemble_id, name)
);

-- Morceaux et documents

-- Morceaux appartenant à un ensemble
CREATE TABLE IF NOT EXISTS songs (
    id BIGSERIAL PRIMARY KEY,
    ensemble_id BIGINT NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    composer VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Documents associés à un morceau
CREATE TABLE IF NOT EXISTS documents (
    id BIGSERIAL PRIMARY KEY,
    song_id BIGINT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    uploaded_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,

    -- type du document
    document_type VARCHAR(30) NOT NULL
        CHECK (document_type IN (
            'SCORE',
            'AUDIO',
            'IMAGE',
            'SOFTWARE',
            'EXTERNAL_LINK',
            'OTHER'
        )),

    description TEXT,
    file_path VARCHAR(1024), -- chemin du fichier stocké
    external_url VARCHAR(2048), -- lien externe éventuel
    mime_type VARCHAR(150),
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- un document doit être soit un fichier, soit un lien
    CHECK (file_path IS NOT NULL OR external_url IS NOT NULL)
);

-- Association entre les documents et les instruments concernés
CREATE TABLE IF NOT EXISTS document_instruments (
    document_id BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    instrument_id BIGINT NOT NULL REFERENCES instruments(id) ON DELETE CASCADE,

    PRIMARY KEY (document_id, instrument_id)
);

-- Historique des modifications et suppressions des morceaux
CREATE TABLE IF NOT EXISTS song_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    song_id BIGINT NOT NULL,
    action VARCHAR(10) NOT NULL
        CHECK (action IN ('UPDATE', 'DELETE')),
    song_title VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour améliorer les performances des recherches

CREATE INDEX IF NOT EXISTS idx_ensemble_members_ensemble_id
    ON ensemble_members(ensemble_id);

CREATE INDEX IF NOT EXISTS idx_invitations_ensemble_id
    ON invitations(ensemble_id);

CREATE INDEX IF NOT EXISTS idx_invitations_email
    ON invitations(email);

CREATE INDEX IF NOT EXISTS idx_instruments_ensemble_id
    ON instruments(ensemble_id);

CREATE INDEX IF NOT EXISTS idx_songs_ensemble_id
    ON songs(ensemble_id);

CREATE INDEX IF NOT EXISTS idx_songs_title
    ON songs(title);

CREATE INDEX IF NOT EXISTS idx_documents_song_id
    ON documents(song_id);

CREATE INDEX IF NOT EXISTS idx_document_instruments_instrument_id
    ON document_instruments(instrument_id);

CREATE INDEX IF NOT EXISTS idx_song_audit_logs_song_id
    ON song_audit_logs(song_id);

-- Fonctions et déclencheurs

-- Met automatiquement à jour la date de modification d'un morceau
CREATE OR REPLACE FUNCTION set_song_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enregistre les modifications et suppressions des morceaux
CREATE OR REPLACE FUNCTION audit_song_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO song_audit_logs (
            song_id,
            action,
            song_title,
            details
        )
        VALUES (
            OLD.id,
            'UPDATE',
            NEW.title,
            'Modification du morceau'
        );

        RETURN NEW;
    END IF;

    INSERT INTO song_audit_logs (
        song_id,
        action,
        song_title,
        details
    )
    VALUES (
        OLD.id,
        'DELETE',
        OLD.title,
        'Suppression du morceau'
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_10_set_song_updated_at ON songs;

CREATE TRIGGER trg_10_set_song_updated_at
BEFORE UPDATE ON songs
FOR EACH ROW
EXECUTE FUNCTION set_song_updated_at();

DROP TRIGGER IF EXISTS trg_20_audit_song_change ON songs;

CREATE TRIGGER trg_20_audit_song_change
AFTER UPDATE OR DELETE ON songs
FOR EACH ROW
EXECUTE FUNCTION audit_song_change();

COMMIT;