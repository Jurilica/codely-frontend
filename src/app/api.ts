import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';

const API_URL = "https://localhost:44395/";

interface ErrorData {
    Message: string;
}

const baseQuery = fetchBaseQuery({ baseUrl: API_URL});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

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