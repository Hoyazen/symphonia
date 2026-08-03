package com.symphonia.backend.model;

import java.util.UUID;
import java.time.LocalDateTime;

@Entity
public class Document {
    private UUID id;
    private String name;
    private String htype;
    private String description;
    private String filePath;
    private LocalDateTime addDate;
}
