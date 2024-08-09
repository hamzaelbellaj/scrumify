package com.example.scrumbackend.controllers;

import com.example.scrumbackend.services.EmployeeService;
import com.example.scrumbackend.services.SprintService;
import com.example.scrumbackend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class CountController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/api/manager/count")
    public Map<String, Long> getCounts() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("employeeCount", employeeService.getTotalEmployees());
        counts.put("sprintCount", sprintService.getTotalSprints());
        counts.put("completedSprints", sprintService.getCompletedSprints()); // Ajout ici
        counts.put("taskCount", taskService.getTotalTasks());
        return counts;
    }
}