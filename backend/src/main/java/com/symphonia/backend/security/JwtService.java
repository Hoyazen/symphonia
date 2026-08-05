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

    private final SecretKey cleSecrete;
    private final long dureeValiditeMs;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long dureeValiditeMs) {
        this.cleSecrete = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));

        this.dureeValiditeMs = dureeValiditeMs;
    }

    // Génère un token contenant l'email et le statut administrateur
    public String genererToken(String email, boolean superAdmin) {

        Date maintenant = new Date();
        Date expiration = new Date(
                maintenant.getTime() + dureeValiditeMs);

        return Jwts.builder()
                .subject(email)
                .claim("superAdmin", superAdmin)
                .issuedAt(maintenant)
                .expiration(expiration)
                .signWith(cleSecrete)
                .compact();
    }

    // Lit l'email contenu dans le token
    public String extraireEmail(String token) {
        return extraireClaims(token).getSubject();
    }

    // Lit le statut administrateur
    public boolean extraireSuperAdmin(String token) {
        Boolean valeur = extraireClaims(token)
                .get("superAdmin", Boolean.class);

        return Boolean.TRUE.equals(valeur);
    }

    public boolean estValide(String token) {
        try {
            extraireClaims(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    private Claims extraireClaims(String token) {

        return Jwts.parser()
                .verifyWith(cleSecrete)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}