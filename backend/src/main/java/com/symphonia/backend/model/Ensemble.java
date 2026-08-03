package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;

@Entity
public class Ensemble {
    private UUID id;
    private String nom;
    private LocalDateTime createdAt;
}
