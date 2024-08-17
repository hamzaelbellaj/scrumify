import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDashboard.css';
import taskIcon from '../../icons/task-icon.png';
import employeeIcon from '../../icons/employee-icon.png';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks();
      await fetchEmployees();
    };

    fetchData();
  }, [employeeId]);

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

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const employeeResponse = await axios.get(`https://scrumify.engineer/api/manager/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEmployees(employeeResponse.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const getTaskCounts = () => {
    const counts = { completed: 0, inProgress: 0, notStarted: 0 };
    tasks.forEach(task => {
      if (task.status === 'Completed') counts.completed++;
      else if (task.status === 'In Progress') counts.inProgress++;
      else counts.notStarted++;
    });
    return counts;
  };

  const { completed, inProgress, notStarted } = getTaskCounts();

  const data = {
    labels: ['Complètes', 'En Cours', 'Pas Encore Commencées'],
    datasets: [{ label: 'Nombre de Tâches', data: [completed, inProgress, notStarted], backgroundColor: ['#4caf50', '#2196f3', '#ff9800'] }]
  };

  const recentTasks = tasks.slice(-5);

  return (
    <div className="employee-dashboard">
      <IconButton className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <MenuIcon />
      </IconButton>
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`dashboard-container sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Link to="/employee/taskboard" className="sidebar-item">
          <img src={taskIcon} alt="Gestion des tâches" />
          <span>Gestion des tâches</span>
        </Link>
        <Link to="/employee/contact" className="sidebar-item">
          <img src={mailicon} alt="Contact" />
          <span>Contact</span>
        </Link>
        <Link to="/employee/profile" className="sidebar-item">
          <img src={employeeIcon} alt="Profile" />
          <span>Profile</span>
        </Link>
      </div>
      <main className="main-content">
        <h1>Tableau de Bord Employé</h1>
        <Paper style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6">Statistiques des Tâches</Typography>
          <Bar data={data} />
        </Paper>
        <TableContainer component={Paper} className="table-container">
          <Typography variant="h6" style={{ padding: 16 }}>
            5 Dernières Tâches
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre de la Tâche</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Sprint</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTasks.length > 0 ? (
                recentTasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.sprintTitle || 'Non associé'}</TableCell>
                    <TableCell><span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>Aucune tâche récente.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Dashboard;