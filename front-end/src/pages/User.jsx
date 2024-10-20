import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../features/user/profileSlice'; // Importer les actions
import '../assets/css/UserEditForm.css';
import AccountSection from '../components/AccountSection';
import accountsData from '../data/accountsData'; // Import des données

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
                <form onSubmit={handleSubmit} className="user-edit-form">
                    <div className="form-group">
                        <label htmlFor="userName" className="form-label">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            className="form-input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} // Permettre la modification du nom d'utilisateur
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-input"
                            value={user ? user.firstName : ''}
                            readOnly // Le champ First Name est en lecture seule
                        />
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-input"
                            value={user ? user.lastName : ''}
                            readOnly // Le champ Last Name est en lecture seule
                        />
                    </div>
                
                    <div className="form-buttons">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                
                    {editError && <div className="error-message">{editError}</div>}
                    {editSuccess && <div className="success-message">{editSuccess}</div>}
                </form>      
            ) : null} {/* Ne rien afficher si pas en mode édition */}

            <h2 className="sr-only">Accounts</h2>
            {/* Affichage des comptes ici... */}
            {accountsData.map(account => (
                <AccountSection
                    key={account.id}
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                    onViewTransactions={() => console.log(`Viewing transactions for ${account.title}`)}
                />
            ))}
        </main>
    );
};

export default User;
