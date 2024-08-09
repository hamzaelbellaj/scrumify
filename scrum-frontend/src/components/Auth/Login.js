import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Username and password cannot be empty');
      return;
    }
    setError('');
    try {
      const userRole = await dispatch(login({ username, password }));
      localStorage.setItem('userRole', userRole);
      if (userRole === 'Employee') {
        history.push('/employee/dashboard');
      } else if (userRole === 'Manager') {
        history.push('/manager/dashboard');
      } else {
        setError('Unknown role');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default Login;