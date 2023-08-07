import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    userName: string | null;
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    userName: null,
    token: null,
    refreshToken: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { userName, token, refreshToken } = action.payload;
            state.userName = userName;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        logOut: (state, action) => {
            state.userName = null;
            state.token = null;
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer

