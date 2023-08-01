import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "https://localhost:44395/";

interface CreateProblemRequest {
    title: string;
    description: string;
}

interface CreateProblemResponse {
    id: number;
}

const problemApiSlice = createApi({
    reducerPath: 'api',
    baseQuery : fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints(builder) {
        return {
            addProblem: builder.mutation<CreateProblemResponse, CreateProblemRequest>({
                query: (problem) => ({
                    url: "/admin/problems",
                    method: "POST",
                    body: problem
                })
            })
        }
    }
});