package com.symphonia.backend.dto;

// Réponse renvoyée après une inscription ou une connexion réussie
public class AuthResponse {

    private String token;
    private String email;
    private String firstName;
    private String name;
    private String role;

    public AuthResponse(String token, String email, String firstName, String name, String role) {
        this.token = token;
        this.email = email;
        this.firstName = firstName;
        this.name = name;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getPrenom() {
        return firstName;
    }

    public String getNom() {
        return name;
    }

    public String getRole() {
        return role;
    }
}
