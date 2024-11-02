import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Importer Axios

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Axios gère les erreurs HTTP, donc on vérifie si la réponse est réussie
    const { token, user } = response.data.body; // Déstructurer le token et l'utilisateur
    localStorage.setItem('token', token); // Stocker le token
    return { token, user }; // Retourner le token et les informations de l'utilisateur
  } catch (error) {
    // Gestion des erreurs
    if (error.response) {
      // Le serveur a répondu avec un statut qui indique une erreur
      return rejectWithValue(error.response.data.message);
    }
    // Autres erreurs (problèmes de connexion, etc.)
    return rejectWithValue('Une erreur inattendue est survenue. Veuillez vérifier votre connexion.');
  }
});

// Récupérer le token depuis localStorage (s'il existe)
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  token: tokenFromStorage || null, // Initialiser avec le token si présent
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Supprimer le token du stockage
      state.error = null; // Réinitialiser l'erreur lors de la déconnexion
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token; // Stocker le token après la connexion
        state.error = null; // Réinitialiser l'erreur en cas de succès
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; // Gérer l'erreur avec le message personnalisé
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
