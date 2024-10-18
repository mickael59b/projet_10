// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.png';
import '../../assets/css/main.css';

const Header = ({ user }) => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {user.email} {/* Affiche l'email de l'utilisateur connecté */}
          </Link>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
        {user && (
          <Link className="main-nav-item" to="/sign-out">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;


