package com.example.scrumbackend.repositories;

import com.example.scrumbackend.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {


    List<Task> findByAssignedTo(String assignedTo);

}
