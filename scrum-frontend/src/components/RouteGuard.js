// src/components/RouteGuard.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteGuard = ({ component: Component, allowedRoles, ...rest }) => {
  const auth = useSelector(state => state.auth);
  
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated && allowedRoles.includes(auth.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default RouteGuard;