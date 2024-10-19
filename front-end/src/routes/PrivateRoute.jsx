// routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.token); // Vérifiez si l'utilisateur est authentifié

  return isAuthenticated ? <Component /> : <Navigate to="/sign-in" />; // Redirigez vers la page de connexion si non authentifié
};

export default PrivateRoute;
