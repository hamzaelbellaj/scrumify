// src/main/java/com/example/scrumbackend/services/TaskService.java
package com.example.scrumbackend.services;
import com.example.scrumbackend.models.Sprint;
import com.example.scrumbackend.models.Task;
import com.example.scrumbackend.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TaskService {


    @Autowired
    private SprintService sprintService;
    @Autowired
    private TaskRepository taskRepository;





    public List<Map<String, String>> findSprintDetailsByEmployeeId(String employeeId) {
        List<Task> tasks = taskRepository.findByAssignedTo(employeeId);
        List<Map<String, String>> sprintDetails = new ArrayList<>();

        for (Task task : tasks) {
            Sprint sprint = sprintService.getSprintById(task.getSprintId()).orElse(null);
            if (sprint != null) {
                Map<String, String> details = new HashMap<>();
                details.put("sprintId", task.getSprintId());
                details.put("sprintTitle", sprint.getName());
                details.put("sprintDescription", sprint.getDescription());
                sprintDetails.add(details);
            }
        }

        return sprintDetails;
    }





    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setAssignedTo(taskDetails.getAssignedTo());
            task.setSprintId(taskDetails.getSprintId());
            task.setStatus(taskDetails.getStatus());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }





    public List<Task> findTasksByAssignedTo(String employeeId) {
        return taskRepository.findByAssignedTo(employeeId);
    }
    public Task updateTaskStatus(String id, String status) {
        return taskRepository.findById(id).map(task -> {
            task.setStatus(status);
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }




    public long getTotalTasks() {
        return taskRepository.count();
    }



}