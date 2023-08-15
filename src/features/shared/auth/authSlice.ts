import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken, removeUserLocalStorageData, setUserLocalStorageData } from "../../../utils/storageHelpers";

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: getToken() !== undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            setUserLocalStorageData(action.payload);
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            removeUserLocalStorageData();
        }
    }
});

export const { authenticate, logOut } = authSlice.actions;

export default authSlice.reducer;