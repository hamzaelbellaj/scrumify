import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './Dashboard.css';
import sprintIcon from '../../icons/sprint-icon.png';
import taskIcon from '../../icons/task-icon.png';
import employeeIcon from '../../icons/employee-icon.png';

Chart.register(...registerables);

const Dashboard = () => {
  const [data, setData] = useState({
    sprintCount: 0,
    taskCount: 0,
    employeeCount: 0,
    completionRate: 0,
    averageTasksPerEmployee: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('https://scrumify.engineer/api/manager/count');
        const { sprintCount, taskCount, employeeCount, completedSprints } = response.data;
        setData({
          sprintCount,
          taskCount,
          employeeCount,
          completionRate: (completedSprints / sprintCount) * 100 || 0,
          averageTasksPerEmployee: taskCount / employeeCount || 0,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const chartData = {
    sprintData: {
      labels: ['Sprints'],
      datasets: [{ label: 'Total Sprints', data: [data.sprintCount], backgroundColor: '#004080' }],
    },
    employeeData: {
      labels: ['Employés'],
      datasets: [{ label: 'Total Employés', data: [data.employeeCount], backgroundColor: '#009688' }],
    },
    taskData: {
      labels: ['Tâches'],
      datasets: [{ label: 'Total Tâches', data: [data.taskCount], backgroundColor: '#FF9800' }],
    },
    completionRateData: {
      labels: ['Taux d\'Achèvement'],
      datasets: [{
        label: 'Taux d\'Achèvement (%)',
        data: [data.completionRate],
        borderColor: '#673AB7',
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        fill: true,
      }],
    },
    averageTasksData: {
      labels: ['Moyenne de Tâches', 'Tâches Non Assignées'],
      datasets: [{
        label: 'Moyenne de Tâches',
        data: [data.averageTasksPerEmployee, 10 - data.averageTasksPerEmployee],
        backgroundColor: ['#E91E63', '#BDBDBD'],
      }],
    },
  };

  return (
    <div className={`dashboard-container ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
      <Button onClick={() => setSidebarVisible(!sidebarVisible)} variant="contained">
        {sidebarVisible ? 'Cacher' : 'Afficher'} le Menu
      </Button>
      {sidebarVisible && (
        <nav className="menu">
          <Link to="/manager/sprint-overview" className="sidebar-item">
            <img src={sprintIcon} alt="Gestion des Sprints" />
            <span>Gestion des Sprints</span>
          </Link>
          <Link to="/manager/task-management" className="sidebar-item">
            <img src={taskIcon} alt="Gestion des Tâches" />
            <span>Gestion des Tâches</span>
          </Link>
          <Link to="/manager/employee-management" className="sidebar-item">
            <img src={employeeIcon} alt="Gestion des Employés" />
            <span>Gestion des Employés</span>
          </Link>
        </nav>
      )}
      <div className="main-content">
        <h1>Dashboard Manager</h1>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="stats-container">
            <Card>
              <CardContent>
                <Typography variant="h5">Statistiques des Sprints</Typography>
                <Bar data={chartData.sprintData} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5">Statistiques des Employés</Typography>
                <Bar data={chartData.employeeData} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5">Statistiques des Tâches</Typography>
                <Bar data={chartData.taskData} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5">Taux d'Achèvement des Sprints</Typography>
                <Line data={chartData.completionRateData} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5">Moyenne de Tâches par Employé</Typography>
                <Pie data={chartData.averageTasksData} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;