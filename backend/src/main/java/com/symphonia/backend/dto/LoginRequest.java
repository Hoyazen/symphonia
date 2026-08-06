package com.symphonia.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;

// Données envoyées par le formulaire de connexion
public class LoginRequest {

    @NotBlank(message = "L'email est obligatoire")
    private String email;

    @JsonAlias("motDePasse")
    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
