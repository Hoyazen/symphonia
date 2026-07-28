package com.symphonia.backend.model;

import java.time.LocalDateTime;

// Représente une ligne de la table "utilisateurs"
public class Utilisateur {

    private Long id;
    private String email;
    private String motDePasse; // haché avec BCrypt
    private String prenom;
    private String nom;
    private String role;
    private boolean emailValide;
    private String tokenValidation;
    private LocalDateTime dateCreation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEmailValide() {
        return emailValide;
    }

    public void setEmailValide(boolean emailValide) {
        this.emailValide = emailValide;
    }

    public String getTokenValidation() {
        return tokenValidation;
    }

    public void setTokenValidation(String tokenValidation) {
        this.tokenValidation = tokenValidation;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
}
