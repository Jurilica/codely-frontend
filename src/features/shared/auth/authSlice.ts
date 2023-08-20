import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken, removeUserLocalStorageData, setUserLocalStorageData } from "../../../utils/storageHelpers";
import { Role, getUser } from "../../../utils/tokenHelpers";

interface AuthState {
    isAuthenticated: boolean;
    role: Role | null;
    username: string | null;
}

const initialState: AuthState = {
    isAuthenticated: getToken() !== undefined,
    role: getToken() !== undefined ? getUser().userRole : null,
    username: getToken() !== undefined ? getUser().username : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            setUserLocalStorageData(action.payload);
            state.role = getUser().userRole;
            state.username = getUser().username;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            removeUserLocalStorageData();
            state.role = null;
            state.username = null;
        }
    }
});

export const { authenticate, logOut } = authSlice.actions;

export default authSlice.reducer;