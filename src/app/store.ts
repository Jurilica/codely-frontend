import { configureStore } from '@reduxjs/toolkit';
import { adminApiSlice } from './admin-api-slice';

export const store = configureStore({
    reducer: {
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(adminApiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

