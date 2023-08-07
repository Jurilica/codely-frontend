import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from './authApiSlice';

interface AuthState {
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    token: null,
    refreshToken: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            const { token, refreshToken } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;

            localStorage.setItem("user", JSON.stringify(refreshToken));
        },
        logOut: (state) => {
            state.token = null;
            state.refreshToken = null;

            localStorage.removeItem("user");
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

