import { configureStore } from '@reduxjs/toolkit';
import { problemApiSlice } from '../features/problems/problem-api-slice';
import { testcaseApiSlice } from '../features/testcase/testcase-api-slice';

export const store = configureStore({
    reducer: {
        [problemApiSlice.reducerPath]: problemApiSlice.reducer,
        [testcaseApiSlice.reducerPath]: testcaseApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(problemApiSlice.middleware, testcaseApiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

