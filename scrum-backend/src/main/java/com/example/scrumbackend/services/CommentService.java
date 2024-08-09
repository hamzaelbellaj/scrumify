package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Comment;
import com.example.scrumbackend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> findByTaskId(String taskId) {
        return commentRepository.findByTaskId(taskId);
    }

    public void deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
    }
}