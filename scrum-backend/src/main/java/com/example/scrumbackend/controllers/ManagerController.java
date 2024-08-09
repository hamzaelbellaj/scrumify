package com.example.scrumbackend.controllers;

import com.example.scrumbackend.models.Sprint;
import com.example.scrumbackend.models.Task;
import com.example.scrumbackend.services.EmployeeService;
import com.example.scrumbackend.services.SprintService;
import com.example.scrumbackend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manager/sprints")
public class ManagerController {


    @Autowired
    private TaskService taskService; // Injection du TaskService

    private EmployeeService employeeService;


    @Autowired
    private SprintService sprintService;

    @GetMapping
    public ResponseEntity<List<Sprint>> getAllSprints() {
        List<Sprint> sprints = sprintService.getAllSprints();
        return new ResponseEntity<>(sprints, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable String id) {
        Optional<Sprint> sprint = sprintService.getSprintById(id);
        return sprint.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Sprint> createSprint(@RequestBody Sprint sprint) {
        Sprint createdSprint = sprintService.createSprint(sprint);
        return new ResponseEntity<>(createdSprint, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable String id, @RequestBody Sprint sprint) {
        Sprint updatedSprint = sprintService.updateSprint(id, sprint);
        return updatedSprint != null ? ResponseEntity.ok(updatedSprint) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSprint(@PathVariable String id) {
        sprintService.deleteSprint(id);
        return ResponseEntity.noContent().build();
    }




    private static class Counts {
        private long sprintCount;
        private long taskCount;
        private long employeeCount;

        public Counts(long sprintCount, long taskCount, long employeeCount) {
            this.sprintCount = sprintCount;
            this.taskCount = taskCount;
            this.employeeCount = employeeCount;
        }

        public long getSprintCount() {
            return sprintCount;
        }

        public long getTaskCount() {
            return taskCount;
        }

        public long getEmployeeCount() {
            return employeeCount;
        }
    }
}