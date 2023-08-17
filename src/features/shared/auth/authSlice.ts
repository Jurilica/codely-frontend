import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken, removeUserLocalStorageData, setUserLocalStorageData } from "../../../utils/storageHelpers";
import { Role, getUser } from "../../../utils/tokenHelpers";

interface AuthState {
    isAuthenticated: boolean;
    role: Role | null;
}

const initialState: AuthState = {
    isAuthenticated: getToken() !== undefined,
    role: getToken() !== undefined ? getUser().userRole : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            setUserLocalStorageData(action.payload);
            state.role = getUser().userRole;
        },
        logOut: (state) => {
            state.isAuthenticated = false;
            removeUserLocalStorageData();
            state.role = null;
        }
    }
});

export const { authenticate, logOut } = authSlice.actions;

export default authSlice.reducer;