package com.symphonia.backend.repository;

import com.symphonia.backend.model.User;
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
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Transforme une ligne SQL en objet Utilisateur
    private final RowMapper<User> rowMapper = (rs, rowNum) -> {
        User user = new User();

        user.setId(rs.getLong("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password_hash"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setEmailValidated(rs.getBoolean("validated"));
        user.setValidationToken(rs.getString("token_validation"));

        if (rs.getTimestamp("created_at") != null) {
            user.setCreatedAt(
                    rs.getTimestamp("created_at").toLocalDateTime());
        }

        user.setProfilePictureUrl(
                rs.getString("profile_picture_url"));

        user.setSuperAdmin(
                rs.getBoolean("super_admin"));

        return user;
    };

    public Optional<User> findByEmail(String email) {
        List<User> results = jdbcTemplate.query(
                "SELECT * FROM users WHERE email = ?",
                rowMapper,
                email
        );

        return results.stream().findFirst();
    }

    public boolean existsByEmail(String email) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM users WHERE email = ?",
                Integer.class,
                email
        );

        return count != null && count > 0;
    }

    public Optional<User> findByValidationToken(String token) {
        List<User> results = jdbcTemplate.query(
                "SELECT * FROM users WHERE token_validation = ?",
                rowMapper,
                token
        );

        return results.stream().findFirst();
    }

    // Valide le compte et supprime le token après utilisation
    public void validateAccount(Long id) {
        jdbcTemplate.update(
                "UPDATE users SET validated = TRUE, token_validation = NULL WHERE id = ?",
                id
        );
    }

    public User create(User user) {

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {

            PreparedStatement statement = connection.prepareStatement(
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
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, user.getFirstName());
            statement.setString(2, user.getLastName());
            statement.setString(3, user.getEmail());
            statement.setString(4, user.getPassword());
            statement.setBoolean(5, user.isEmailValidated());
            statement.setString(6, user.getValidationToken());

            // Pour l'instant on ne gère pas l'expiration
            statement.setObject(7, null);

            statement.setString(8, user.getProfilePictureUrl());
            statement.setBoolean(9, user.isSuperAdmin());

            return statement;

        }, keyHolder);

        Number key = (Number) keyHolder.getKeys().get("id");

        user.setId(key != null ? key.longValue() : null);

        return user;
    }
}
