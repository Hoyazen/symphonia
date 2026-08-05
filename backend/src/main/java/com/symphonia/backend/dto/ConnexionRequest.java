package com.symphonia.backend.dto;

import jakarta.validation.constraints.NotBlank;

// Données envoyées par le formulaire de connexion
public class ConnexionRequest {

    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return password;
    }

    public void setMotDePasse(String password) {
        this.password = password;
    }
}
