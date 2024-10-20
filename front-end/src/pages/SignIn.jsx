import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/authSlice'; // Importer les actions
import { fetchUserProfile } from '../features/user/profileSlice'; // Importer l'action pour le profil
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connexion
      const loginAction = await dispatch(loginUser({ email, password }));
      
      if (loginAction.meta.requestStatus === 'fulfilled') {
        // Récupérer le profil utilisateur après connexion réussie
        await dispatch(fetchUserProfile());
        navigate('/user'); // Rediriger vers la page utilisateur
      }
    } catch (error) {
      console.error('Login error:', error.message);
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
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
