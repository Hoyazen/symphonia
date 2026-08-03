-- Schema de reference pour Symphonia.
-- En dev, Hibernate genere/maintient ce schema automatiquement (ddl-auto: update).
-- Ce fichier suit le MLD LoopingSymphonia : User, Invitation, Belonging,
-- Ensemble, Song, Document, Instrument et Concerns.

CREATE TABLE IF NOT EXISTS users (
    id            BIGSERIAL PRIMARY KEY,
    first_name    VARCHAR(100)  NOT NULL,
    last_name     VARCHAR(100)  NOT NULL,
    email         VARCHAR(255)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,
    validated     BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP     NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verification_tokens (
    id         BIGSERIAL PRIMARY KEY,
    token      VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP    NOT NULL,
    user_id    BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON verification_tokens(user_id);

CREATE TABLE IF NOT EXISTS ensembles (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS belongings (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ensemble_id BIGINT       NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE,
    role        VARCHAR(50)  NOT NULL DEFAULT 'MEMBER',
    joined_at   TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_belongings_user_id ON belongings(user_id);
CREATE INDEX IF NOT EXISTS idx_belongings_ensemble_id ON belongings(ensemble_id);

CREATE TABLE IF NOT EXISTS invitations (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL,
    description TEXT,
    user_id     BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON invitations(user_id);

CREATE TABLE IF NOT EXISTS songs (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    composer    VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT now(),
    ensemble_id BIGINT       NOT NULL REFERENCES ensembles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_songs_ensemble_id ON songs(ensemble_id);

CREATE TABLE IF NOT EXISTS documents (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    type        VARCHAR(50)  NOT NULL,
    description TEXT,
    file_path   VARCHAR(500) NOT NULL,
    add_date    TIMESTAMP    NOT NULL DEFAULT now(),
    song_id     BIGINT       NOT NULL REFERENCES songs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_documents_song_id ON documents(song_id);

CREATE TABLE IF NOT EXISTS instruments (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS concerns (
    id            BIGSERIAL PRIMARY KEY,
    document_id   BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    instrument_id BIGINT NOT NULL REFERENCES instruments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_concerns_document_id ON concerns(document_id);
CREATE INDEX IF NOT EXISTS idx_concerns_instrument_id ON concerns(instrument_id);
