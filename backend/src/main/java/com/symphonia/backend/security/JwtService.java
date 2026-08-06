package com.symphonia.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

// Création et vérification des tokens JWT
@Component
public class JwtService {

    private final SecretKey secretKey;
    private final long validityDurationMs;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long validityDurationMs) {
        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));

        this.validityDurationMs = validityDurationMs;
    }

    // Génère un token contenant l'email et le statut administrateur
    public String generateToken(String email, boolean superAdmin) {

        Date now = new Date();
        Date expiration = new Date(
                now.getTime() + validityDurationMs);

        return Jwts.builder()
                .subject(email)
                .claim("superAdmin", superAdmin)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(secretKey)
                .compact();
    }

    // Lit l'email contenu dans le token
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // Lit le statut administrateur
    public boolean extractSuperAdmin(String token) {
        Boolean value = extractClaims(token)
                .get("superAdmin", Boolean.class);

        return Boolean.TRUE.equals(value);
    }

    public boolean isValid(String token) {
        try {
            extractClaims(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
