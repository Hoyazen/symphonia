package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;
import jakarta.persistence.*;


@Entity
public class Ensemble {
    private UUID id;
    private String nom;
    private LocalDateTime createdAt;
}
