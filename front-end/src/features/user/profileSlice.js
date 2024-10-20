import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk('profile/fetchUserProfile', async () => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const data = await response.json();
  return data.body; // Retourner les données du profil utilisateur
});

// Action pour mettre à jour le nom d'utilisateur
export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (userData) => {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData), // Envoyer uniquement le nom d'utilisateur
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  const data = await response.json();
  return data.body; // Retourner les nouvelles données du profil utilisateur
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

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
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, userName: action.payload.userName }; // Mettre à jour le nom d'utilisateur
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error.message; // Gérer l'erreur de mise à jour
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
