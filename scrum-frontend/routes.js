// routes.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Manager/Dashboard';
import SprintManagement from './components/Manager/SprintManagement';
import TaskBoard from './components/Manager/TaskBoard';
import EmployeeManagement from './components/Manager/EmployeeManagement';
import EmployeeDashboard from './components/Employee/Dashboard';
import EmployeeTaskBoard from './components/Employee/TaskBoard';
import EmployeeProfile from './components/Employee/Profile';

const Routes = () => {
  return (
    <Switch>
      {/* Routes accessibles à tous */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Routes spécifiques au manager */}
      <Route path="/manager/dashboard" component={Dashboard} />
      <Route path="/manager/sprints" component={SprintManagement} />
      <Route path="/manager/tasks" component={TaskBoard} />
      <Route path="/manager/employees" component={EmployeeManagement} />

      {/* Routes spécifiques à l'employé */}
      <Route path="/employee/dashboard" component={EmployeeDashboard} />
      <Route path="/employee/tasks" component={EmployeeTaskBoard} />
      <Route path="/employee/profile" component={EmployeeProfile} />

      {/* Route par défaut */}
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default Routes;
