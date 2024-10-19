import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/authSlice';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Étape 1: Connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await response.json();
      console.log('Login response data:', loginData); // Log the response for debugging

      if (!response.ok) {
        throw new Error(loginData.message || 'Login failed'); // Gérer les erreurs
      }

      // Étape 2: Récupérer le token et vérifier son existence
      const token = loginData.body.token; // Assurez-vous que le token est bien récupéré
      if (!token) {
        throw new Error('Token is missing from login response');
      }

      localStorage.setItem('token', token); // Stocker le token

      // Étape 3: Requête au profil utilisateur
      const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token d'authentification
          'Accept': 'application/json',
        },
      });

      const profileData = await profileResponse.json();
      console.log('User profile response data:', profileData); // Log the response for debugging

      if (!profileResponse.ok) {
        throw new Error(profileData.message || 'Failed to fetch user profile'); // Gérer les erreurs
      }

      // Étape 4: Dispatchez les données utilisateur
      dispatch(login({ user: profileData.body, token })); // Dispatchez les données utilisateur dans le Redux store
      navigate('/user'); // Rediriger vers la page utilisateur

    } catch (error) {
      console.error('Login error:', error.message); // Afficher l'erreur dans la console
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
