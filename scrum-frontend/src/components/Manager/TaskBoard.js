import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://20.164.48.110/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Task Board</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} (Due: {new Date(task.dueDate).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskBoard;
