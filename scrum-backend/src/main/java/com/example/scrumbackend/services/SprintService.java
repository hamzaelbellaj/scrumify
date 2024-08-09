package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Sprint;
import com.example.scrumbackend.models.Task;
import com.example.scrumbackend.repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintRepository;



    public long getTotalSprints() {
        return sprintRepository.count(); // Retourne le nombre total de sprints
    }


    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public Optional<Sprint> getSprintById(String id) {
        return sprintRepository.findById(id);
    }

    public Sprint createSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    public Sprint updateSprint(String id, Sprint sprint) {
        if (sprintRepository.existsById(id)) {
            sprint.setId(id);
            return sprintRepository.save(sprint);
        }
        return null;
    }

    public void deleteSprint(String id) {
        sprintRepository.deleteById(id);
    }


    public void addTaskToSprint(String sprintId, Task task) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(sprintId);
        if (optionalSprint.isPresent()) {
            Sprint sprint = optionalSprint.get();
            sprint.addTask(task);
            sprintRepository.save(sprint);
        }
    }

    public void removeTaskFromSprint(String sprintId, Task task) {
        Optional<Sprint> optionalSprint = sprintRepository.findById(sprintId);
        if (optionalSprint.isPresent()) {
            Sprint sprint = optionalSprint.get();
            sprint.removeTask(task);
            sprintRepository.save(sprint);
        }
    }




    public long getCompletedSprints() {
        return sprintRepository.countByStatus("Completed"); // Remplacez "terminé" par la valeur appropriée
    }
}
