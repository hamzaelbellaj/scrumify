package com.example.scrumbackend.controllers;

import com.example.scrumbackend.models.Comment;
import com.example.scrumbackend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/{taskId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String taskId,
                                              @RequestBody Comment comment,
                                              @RequestParam String employeeId) { // Paramètre employeeId
        comment.setTaskId(taskId);
        comment.setAssignedTo(employeeId); // Affectation dynamique
        Comment savedComment = commentService.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @GetMapping("/{taskId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByTaskId(@PathVariable String taskId) {
        List<Comment> comments = commentService.findByTaskId(taskId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{taskId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String taskId, @PathVariable String commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}