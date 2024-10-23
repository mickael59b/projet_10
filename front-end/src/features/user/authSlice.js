import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Retourner directement le message d'erreur depuis le corps de la réponse
      return rejectWithValue(errorData.message);
    }  

    const data = await response.json();
    localStorage.setItem('token', data.body.token); // Stocker le token
    return { token: data.body.token, user: data.body.user }; // Retourner le token et les informations de l'utilisateur
  } catch (error) {
    // Gestion des erreurs inattendues
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
