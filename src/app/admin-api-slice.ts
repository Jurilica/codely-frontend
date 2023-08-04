import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './api';

export const adminApiSlice = createApi({
    reducerPath: 'adminApi',
    baseQuery : baseQueryWithErrorHandling,
    tagTypes: ['Problem', 'TestCase', 'Example'],
    endpoints(builder) {
        return {
            getProblems: builder.query<GetProblemsResponse, void>({
                query: () => ({
                    url: "admin/problems",
                    method: "GET"
                }),
                providesTags:['Problem']
            }),
            getProblem: builder.query<GetProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "GET"
                }),
                providesTags:['Problem', 'TestCase', 'Example']
            }), 
            addProblem: builder.mutation<CreateProblemResponse, CreateProblemRequest>({
                query: (problem) => ({
                    url: "admin/problems",
                    method: "POST",
                    body: problem
                }),
                invalidatesTags:['Problem']
            }),
            archiveProblem: builder.mutation<ArchiveProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "DELETE",
                    providesTags: ['Problem']
                }),
                invalidatesTags:['Problem']
            }),
            addTestCase : builder.mutation<CreateTestCaseResponse, CreateTestCaseRequest>({
                query: (testCase) => ({
                    url: "admin/test-cases",
                    method: "POST",
                    body: testCase
                }),
                invalidatesTags:['TestCase']
            }) 
        }
    }
});

export const {
    useAddProblemMutation, 
    useGetProblemsQuery, 
    useGetProblemQuery, 
    useArchiveProblemMutation,
    useAddTestCaseMutation} = adminApiSlice;

export interface CreateProblemRequest {
    title: string;
    description: string;
}

export interface CreateProblemResponse {
    problemId: number;
}

export interface GetProblemsResponse {
    problems: GetProblemsData[];
}

export interface GetProblemsData {
    id: number;
    title: string;
    description: string;
    problemStatus: ProblemStatus;
}

export interface GetProblemResponse {
    problem: GetProblemData;
}

export interface GetProblemData {
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

export interface ArchiveProblemResponse {
}

export interface CreateTestCaseRequest {
    problemId: number;
    input: string;
    output: string;
}

export interface CreateTestCaseResponse {
    testCaseId: number;
}


