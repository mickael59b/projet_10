// features/user/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (token) => {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.data = action.payload.body;
            });
    },
});

export default profileSlice.reducer;
