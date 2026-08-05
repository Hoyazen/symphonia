package com.symphonia.backend.model;

import java.util.UUID;
import jakarta.persistence.*;

@Entity
public class Instrument {
    @Id
    private UUID id;

    private String name;
    private String description;
}
