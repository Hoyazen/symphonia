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

// Accès à la table "utilisateurs" en SQL brut via JdbcTemplate
@Repository
public class UtilisateurRepository {

    private final JdbcTemplate jdbcTemplate;

    public UtilisateurRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Transforme une ligne de résultat SQL en objet Utilisateur
    private final RowMapper<Utilisateur> rowMapper = (rs, rowNum) -> {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(rs.getLong("id"));
        utilisateur.setEmail(rs.getString("email"));
        utilisateur.setMotDePasse(rs.getString("mot_de_passe"));
        utilisateur.setPrenom(rs.getString("prenom"));
        utilisateur.setNom(rs.getString("nom"));
        utilisateur.setRole(rs.getString("role"));
        utilisateur.setEmailValide(rs.getBoolean("email_valide"));
        utilisateur.setTokenValidation(rs.getString("token_validation"));
        utilisateur.setDateCreation(rs.getTimestamp("date_creation").toLocalDateTime());
        return utilisateur;
    };

    public Optional<Utilisateur> trouverParEmail(String email) {
        List<Utilisateur> resultats = jdbcTemplate.query(
                "SELECT * FROM utilisateurs WHERE email = ?", rowMapper, email);
        return resultats.stream().findFirst();
    }

    public boolean existeParEmail(String email) {
        Integer nombre = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM utilisateurs WHERE email = ?", Integer.class, email);
        return nombre != null && nombre > 0;
    }

    public Optional<Utilisateur> trouverParTokenValidation(String token) {
        List<Utilisateur> resultats = jdbcTemplate.query(
                "SELECT * FROM utilisateurs WHERE token_validation = ?", rowMapper, token);
        return resultats.stream().findFirst();
    }

    // Marque le compte comme validé et efface le token (à usage unique)
    public void validerCompte(Long id) {
        jdbcTemplate.update(
                "UPDATE utilisateurs SET email_valide = TRUE, token_validation = NULL WHERE id = ?", id);
    }

    public Utilisateur creer(Utilisateur utilisateur) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO utilisateurs (email, mot_de_passe, prenom, nom, role, token_validation) VALUES (?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, utilisateur.getEmail());
            ps.setString(2, utilisateur.getMotDePasse());
            ps.setString(3, utilisateur.getPrenom());
            ps.setString(4, utilisateur.getNom());
            ps.setString(5, utilisateur.getRole());
            ps.setString(6, utilisateur.getTokenValidation());
            return ps;
        }, keyHolder);

        // Sur PostgreSQL, RETURN_GENERATED_KEYS renvoie toutes les colonnes : on cible "id"
        Number cle = (Number) keyHolder.getKeys().get("id");
        utilisateur.setId(cle != null ? cle.longValue() : null);
        return utilisateur;
    }
}
