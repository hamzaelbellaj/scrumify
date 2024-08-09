// src/components/BackToDashboard.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './BackToDashboard.css';

const BackToDashboard = () => {
  const history = useHistory();
  const userRole = localStorage.getItem('userRole') || ''; // Récupérer le rôle de l'utilisateur depuis le localStorage

  const handleBackToDashboard = () => {
    if (userRole === 'Manager') {
      history.push('/manager/dashboard');
    } else if (userRole === 'Employee') {
      history.push('/employee/dashboard');
    }
  };

  return (
    <div className="back-to-dashboard">
      <button className="back-button" onClick={handleBackToDashboard}>
        <span className="arrow">←</span> Retour au Tableau de Bord
      </button>
    </div>
  );
};

export default BackToDashboard;
