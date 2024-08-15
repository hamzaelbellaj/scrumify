import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Modal,
  Button,
} from '@mui/material';
import BackToDashboard from '../BackToDashboard';
import './ManagerDashboard.css';

const Vukanban = () => {
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [tasksResponse, sprintsResponse, employeesResponse] = await Promise.all([
          axios.get('https://scrumify.engineer/api/manager/tasks', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://scrumify.engineer/api/manager/sprints', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://scrumify.engineer/api/employees', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setTasks(tasksResponse.data);
        setSprints(sprintsResponse.data);
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupTasksBySprintAndStatus = () => {
    const grouped = {};
    tasks.forEach((task) => {
      if (!grouped[task.sprintId]) {
        grouped[task.sprintId] = { sprintName: sprints.find(s => s.id === task.sprintId)?.name, tasks: {} };
      }
      if (!grouped[task.sprintId].tasks[task.status]) {
        grouped[task.sprintId].tasks[task.status] = [];
      }
      grouped[task.sprintId].tasks[task.status].push(task);
    });
    return grouped;
  };

  const taskGroups = groupTasksBySprintAndStatus();

  const statusColors = {
    'Not Started': '#a60a1a',
    'In Progress': '#dbca32',
    'Completed': '#147d17',
  };

  return (
    <section className="task-management">
      <BackToDashboard />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {Object.keys(taskGroups).map(sprintId => (
          <Grid item xs={12} md={6} key={sprintId}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, backgroundColor: '#f5f9fa' }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
                Sprint : {taskGroups[sprintId].sprintName}
              </Typography>
              <Grid container spacing={2}>
                {['Not Started', 'In Progress', 'Completed'].map(status => (
                  <Grid item xs={4} key={status}>
                    <Paper elevation={2} sx={{ padding: 2, borderRadius: 2, backgroundColor: statusColors[status] }}>
                      <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold' }}>{status}</Typography>
                      {taskGroups[sprintId].tasks[status]?.map(task => (
                        <Paper key={task.id} sx={{ margin: '10px 0', padding: 2, borderRadius: 1, backgroundColor: '#ffffff' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                            Titre : <span style={{ color: '#004080' }}>{task.title}</span>
                          </Typography>
                          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                            Description : <span style={{ color: '#004080' }}>{task.description}</span>
                          </Typography>
                          <Button onClick={() => { setCurrentTask(task); setShowModal(true); }} variant="outlined" sx={{ marginTop: 1 }}>
                            Voir
                          </Button>
                        </Paper>
                      )) || <Typography variant="body2" color="textSecondary">Aucune tâche</Typography>}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, m: 'auto', mt: 8, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Détails de la Tâche</Typography>
          {currentTask && (
            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Titre : <span style={{ color: '#004080' }}>{currentTask.title}</span>
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                Description : <span style={{ color: '#004080' }}>{currentTask.description}</span>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={() => setShowModal(false)} variant="contained" color="primary">
                  Fermer
                </Button>
              </Box>
            </div>
          )}
        </Box>
      </Modal>
    </section>
  );
};

export default Vukanban;