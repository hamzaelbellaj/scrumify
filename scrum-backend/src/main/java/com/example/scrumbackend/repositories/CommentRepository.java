package com.example.scrumbackend.repositories;

import com.example.scrumbackend.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByTaskId(String taskId); // Méthode pour trouver les commentaires par ID de tâche
}