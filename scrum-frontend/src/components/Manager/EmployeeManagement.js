import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, createEmployee, modifyEmployee, removeEmployee } from '../../redux/actions/employeeActions';
import './ManagerDashboard.css'; // Importez le fichier CSS pour le style
import BackToDashboard from '../BackToDashboard';

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employeeReducer.employees);
  const loading = useSelector(state => state.employeeReducer.loading);
  const error = useSelector(state => state.employeeReducer.error);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    username: '',
    password: '',
    profileImage: null  // Nouveau champ pour l'image
  });

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterOption, setFilterOption] = useState('all'); // État pour le filtre

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: files ? files[0] : value  // Prendre en compte le fichier image
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employee', new Blob([JSON.stringify({
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        email: newEmployee.email,
        status: newEmployee.status,
        username: newEmployee.username,
        password: newEmployee.password,
       
    })], { type: 'application/json' }));

    if (newEmployee.profileImage) {
        formData.append('image', newEmployee.profileImage); // Ajoutez l'image séparément
    }

    if (editingEmployee) {
      dispatch(modifyEmployee(editingEmployee.id, formData));
    } else {
      dispatch(createEmployee(formData));
    }
    resetForm();
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      status: employee.status,
      username: employee.username,
      password: '', // Ne pas pré-remplir le mot de passe
      
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(removeEmployee(id));
  };

  const resetForm = () => {
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      username: '',
      password: '',
     
    });
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Filtrer les employés en fonction du rôle
  const filteredEmployees = employees.filter(employee => {
    if (filterOption === 'employee') {
      return employee.roles && employee.roles.some(role => role.name === 'Employee');
    } else if (filterOption === 'manager') {
      return employee.roles && employee.roles.some(role => role.name === 'Manager');
    }
    return true; // Afficher tous les utilisateurs par défaut
  });

  return (
    <div className="employee-management">
      <h2>Gestion des Employés</h2>
      <BackToDashboard />
      <div className="info-banner">
        <p>
          Tous les employées que vous allez créer auront le rôle type Employé.
        </p>
      </div>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error}</p>}
      <div className="actions">
        <button onClick={() => setShowModal(true)}>Ajouter Employé</button>
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="all">Tous</option>
          <option value="employee">Employés</option>
          <option value="manager">Managers</option>
        </select>
      </div>

      {/* Modal pour ajouter / modifier un employé */}
      {showModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>{editingEmployee ? 'Modifier Employé' : 'Ajouter Employé'}</h3>
              <button onClick={resetForm}>X</button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleChange}
                placeholder="Prénom"
                required
              />
              <input
                type="text"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleChange}
                placeholder="Nom de famille"
                required
              />
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="status"
                value={newEmployee.status}
                onChange={handleChange}
                placeholder="Statut"
                required
              />
              <input
                type="text"
                name="username"
                value={newEmployee.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                required
              />
              <input
                type="password"
                name="password"
                value={newEmployee.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
              />
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
              />
              <div className="modal-footer">
                <button type="submit">{editingEmployee ? 'Mettre à jour' : 'Ajouter'}</button>
                <button type="button" onClick={resetForm}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom de famille</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Nom d'utilisateur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>{employee.username}</td>
              <td>
                <button onClick={() => handleEdit(employee)}>Modifier</button>
                <button onClick={() => handleDelete(employee.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
