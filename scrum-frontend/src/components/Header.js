import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ role }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isManagerPage = location.pathname.startsWith('/manager');
  const isEmployeePage = location.pathname.startsWith('/employee');

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Scrumify</h1>
        {isAuthPage && (
          <nav className="header-nav">
            <ul>
              {location.pathname === '/login' ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              )}
            </ul>
          </nav>
        )}
        {(isManagerPage || isEmployeePage) && (
          <nav className="header-nav">
            <ul>
              <li><Link to="/logout">Déconnexion</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
