package com.symphonia.backend.model;

import java.util.List;
import java.time.LocalDateTime;
import jakarta.persistence.*;


@Entity
public class Song {

    // 1 - écrire les attributs
    @Id
    private Long id;
    private String title;
    private String composer;
    private String description;
    private LocalDateTime createdAt;

    // 1 song -> de 0 à plusieurs documents
    // TODO : est-il possible de forcer de 1 à plusieurs documents ? Ou de 2 à
    // plusieurs documents ?

    @OneToMany
    private List<Document> documents;

    // 2 - écriture des méthodes

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getComposer() {
        return composer;
    }

    public void setComposer(String composer) {
        this.composer = composer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
