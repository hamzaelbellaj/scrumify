import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerDashboard.css';
import BackToDashboard from '../BackToDashboard'; 

const SprintOverview = () => {
  const [sprints, setSprints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [newSprint, setNewSprint] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Not Started'
  });

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://scrumify.engineer/api/manager/sprints', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setSprints(response.data);
      } catch (error) {
        console.error('Error fetching sprints:', error);
      }
    };

    fetchSprints();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSprint(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formattedStartDate = new Date(newSprint.startDate).toISOString();
      const formattedEndDate = new Date(newSprint.endDate).toISOString();

      const response = await axios.post('https://scrumify.engineer/api/manager/sprints', {
        ...newSprint,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSprints([...sprints, response.data]);
      setShowForm(false);
      setNewSprint({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Not Started'
      });
    } catch (error) {
      console.error('Error creating sprint:', error);
    }
  };

  const handleViewSprint = (sprint) => {
    setCurrentSprint(sprint);
    setShowModal(true);
  };

  const handleUpdateSprint = async () => {
    try {
      const token = localStorage.getItem('token');
      const formattedStartDate = new Date(currentSprint.startDate).toISOString();
      const formattedEndDate = new Date(currentSprint.endDate).toISOString();

      await axios.put(`https://scrumify.engineer/api/manager/sprints/${currentSprint.id}`, {
        ...currentSprint,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedSprints = sprints.map(sprint => {
        if (sprint.id === currentSprint.id) {
          return currentSprint;
        }
        return sprint;
      });
      setSprints(updatedSprints);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating sprint:', error);
    }
  };

  const handleDeleteSprint = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://scrumify.engineer/api/manager/sprints/${currentSprint.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedSprints = sprints.filter(sprint => sprint.id !== currentSprint.id);
      setSprints(updatedSprints);
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting sprint:', error);
    }
  };

  return (
    <section className="sprint-overview">
      <BackToDashboard />
      <h2>Aperçu des Sprints</h2>
      <button onClick={() => setShowForm(true)}>Créer un nouveau sprint</button>
      {showForm && (
        <form onSubmit={handleSubmit} className="sprint-form">
          <h3>Créer un Sprint</h3>
          <BackToDashboard />

          <label>
            Nom du Sprint:
            <input
              type="text"
              name="name"
              value={newSprint.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Exemple : Projet N°1"
              value={newSprint.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date de Début:
            <input
              type="date"
              name="startDate"
              value={newSprint.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date de Fin:
            <input
              type="date"
              name="endDate"
              value={newSprint.endDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Créer</button>
          <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
          <th>Description</th>
            <th>Nom du Sprint</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sprints.map(sprint => (
            <tr key={sprint.id}>
              <td>{sprint.description  }</td> 
              <td>{sprint.name}</td>
              <td>{new Date(sprint.startDate).toLocaleDateString()}</td>
              <td>{new Date(sprint.endDate).toLocaleDateString()}</td>
              <td>
                <span className={`sprint-status ${sprint.status.toLowerCase().replace(' ', '-')}`}>
                  {sprint.status}
                </span>
              </td>
              <td>
                <button onClick={() => handleViewSprint(sprint)}>Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && currentSprint && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le Sprint</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table>
                  <tbody>
                  
        
                    <tr>
                      <td>Nom du Sprint:</td>
                      <td>
                        <input
                          type="text"
                          value={currentSprint.name}
                          onChange={(e) => setCurrentSprint({ ...currentSprint, name: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Description:</td>
                      <td>
                        <input
                          type="text"
                          value={currentSprint.description }
                          onChange={(e) => setCurrentSprint({ ...currentSprint, description: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Date de Début:</td>
                      <td>
                        <input
                          type="date"
                          value={currentSprint.startDate.split('T')[0]}
                          onChange={(e) => setCurrentSprint({ ...currentSprint, startDate: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Date de Fin:</td>
                      <td>
                        <input
                          type="date"
                          value={currentSprint.endDate.split('T')[0]}
                          onChange={(e) => setCurrentSprint({ ...currentSprint, endDate: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>
                        <select
                          value={currentSprint.status}
                          onChange={(e) => setCurrentSprint({ ...currentSprint, status: e.target.value })}
                        >
                          <option value="Not Started">Pas encore commencé</option>
                          <option value="In Progress">En cours</option>
                          <option value="Completed">Terminé</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button onClick={handleUpdateSprint}>Mettre à jour</button>
                <button onClick={handleDeleteSprint}>Supprimer</button>
                <button onClick={() => setShowModal(false)}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SprintOverview;
