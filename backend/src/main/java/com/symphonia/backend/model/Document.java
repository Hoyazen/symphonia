package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Document {

    @Id
    private UUID id;

    private String name;
    private String htype;
    private String description;
    private String filePath;
    private LocalDateTime addDate;
}
