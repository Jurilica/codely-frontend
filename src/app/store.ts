import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import codeEditorReducer from '../features/user/codeEditor/codeEditorSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        codeEditor: codeEditorReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(apiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

