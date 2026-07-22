package com.symphonia.backend.dto;

// Réponse renvoyée après une inscription ou une connexion réussie
public class AuthResponse {

    private String token;
    private String email;
    private String prenom;
    private String nom;
    private String role;

    public AuthResponse(String token, String email, String prenom, String nom, String role) {
        this.token = token;
        this.email = email;
        this.prenom = prenom;
        this.nom = nom;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getRole() {
        return role;
    }
}
