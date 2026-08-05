package com.symphonia.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Document {

    @Id
    private Long id;

    private String name;
    private String htype;
    private String description;
    private String filePath;
    private LocalDateTime addDate;
}
