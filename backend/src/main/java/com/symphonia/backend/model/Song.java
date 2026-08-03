package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;

@Entity
public class Song {

    // 1 - écrire les attributs
    private UUID id;
   
    // 1 song -> de 0 à plusieurs documents
    // TODO : est-il possible de forcer de 1 à plusieurs documents ? Ou de 2 à plusieurs documents ?
    @OneToMany
    private List<Document> documents;
    
    // 2 - écriture des méthodes
    
}
