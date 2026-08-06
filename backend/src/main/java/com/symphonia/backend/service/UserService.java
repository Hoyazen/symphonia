package com.symphonia.backend.service;

import com.symphonia.backend.dto.AuthResponse;
import com.symphonia.backend.dto.LoginRequest;
import com.symphonia.backend.dto.RegistrationRequest;
import com.symphonia.backend.model.User;
import com.symphonia.backend.repository.UserRepository;
import com.symphonia.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class UserService {

    // Au moins 8 caractères, 1 majuscule, 1 caractère spécial
    private static final Pattern PASSWORD_RULE =
            Pattern.compile("^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public void register(RegistrationRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    "Un compte existe déjà avec cet email");
        }

        if (!PASSWORD_RULE.matcher(request.getPassword()).matches()) {
            throw new IllegalArgumentException(
                    "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial");
        }

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        // Nouveau compte non administrateur par défaut
        user.setSuperAdmin(false);

        // Compte non validé tant que le lien email n'est pas utilisé
        user.setEmailValidated(false);

        // Génération du token de validation
        user.setValidationToken(
                UUID.randomUUID().toString());

        User createdUser = userRepository.create(user);

        emailService.sendValidationEmail(
                createdUser.getEmail(),
                createdUser.getFirstName(),
                createdUser.getValidationToken());
    }

    // Valide le compte correspondant au token reçu par email
    public void validateAccount(String token) {

        User user = userRepository.findByValidationToken(token)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Token de validation invalide"));

        userRepository.validateAccount(user.getId());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new IllegalArgumentException(
                    "Email ou mot de passe incorrect");
        }

        if (!user.isEmailValidated()) {
            throw new IllegalArgumentException(
                    "Compte non validé. Vérifie tes emails pour l'activer.");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.isSuperAdmin());

        String role = user.isSuperAdmin()
                ? "SUPER_ADMIN"
                : "MEMBRE";

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                role);
    }
}
