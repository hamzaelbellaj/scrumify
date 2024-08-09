// src/components/Auth/Logout.js
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Logout.css'; // Assurez-vous que ce fichier existe et est stylisé comme souhaité

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Supprimer le token et le rôle de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
    
    // Rediriger vers la page de connexion après un délai
    setTimeout(() => {
      history.push('/login');
    }, 3000); // 1,5 seconde pour montrer le message de déconnexion
  }, [history]);

  return (
    <div className="logout-container">
      <div className="logout-message">
        <p>Déconnexion en cours</p>
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
