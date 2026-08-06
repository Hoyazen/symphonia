package com.symphonia.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Données envoyées par le formulaire d'inscription
public class RegistrationRequest {

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email n'est pas valide")
    private String email;

    @JsonAlias("motDePasse")
    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    @JsonAlias("prenom")
    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;

    @JsonAlias("nom")
    @NotBlank(message = "Le nom est obligatoire")
    private String lastName;

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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
