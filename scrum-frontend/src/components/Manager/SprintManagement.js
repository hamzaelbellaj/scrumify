import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SprintManagement = () => {
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    axios.get('http://20.164.48.110/api/sprints')
      .then(response => setSprints(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Sprint Management</h1>
      <ul>
        {sprints.map(sprint => (
          <li key={sprint.id}>
            {sprint.name} - {new Date(sprint.startDate).toLocaleDateString()} to {new Date(sprint.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SprintManagement;
