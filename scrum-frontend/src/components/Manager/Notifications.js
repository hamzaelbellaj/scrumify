import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const employeeId = localStorage.getItem('employeeId'); // Récupération de l'ID de l'utilisateur

      const response = await axios.get(`http://localhost:8080/api/notifications?userId=${employeeId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      {notifications.length === 0 ? (
        <p>Aucune notification</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="notification">
            <p>{notification.message}</p>
            <p>{new Date(notification.timestamp).toLocaleString()}</p>
            <p>{notification.isRead ? 'Lu' : 'Non lu'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;