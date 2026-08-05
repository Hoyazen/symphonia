package com.symphonia.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;


@Entity
public class Invitation {

    /**
     * Identifiant de l'invitation
     */
    @Id
    private Long id;

    private String email;
    private String statut;
    private LocalDateTime dateSent;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    private Utilisateur invitedUsed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDateSent() {
        return dateSent;
    }

    public void setDateSent(LocalDateTime dateSent) {
        this.dateSent = dateSent;
    }

    public Utilisateur getInvitedUsed() {
        return invitedUsed;
    }

    public void setInvitedUsed(Utilisateur invitedUsed) {
        this.invitedUsed = invitedUsed;
    }
}
