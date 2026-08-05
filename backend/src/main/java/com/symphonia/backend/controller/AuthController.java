package com.symphonia.backend.controller;

import com.symphonia.backend.dto.AuthResponse;
import com.symphonia.backend.dto.ConnexionRequest;
import com.symphonia.backend.dto.InscriptionRequest;
import com.symphonia.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService utilisateurService;

    public AuthController(UserService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @PostMapping("/inscription")
    public ResponseEntity<Map<String, String>> inscription(@Valid @RequestBody InscriptionRequest requete) {
        utilisateurService.inscrire(requete);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Compte créé. Vérifie tes emails pour valider ton compte."));
    }

    @GetMapping("/validation")
    public ResponseEntity<Map<String, String>> validation(@RequestParam String token) {
        utilisateurService.validerCompte(token);
        return ResponseEntity.ok(Map.of("message", "Compte validé avec succès"));
    }

    @PostMapping("/connexion")
    public ResponseEntity<AuthResponse> connexion(@Valid @RequestBody ConnexionRequest requete) {
        AuthResponse reponse = utilisateurService.connecter(requete);
        return ResponseEntity.ok(reponse);
    }

    // Gère les erreurs métier (email déjà pris, mot de passe incorrect...)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> gererErreur(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("erreur", e.getMessage()));
    }
}
