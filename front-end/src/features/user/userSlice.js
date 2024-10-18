// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // État initial de l'utilisateur
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Met à jour l'utilisateur
    },
    clearUser: (state) => {
      state.user = null; // Réinitialise l'utilisateur
    },
  },
});

export const { setUser, clearUser } = userSlice.actions; // Exportation des actions
export default userSlice.reducer; // Exportation du reducer
