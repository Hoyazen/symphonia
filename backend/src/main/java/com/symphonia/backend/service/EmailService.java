package com.symphonia.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Envoie les emails de l'application (via Mailpit en local)
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // URL publique du frontend utilisée dans le lien de validation
    @Value("${app.frontend.url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendValidationEmail(String recipient, String firstName, String token) {
        String validationLink = frontendUrl + "/valider-compte?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@symphonia.local");
        message.setTo(recipient);
        message.setSubject("Valide ton compte Symphonia");
        message.setText("Bonjour " + firstName + ",\n\n"
                + "Merci de ton inscription sur Symphonia !\n"
                + "Clique sur ce lien pour valider ton compte :\n" + validationLink + "\n\n"
                + "Si tu n'es pas à l'origine de cette inscription, ignore cet email.");

        mailSender.send(message);
    }
}
