import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "https://localhost:44395/";

export const problemApiSlice = createApi({
    reducerPath: 'api',
    baseQuery : fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints(builder) {
        return {
            getProblems: builder.query<GetProblemsResponse, void>({
                query: () => ({
                    url: "admin/problems",
                    method: "GET"
                })
            }),
            addProblem: builder.mutation<CreateProblemResponse, CreateProblemRequest>({
                query: (problem) => ({
                    url: "admin/problems",
                    method: "POST",
                    body: problem
                })
            })
        }
    }
});

export const {useAddProblemMutation, useGetProblemsQuery} = problemApiSlice;

export interface CreateProblemRequest {
    title: string;
    description: string;
}

export interface CreateProblemResponse {
    id: number;
}

export interface GetProblemsResponse {
    problems: GetProblemsData[];
}

export interface GetProblemsData {
    id: number;
    title: string;
    description: string;
    problemStatus: ProblemStatus;
    examples: ExampleData[];
    testCases: TestCaseData[];
}

export interface ExampleData {
    id: number;
    input: string;
    output: string;
    explanation: string;
}

export interface TestCaseData {
    id: number;
    input: string;
    output: string;
}

export enum ProblemStatus {
    Published = "Published",
    Unpublished = "Unpublished"
}
