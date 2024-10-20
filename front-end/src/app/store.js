import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import profileReducer from '../features/user/profileSlice'; // Importer le reducer du profil

const store = configureStore({
  reducer: {
    auth: authReducer, // Pour la gestion de l'authentification
    profile: profileReducer, // Pour la gestion des données utilisateur
  },
});

export default store;
