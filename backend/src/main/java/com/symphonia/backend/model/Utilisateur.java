package com.symphonia.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "password_hash")
    private String motDePasse; // haché avec BCrypt

    @Column(name = "first_name")
    private String prenom;

    @Column(name = "last_name")
    private String nom;

    private String role;

    @Column(name = "validated")
    private boolean emailValide;

    @Column(name = "token_validation")
    private String tokenValidation;

    @Column(name = "created_at")
    private LocalDateTime dateCreation;

    @Column(name = "profile_picture_url")
    private String photoProfil;

    @Column(name = "super_admin")
    private boolean superAdmin;

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

    public String getPhotoProfil() {
        return photoProfil;
    }

    public void setPhotoProfil(String photoProfil) {
        this.photoProfil = photoProfil;
    }

    public boolean isSuperAdmin() {
        return superAdmin;
    }

    public void setSuperAdmin(boolean superAdmin) {
        this.superAdmin = superAdmin;
    }
}