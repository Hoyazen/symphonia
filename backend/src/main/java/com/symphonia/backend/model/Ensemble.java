package com.symphonia.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Ensemble {
    @Id
    private Long id;
    private String name;
    private LocalDateTime createdAt;
}
