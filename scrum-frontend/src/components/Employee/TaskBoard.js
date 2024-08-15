import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskBoard.css';
import BackToDashboard from '../BackToDashboard';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [comments, setComments] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const tasksResponse = await axios.get(`https://scrumify.engineer/api/manager/tasks`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const assignedTasks = tasksResponse.data.filter(task => task.assignedTo === employeeId);
        
        const sprintResponse = await axios.get(`https://scrumify.engineer/api/manager/tasks/employee/${employeeId}/sprint-details`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const sprintMap = {};
        sprintResponse.data.forEach(sprint => {
          sprintMap[sprint.sprintId] = {
            sprintTitle: sprint.sprintTitle,
            sprintDescription: sprint.sprintDescription
          };
        });

        const tasksWithSprintDetails = assignedTasks.map(task => {
          const sprintDetails = sprintMap[task.sprintId] || { sprintTitle: '', sprintDescription: '' };
          return {
            ...task,
            sprintTitle: sprintDetails.sprintTitle,
            sprintDescription: sprintDetails.sprintDescription
          };
        });

        setTasks(tasksWithSprintDetails);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [employeeId]);

  const openModal = (task) => {
    setSelectedTask(task);
    fetchComments(task.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const updateTaskStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = selectedStatus[selectedTask.id];
      await axios.patch(`https://scrumify.engineer/api/manager/tasks/${selectedTask.id}/status`, { status: newStatus }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id ? { ...task, status: newStatus } : task
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://scrumify.engineer/api/tasks/${taskId}/comments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setComments(prev => ({ ...prev, [taskId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (taskId, commentText) => {
    try {
      const token = localStorage.getItem('token');
      const newComment = { commentText };
      await axios.post(`https://scrumify.engineer/api/tasks/${taskId}/comments?employeeId=${employeeId}`, newComment, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchComments(taskId);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (taskId, commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://scrumify.engineer/api/tasks/${taskId}/comments/${commentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchComments(taskId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'task-status not-started';
      case 'In Progress':
        return 'task-status in-progress';
      case 'Completed':
        return 'task-status completed';
      default:
        return 'task-status';
    }
  };

  return (
    <section className="employee-task-board">
      <BackToDashboard />
      <h2>Tableau des Tâches Assignées</h2>
      <table>
        <thead>
          <tr>
            <th>Titre de la Tâche</th>
            <th>Description de la Tâche</th>
            <th>Statut de la Tâche</th>
            <th>Titre du Sprint</th>
            <th>Description du Sprint</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className={getStatusClass(task.status)}>
                  {task.status}
                </td>
                <td>{task.sprintTitle}</td>
                <td>{task.sprintDescription}</td>
                <td>
                  <button onClick={() => openModal(task)}>Modifier</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune tâche assignée.</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Modifier la Tâche: {selectedTask.title}</h3>
            <label>
              Statut:
              <select
                value={selectedStatus[selectedTask.id] || selectedTask.status}
                onChange={(e) => setSelectedStatus({ ...selectedStatus, [selectedTask.id]: e.target.value })}
              >
                <option value="Not Started">Pas encore commencé</option>
                <option value="In Progress">En cours</option>
                <option value="Completed">Terminé</option>
              </select>
            </label>
            <button onClick={updateTaskStatus}>Valider</button>

            <h4>Commentaires:</h4>
            <ul>
              {comments[selectedTask.id]?.map(comment => (
                <li key={comment.commentId}>
                  {comment.commentText}
                  <button onClick={() => deleteComment(selectedTask.id, comment.commentId)}>Supprimer</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Ajouter un commentaire"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  addComment(selectedTask.id, e.target.value);
                  e.target.value = ''; // Réinitialiser l'input
                }
              }}
            />
            <button onClick={closeModal}>Annuler</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TaskBoard;