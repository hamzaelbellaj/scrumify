import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerDashboard.css';
import BackToDashboard from '../BackToDashboard';
import Vukanban from './vukanban';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    sprintId: '',
    status: 'Not Started'
  });
  const [viewMode, setViewMode] = useState('kanban');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasksAndSprintsAndEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const tasksResponse = await axios.get('http://20.164.48.110/api/manager/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const sprintsResponse = await axios.get('http://20.164.48.110/api/manager/sprints', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const employeesResponse = await axios.get('http://20.164.48.110/api/employees', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setTasks(tasksResponse.data);
        setSprints(sprintsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksAndSprintsAndEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://20.164.48.110/api/manager/tasks', newTask, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setTasks([...tasks, response.data]);
      setShowForm(false);
      setNewTask({
        title: '',
        description: '',
        assignedTo: '',
        sprintId: '',
        status: 'Not Started'
      });
    } catch (error) {
      setError('Error creating task');
      console.error('Error creating task:', error);
    }
  };

  const handleViewTask = async (task) => {
    setCurrentTask(task);
    const comments = await fetchComments(task.id);
    setCurrentTask(prev => ({ ...prev, comments }));
    setShowModal(true);
  };

  const fetchComments = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://20.164.48.110/api/tasks/${taskId}/comments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://20.164.48.110/api/manager/tasks/${currentTask.id}`, currentTask, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const updatedTasks = tasks.map(task => task.id === currentTask.id ? currentTask : task);
      setTasks(updatedTasks);
      setShowModal(false);
    } catch (error) {
      setError('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://20.164.48.110/api/manager/tasks/${currentTask.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const updatedTasks = tasks.filter(task => task.id !== currentTask.id);
      setTasks(updatedTasks);
      setShowModal(false);
    } catch (error) {
      setError('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <section className="task-management">
      <BackToDashboard />
      <h2>Gestion des Tâches</h2>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="toggle-switch">
        <div 
          className={`toggle-option ${viewMode === 'kanban' ? 'active' : ''}`}
          onClick={() => setViewMode('kanban')}
        >
          Vu Normale
        </div>
        <div 
          className={`toggle-option ${viewMode === 'vukanban' ? 'active' : ''}`}
          onClick={() => setViewMode('vukanban')}
        >
          Vu Kanban
        </div>
      </div>

      {viewMode === 'vukanban' ? (
        <Vukanban />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Créer une nouvelle tâche</button>
          
          {showForm && (
            <form onSubmit={handleSubmit} className="task-form">
              <h3>Créer une Tâche</h3>
              <label>
                Titre de la Tâche:
                <input type="text" name="title" value={newTask.title} onChange={handleInputChange} required />
              </label>
              <label>
                Description:
                <textarea name="description" value={newTask.description} onChange={handleInputChange} required />
              </label>
              <label>
                Assigné à:
                <select name="assignedTo" value={newTask.assignedTo} onChange={handleInputChange} required>
                  <option value="">Sélectionnez un employé</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Sprint:
                <select name="sprintId" value={newTask.sprintId} onChange={handleInputChange} required>
                  <option value="">Sélectionnez un sprint</option>
                  {sprints.map(sprint => (
                    <option key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-buttons">
                <button type="submit">Créer</button>
                <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
              </div>
            </form>
          )}
          
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Assigné à</th>
                <th>Sprint</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => {
                const assignedEmployee = employees.find(employee => employee.id === task.assignedTo);
                const assignedName = assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : 'Non assigné';
                const associatedSprint = sprints.find(sprint => sprint.id === task.sprintId);
                const sprintName = associatedSprint ? associatedSprint.name : 'Non assigné';
                
                const statusClass = task.status.toLowerCase().replace(' ', '-');
                
                return (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{assignedName}</td>
                    <td>{sprintName}</td>
                    <td>
                      <span className={`sprint-status ${statusClass}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleViewTask(task)}>Voir</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
  
      {showModal && currentTask && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier la Tâche</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>
                  Titre de la Tâche:
                  <input
                    type="text"
                    value={currentTask.title}
                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    value={currentTask.description}
                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                  />
                </label>
                <label>
                  Assigné à:
                  <select
                    value={currentTask.assignedTo}
                    onChange={(e) => setCurrentTask({ ...currentTask, assignedTo: e.target.value })}
                  >
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Sprint:
                  <select
                    value={currentTask.sprintId}
                    onChange={(e) => setCurrentTask({ ...currentTask, sprintId: e.target.value })}
                  >
                    <option value="">Sélectionnez un sprint</option>
                    {sprints.map(sprint => (
                      <option key={sprint.id} value={sprint.id}>
                        {sprint.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Statut:
                  <select
                    value={currentTask.status}
                    onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                  >
                    <option value="Not Started">Pas encore commencé</option>
                    <option value="In Progress">En cours</option>
                    <option value="Completed">Terminé</option>
                  </select>
                </label>
                <div>
                  <h6>Commentaires:</h6>
                  <ul>
                    {currentTask.comments && currentTask.comments.map(comment => (
                      <li key={comment.id}>{comment.commentText}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleUpdateTask}>Mettre à jour</button>
                <button onClick={handleDeleteTask}>Supprimer</button>
                <button onClick={() => setShowModal(false)}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TaskManagement;