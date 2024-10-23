import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../features/user/profileSlice';
import '../assets/css/UserEditForm.css';
import AccountSection from '../components/AccountSection';
import accountsData from '../data/accountsData';

const User = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.user);
    const loading = useSelector((state) => state.profile.loading);
    const error = useSelector((state) => state.profile.error);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [editError, setEditError] = useState(null);
    const [editSuccess, setEditSuccess] = useState(null);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setUserName(user.userName);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(updateUserProfile({ userName }));

            if (response.meta.requestStatus === 'fulfilled') {
                setEditSuccess(response.payload.message || 'Pseudo mis à jour avec succès.');
                setIsEditing(false);

                // Effacer le message de succès après 5 secondes
                setTimeout(() => {
                    setEditSuccess(null);
                }, 5000);
            } else {
                setEditError('Failed to update username.');
            }
        } catch (err) {
            setEditError(err.message || 'An unknown error occurred.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <h1>Edit User Info</h1>
                ) : (
                    <h1>
                        Welcome back<br />
                        {user ? `${user.firstName} ${user.lastName}` : 'User'}!
                    </h1>
                )}
                {!isEditing && (
                    <button className="edit-button" onClick={handleEdit}>Edit Username</button>
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
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-input"
                            value={user ? user.firstName : ''}
                            readOnly
                        />
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-input"
                            value={user ? user.lastName : ''}
                            readOnly
                        />
                    </div>
                
                    <div className="form-buttons">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button>
                    </div>
                </form>
            ) : null}

            {/* Messages d'erreur et de succès affichés en dehors du formulaire */}
            {editError && <div className="error-message">{editError}</div>}
            {editSuccess && <div className="success-message">{editSuccess}</div>}

            <h2 className="sr-only">Accounts</h2>
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
