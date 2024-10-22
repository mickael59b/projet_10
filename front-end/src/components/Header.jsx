import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/authSlice'; // Importer l'action logout
import { fetchUserProfile } from '../features/user/profileSlice'; // Importer l'action pour récupérer le profil utilisateur
import Logo from '../assets/img/argentBankLogo.webp';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user); // Récupérer l'utilisateur depuis profileSlice
  const token = useSelector((state) => state.auth.token); // Récupérer le token depuis authSlice

  const handleLogout = () => {
    dispatch(logout()); // Appeler l'action de déconnexion
  };

  // Chargement du profil utilisateur lorsque le composant est monté
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user ? user.userName : 'Utilisateur'} {/* N'affiche que le nom d'utilisateur */}
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-sign-in"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;