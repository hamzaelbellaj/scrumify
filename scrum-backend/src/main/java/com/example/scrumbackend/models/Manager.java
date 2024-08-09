package com.example.scrumbackend.models;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "managers")
public class Manager extends User {

    private List<Employee> managedEmployees;

    // Getters and Setters
    public List<Employee> getManagedEmployees() {
        return managedEmployees;
    }

    public void setManagedEmployees(List<Employee> managedEmployees) {
        this.managedEmployees = managedEmployees;
    }
}
