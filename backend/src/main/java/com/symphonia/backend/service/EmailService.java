package com.symphonia.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Envoie les emails de l'application (via Mailpit en local)
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // Même origine que celle autorisée en CORS : c'est l'URL du frontend
    @Value("${app.cors.origin}")
    private String urlFrontend;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void envoyerEmailValidation(String destinataire, String prenom, String token) {
        String lien = urlFrontend + "/valider-compte?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@symphonia.local");
        message.setTo(destinataire);
        message.setSubject("Valide ton compte Symphonia");
        message.setText("Bonjour " + prenom + ",\n\n"
                + "Merci de ton inscription sur Symphonia !\n"
                + "Clique sur ce lien pour valider ton compte :\n" + lien + "\n\n"
                + "Si tu n'es pas à l'origine de cette inscription, ignore cet email.");

        mailSender.send(message);
    }
}
