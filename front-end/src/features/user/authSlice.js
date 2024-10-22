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
      // Gérer les erreurs basées sur le code de statut
      if (response.status === 400) {
        return rejectWithValue('Champs invalides. Veuillez vérifier vos informations de connexion.');
      }
      if (response.status === 500) {
        return rejectWithValue('Erreur interne du serveur. Veuillez réessayer plus tard.');
      }
      // Autres erreurs
      return rejectWithValue('Erreur lors de la connexion. Veuillez réessayer.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.body.token); // Stocker le token
    return { token: data.body.token, user: data.body.user }; // Retourner le token et les informations de l'utilisateur
  } catch (error) {
    // Gestion des erreurs inattendues
    return rejectWithValue('Une erreur inattendue est survenue. Veuillez vérifier votre connexion.');
  }
});

const initialState = {
  token: null,
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
