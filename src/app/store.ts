import { configureStore } from '@reduxjs/toolkit';
import { problemApiSlice } from '../features/problems/problem-api-slice';

export const store = configureStore({
    reducer: {
        [problemApiSlice.reducerPath]: problemApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(problemApiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

