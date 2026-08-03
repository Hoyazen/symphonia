package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;

@Entity
public class Invitation {

    /**
     * Identifiant de l'invitation
     */
    @Id
    private UUID id;

    private String email;
    private String statut;
    private LocalDateTime dateSent;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    private Utilisateur invitedUsed;

    // TODO ajouter les méthodes (getters/setters)
    // possbilité de le faire en automatique avec VSCode
}
