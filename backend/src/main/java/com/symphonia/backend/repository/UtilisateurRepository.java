package com.symphonia.backend.repository;

import com.symphonia.backend.model.Utilisateur;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

// Accès à la table "users" en SQL brut via JdbcTemplate
@Repository
public class UtilisateurRepository {

    private final JdbcTemplate jdbcTemplate;

    public UtilisateurRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Transforme une ligne SQL en objet Utilisateur
    private final RowMapper<Utilisateur> rowMapper = (rs, rowNum) -> {
        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setId(rs.getLong("id"));
        utilisateur.setEmail(rs.getString("email"));

        utilisateur.setMotDePasse(rs.getString("password_hash"));

        utilisateur.setPrenom(rs.getString("first_name"));
        utilisateur.setNom(rs.getString("last_name"));

        utilisateur.setEmailValide(rs.getBoolean("validated"));

        utilisateur.setTokenValidation(rs.getString("token_validation"));

        if (rs.getTimestamp("created_at") != null) {
            utilisateur.setDateCreation(
                    rs.getTimestamp("created_at").toLocalDateTime());
        }

        utilisateur.setPhotoProfil(rs.getString("profile_picture_url"));
        utilisateur.setSuperAdmin(rs.getBoolean("super_admin"));

        return utilisateur;
    };

    public Optional<Utilisateur> trouverParEmail(String email) {
        List<Utilisateur> resultats = jdbcTemplate.query(
                "SELECT * FROM users WHERE email = ?",
                rowMapper,
                email);

        return resultats.stream().findFirst();
    }

    public boolean existeParEmail(String email) {
        Integer nombre = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM users WHERE email = ?",
                Integer.class,
                email);

        return nombre != null && nombre > 0;
    }

    public Optional<Utilisateur> trouverParTokenValidation(String token) {
        List<Utilisateur> resultats = jdbcTemplate.query(
                "SELECT * FROM users WHERE token_validation = ?",
                rowMapper,
                token);

        return resultats.stream().findFirst();
    }

    // Valide le compte et supprime le token après utilisation
    public void validerCompte(Long id) {
        jdbcTemplate.update(
                "UPDATE users SET validated = TRUE, token_validation = NULL WHERE id = ?",
                id);
    }

    public Utilisateur creer(Utilisateur utilisateur) {

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement ps = connection.prepareStatement(
                    """
                            INSERT INTO users (
                                first_name,
                                last_name,
                                email,
                                password_hash,
                                validated,
                                token_validation,
                                token_expiration,
                                profile_picture_url,
                                super_admin
                            )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            """,
                    Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, utilisateur.getPrenom());
            ps.setString(2, utilisateur.getNom());
            ps.setString(3, utilisateur.getEmail());
            ps.setString(4, utilisateur.getMotDePasse());

            ps.setBoolean(5, utilisateur.isEmailValide());

            ps.setString(6, utilisateur.getTokenValidation());

            // Pour l'instant on ne gère pas l'expiration
            ps.setObject(7, null);

            ps.setString(8, utilisateur.getPhotoProfil());

            ps.setBoolean(9, utilisateur.isSuperAdmin());

            return ps;

        }, keyHolder);

        Number cle = (Number) keyHolder.getKeys().get("id");

        utilisateur.setId(
                cle != null ? cle.longValue() : null);

        return utilisateur;
    }
}