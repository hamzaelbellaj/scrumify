// NotificationService.java
package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Notification;
import com.example.scrumbackend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public void createTaskAssignedNotification(String employeeId, String taskTitle) {
        Notification notification = new Notification();
        notification.setMessage("Une nouvelle tâche vous a été assignée: " + taskTitle);
        notification.setUserId(employeeId);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public void createTaskUpdatedNotification(String taskTitle, String userId, String newStatus) {
        Notification notification = new Notification();
        notification.setMessage("La tâche " + taskTitle + " a été mise à jour. Nouveau statut: " + newStatus);
        notification.setUserId(userId);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }
}