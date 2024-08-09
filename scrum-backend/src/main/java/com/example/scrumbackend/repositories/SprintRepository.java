package com.example.scrumbackend.repositories;

import com.example.scrumbackend.models.Sprint;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SprintRepository extends MongoRepository<Sprint, String> {
    long countByStatus(String status);
}
