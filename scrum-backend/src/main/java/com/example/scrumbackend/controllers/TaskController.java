// src/main/java/com/example/scrumbackend/controllers/TaskController.java
package com.example.scrumbackend.controllers;

import com.example.scrumbackend.models.Task;
import com.example.scrumbackend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@RequestMapping("/api/manager/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        Task task = taskService.getTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }




    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Task>> getTasksByAssignedTo(@PathVariable String employeeId) {
        List<Task> tasks = taskService.findTasksByAssignedTo(employeeId);
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/employee/{employeeId}/sprint-details")
    public ResponseEntity<List<Map<String, String>>> getSprintDetailsByEmployeeId(@PathVariable String employeeId) {
        List<Map<String, String>> sprintDetails = taskService.findSprintDetailsByEmployeeId(employeeId);
        return ResponseEntity.ok(sprintDetails);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable String id, @RequestBody Map<String, String> statusUpdate) {
        Task updatedTask = taskService.updateTaskStatus(id, statusUpdate.get("status"));
        return ResponseEntity.ok(updatedTask);
    }



}