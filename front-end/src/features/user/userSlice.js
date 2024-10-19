// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: {
      firstName: '',
      lastName: '',
    },
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { login, setProfile } = userSlice.actions;
export default userSlice.reducer;
