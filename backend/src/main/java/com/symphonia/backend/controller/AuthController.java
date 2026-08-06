package com.symphonia.backend.controller;

import com.symphonia.backend.dto.AuthResponse;
import com.symphonia.backend.dto.LoginRequest;
import com.symphonia.backend.dto.RegistrationRequest;
import com.symphonia.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/inscription")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegistrationRequest request) {
        userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Compte créé. Vérifie tes emails pour valider ton compte."));
    }

    @GetMapping("/validation")
    public ResponseEntity<Map<String, String>> validateAccount(@RequestParam String token) {
        userService.validateAccount(token);
        return ResponseEntity.ok(Map.of("message", "Compte validé avec succès"));
    }

    @PostMapping("/connexion")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // Gère les erreurs métier (email déjà pris, mot de passe incorrect...)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleError(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
}
