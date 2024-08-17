import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EmployeeDashboard from './components/Employee/Dashboard';
import ManagerDashboard from './components/Manager/Dashboard';
import TaskBoardEmployee from './components/Employee/TaskBoard';
import TaskBoardManager from './components/Manager/TaskBoard';
import SprintOverview from './components/Manager/SprintOverview';
import TaskManagement from './components/Manager/TaskManagement';
import EmployeeManagement from './components/Manager/EmployeeManagement';
import PerformanceTracking from './components/Manager/PerformanceTracking';
import Notifications from './components/Manager/Notifications';
import Logout from './components/Auth/Logout'; // Importer le composant Logout
import store from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import './app.css';
import VuKanban from './components/Manager/vukanban';
import Profile from './components/Employee/Profile';
import ContactForm from './components/Employee/Contact';
import ContactUs from './components/Auth/AboutUs';

const App = () => {
  const [userRole, setUserRole] = useState('');
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    }
  }, [history]);

  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header role={userRole} />
          <div className="main-content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route
                path="/employee/dashboard"
                render={(props) => <EmployeeDashboard {...props} />}
              />
              <Route
                path="/manager/dashboard"
                render={(props) => <ManagerDashboard {...props} />}
              />
              <Route path="/employee/taskboard" component={TaskBoardEmployee} />
              <Route path="/manager/taskboard" component={TaskBoardManager} />
              <Route path="/manager/sprint-overview" component={SprintOverview} />
              <Route path="/manager/task-management" component={TaskManagement} />
              <Route path="/manager/employee-management" component={EmployeeManagement} />
              <Route path="/manager/performance-tracking" component={PerformanceTracking} />
              <Route path="/manager/vukanban" component={VuKanban} /> {/* Ajouter la route pour VuKanban */}
              <Route path="/manager/notifications" component={Notifications} />
              <Route path="/employee/profile" component={Profile} />
              <Route path="/employee/contact" component={ContactForm} />

              <Route path="/about-us" component={ContactUs} />
              <Route path="/logout" component={Logout} /> {/* Ajouter la route pour Logout */}
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
          <Footer role={userRole} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
