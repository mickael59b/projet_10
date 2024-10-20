import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../features/user/profileSlice'; // Importer les actions

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const [isEditing, setIsEditing] = useState(false); // État pour le mode édition
  const [userName, setUserName] = useState(''); // État pour le nom d'utilisateur
  const [editError, setEditError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Récupérer le profil utilisateur lors du chargement du composant
  }, [dispatch]);

  // Mettre à jour les champs si l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setUserName(user.userName); // Mettre à jour le nom d'utilisateur
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditError(null);
    setEditSuccess(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userName })) // Envoyer uniquement le nom d'utilisateur
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setEditSuccess('Username updated successfully!');
          setIsEditing(false);
        } else {
          setEditError('Failed to update username.');
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Afficher un message d'erreur
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <h1>Edit User Info</h1> // Affichage du titre en mode édition
        ) : (
          <h1>
            Welcome back<br />
            {user ? `${user.firstName} ${user.lastName}` : 'User'}!
          </h1>
        )}
        {!isEditing && (
          <button className="edit-button" onClick={handleEdit}>Edit Username</button> // Afficher le bouton seulement quand pas en mode édition
        )}
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Permettre la modification du nom d'utilisateur
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={user ? user.firstName : ''}
              readOnly // Le champ First Name est en lecture seule
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={user ? user.lastName : ''}
              readOnly // Le champ Last Name est en lecture seule
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
          {editError && <div className="error-message">{editError}</div>}
          {editSuccess && <div className="success-message">{editSuccess}</div>}
        </form>
      ) : null} {/* Ne rien afficher si pas en mode édition */}

      <h2 className="sr-only">Accounts</h2>
      {/* Affichage des comptes ici... */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      {/* Ajoutez d'autres sections de compte ici... */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x1234)</h3>
          <p className="account-amount">$10,000.00</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      
      {/* Ajoutez d'autres sections de compte ici... */}
    </main>
  );
};

export default User;
