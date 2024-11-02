import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Importer Axios

// Action pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.data.body; // Retourner les données du profil utilisateur
});

// Action pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (userData) => {
    const token = localStorage.getItem('token');

    const response = await axios.put('http://localhost:3001/api/v1/user/profile', userData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data.body; // Retourner les données mises à jour
});

// État initial
const initialState = {
    user: null,
    loading: false,
    error: null,
};

// Création du slice
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.user = null; // Effacer le profil
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;  // Indiquer que la requête est en cours
                state.error = null;    // Réinitialiser l'erreur
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload; // Mettre à jour l'utilisateur avec les données du profil
                state.loading = false;        // Réinitialiser l'état de chargement
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.error = action.error.message; // Gérer l'erreur
                state.loading = false;               // Réinitialiser l'état de chargement
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true; // Indiquer que la requête de mise à jour est en cours
                state.error = null;   // Réinitialiser l'erreur
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload }; // Fusionner les nouvelles données directement
                state.loading = false; // Réinitialiser l'état de chargement
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.error.message; // Gérer l'erreur de mise à jour
                state.loading = false;                // Réinitialiser l'état de chargement
            });
    },
});

// Exporter les actions
export const { clearProfile } = profileSlice.actions;

// Exporter le reducer
export default profileSlice.reducer;
