package com.example.scrumbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String message;
    private String userId; // ID de l'utilisateur destinataire
    private boolean read;
    private LocalDateTime timestamp;

    // Getters et Setters

    public void setId(String id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getUserId() {
        return userId;
    }

    public boolean isRead() {
        return read;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}