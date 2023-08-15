import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import codeEditorReducer from '../features/user/codeEditor/codeEditorSlice';
import authSliceReducer from '../features/shared/auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        codeEditor: codeEditorReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(apiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

