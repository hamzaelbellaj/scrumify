package com.example.scrumbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "sprints")
public class Sprint {

    @Id
    private String id;
    private String name;
    private String description;
    private LocalDateTime startDate; // Utilisation de LocalDateTime
    private LocalDateTime endDate;   // Utilisation de LocalDateTime
    private String status;
    private List<Task> tasks = new ArrayList<>(); // Liste des tâches associées

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            this.startDate = LocalDateTime.parse(startDate, formatter);
        } catch (DateTimeParseException e) {
            e.printStackTrace(); // Gérer l'exception selon vos besoins
        }
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            this.endDate = LocalDateTime.parse(endDate, formatter);
        } catch (DateTimeParseException e) {
            e.printStackTrace(); // Gérer l'exception selon vos besoins
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    // Méthodes pour ajouter et supprimer des tâches
    public void addTask(Task task) {
        this.tasks.add(task);
    }

    public void removeTask(Task task) {
        this.tasks.remove(task);
    }
}
