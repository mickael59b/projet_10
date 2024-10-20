import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.body.token); // Stocker le token
  return { token: data.body.token, user: data.body.user }; // Retourner le token et les informations de l'utilisateur
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token; // Stocker le token après la connexion
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message; // Gérer l'erreur
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
