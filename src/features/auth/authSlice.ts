import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: string | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer

