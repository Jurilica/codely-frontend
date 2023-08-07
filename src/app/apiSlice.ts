import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { RootState } from './store';
import { logOut, setCredentials } from '../features/auth/authSlice';
import { LoginResponse, RefreshTokenRequest } from '../features/auth/authApiSlice';
import { Mutex } from 'async-mutex';

const API_URL = "https://localhost:44395/";

interface ErrorData {
    Message: string;
}

const baseQuery = fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    }
});

const mutex = new Mutex();

export const baseQueryWithErrorAndReauthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if(result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            
            try{
                const body: RefreshTokenRequest = {
                    refreshToken: localStorage.getItem("user")
                };
    
                const refreshResult = await baseQuery(
                    {
                        url: "authentication/refresh-token",
                        method: 'POST',
                        body:  body
                    },
                    api,
                    extraOptions);
        
                if (refreshResult.data) {
                    var tokenData = refreshResult.data as LoginResponse;
                    // store the new token
                    api.dispatch(setCredentials(tokenData));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            }finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    if(result.error) {
        let errorMessage = "";

        switch(result.error.status) {
            case 400:
            case 500: 
                let errorData = result.error.data as ErrorData;
                errorMessage = errorData.Message;
                break;
            default: errorMessage = "Network issue";
        }

        toast.error(errorMessage);
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithErrorAndReauthHandling,
    tagTypes: ['Problem', 'TestCase', 'Example'],
    endpoints: () => ({})
});