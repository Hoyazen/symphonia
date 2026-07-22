package com.symphonia.backend.service;

import com.symphonia.backend.dto.AuthResponse;
import com.symphonia.backend.dto.ConnexionRequest;
import com.symphonia.backend.dto.InscriptionRequest;
import com.symphonia.backend.model.Utilisateur;
import com.symphonia.backend.repository.UtilisateurRepository;
import com.symphonia.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UtilisateurService {

    // Au moins 8 caractères, 1 majuscule, 1 caractère spécial
    private static final Pattern REGLE_MOT_DE_PASSE =
            Pattern.compile("^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$");

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UtilisateurService(UtilisateurRepository utilisateurRepository,
                               PasswordEncoder passwordEncoder,
                               JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse inscrire(InscriptionRequest requete) {
        if (utilisateurRepository.existeParEmail(requete.getEmail())) {
            throw new IllegalArgumentException("Un compte existe déjà avec cet email");
        }

        if (!REGLE_MOT_DE_PASSE.matcher(requete.getMotDePasse()).matches()) {
            throw new IllegalArgumentException(
                    "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial");
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(requete.getEmail());
        utilisateur.setMotDePasse(passwordEncoder.encode(requete.getMotDePasse()));
        utilisateur.setPrenom(requete.getPrenom());
        utilisateur.setNom(requete.getNom());
        utilisateur.setRole("membre");

        Utilisateur cree = utilisateurRepository.creer(utilisateur);

        String token = jwtService.genererToken(cree.getEmail(), cree.getRole());
        return new AuthResponse(token, cree.getEmail(), cree.getPrenom(), cree.getNom(), cree.getRole());
    }

    public AuthResponse connecter(ConnexionRequest requete) {
        Utilisateur utilisateur = utilisateurRepository.trouverParEmail(requete.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(requete.getMotDePasse(), utilisateur.getMotDePasse())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        String token = jwtService.genererToken(utilisateur.getEmail(), utilisateur.getRole());
        return new AuthResponse(token, utilisateur.getEmail(), utilisateur.getPrenom(),
                utilisateur.getNom(), utilisateur.getRole());
    }
}
