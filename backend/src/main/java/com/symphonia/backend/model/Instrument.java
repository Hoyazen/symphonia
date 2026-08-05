package com.symphonia.backend.model;

import jakarta.persistence.*;

@Entity
public class Instrument {
    @Id
    private Long id;

    private String name;
    private String description;
}
