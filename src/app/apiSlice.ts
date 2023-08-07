import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { RootState } from './store';
import { logOut } from '../features/auth/authSlice';

const API_URL = "https://localhost:44395/";

interface ErrorData {
    Message: string;
}

const baseQuery = fetchBaseQuery({ 
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
});

export const baseQueryWithErrorAndReauthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // if(result.error && result.error.status === 401) {
    //     const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    //     if (refreshResult.data) {
    //       // store the new token
    //       api.dispatch(tokenReceived(refreshResult.data))
    //       // retry the initial query
    //       result = await baseQuery(args, api, extraOptions)
    //     } else {
    //       api.dispatch(logOut())
    //     }
    //   }
    // }

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
})