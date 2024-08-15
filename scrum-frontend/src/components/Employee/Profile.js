import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Box } from '@mui/material';
import BackToDashboard from '../BackToDashboard';

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://scrumify.engineer/api/employees/${employeeId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'employé:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) return <div>Chargement...</div>;

  return (
    <div>
      <BackToDashboard />
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Paper elevation={6} sx={{ padding: 4, width: 400, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Profil de l'Employé
          </Typography>
          <Typography variant="h6" gutterBottom align="center" sx={{ color: 'text.secondary' }}>
            Informations Personnelles
          </Typography>
          <Box mb={2} sx={{ textAlign: 'left' }}>
            <Typography><strong>Prénom:</strong> {employee.firstName}</Typography>
            <Typography><strong>Nom de famille:</strong> {employee.lastName}</Typography>
            <Typography><strong>Email:</strong> {employee.email}</Typography>
            <Typography><strong>Statut:</strong> {employee.status}</Typography>
            <Typography><strong>Nom d'utilisateur:</strong> {employee.username}</Typography>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};


export default Profile;