import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { RefreshTokenRequest } from '../features/shared/auth/authApiSlice';
import { Mutex } from 'async-mutex';
import { getRefreshToken, getToken } from '../utils/storageHelpers';
import { authenticate, logOut } from '../features/shared/auth/authSlice';

const API_URL = "https://localhost:44395/";

interface ErrorData {
    Message: string;
}

const baseQuery = fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = getToken();

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
                    refreshToken: getRefreshToken()
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
                    // store the new token
                    api.dispatch(authenticate(refreshResult.data));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            }finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
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
    tagTypes: ['AdminProblem', 'AdminTestCase', 'AdminExample','AdminUser', 'UserProblem', 'UserSubmission', 'UserLeaderboard'],
    endpoints: () => ({})
});