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
            updateProblem : builder.mutation<UpdateProblemResponse, UpdateProblemRequest>({
                query: (problem) => ({
                    url: "admin/problems",
                    method: "PUT",
                    body: problem
                }),
                invalidatesTags:['Problem']
            }),
            publishProblem : builder.mutation<PublishProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}/publish`,
                    method: "PUT"
                }),
                invalidatesTags:['Problem']
            }),
            unpublishProblem : builder.mutation<UnpublishProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}/unpublish`,
                    method: "PUT"
                }),
                invalidatesTags:['Problem']
            }),
            archiveProblem: builder.mutation<ArchiveProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "DELETE"
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
            }),
            updateTestCase : builder.mutation<UpdateTestCaseResponse, UpdateTestCaseRequest>({
                query: (testCase) => ({
                    url: "admin/test-cases",
                    method: "PUT",
                    body: testCase
                }),
                invalidatesTags:['TestCase']
            }),
            archiveTestCase: builder.mutation<ArchiveTestCaseResponse, string>({
                query: (id) => ({
                    url: `admin/test-cases/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags:['TestCase']
            }),
            addExample : builder.mutation<CreateExampleResponse, CreateExampleRequest>({
                query: (testCase) => ({
                    url: "admin/examples",
                    method: "POST",
                    body: testCase
                }),
                invalidatesTags:['Example']
            }),
            updateExample : builder.mutation<UpdateExampleResponse, UpdateExampleRequest>({
                query: (testCase) => ({
                    url: "admin/examples",
                    method: "PUT",
                    body: testCase
                }),
                invalidatesTags:['Example']
            }),
            archiveExample: builder.mutation<ArchiveExampleResponse, string>({
                query: (id) => ({
                    url: `admin/examples/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags:['Example']
            }),
        }
    }
});

export const {
    useAddProblemMutation, 
    useUpdateProblemMutation,
    usePublishProblemMutation,
    useUnpublishProblemMutation,
    useGetProblemsQuery, 
    useGetProblemQuery, 
    useArchiveProblemMutation,
    useAddTestCaseMutation,
    useUpdateTestCaseMutation,
    useArchiveTestCaseMutation,
    useAddExampleMutation,
    useUpdateExampleMutation,
    useArchiveExampleMutation} = adminApiSlice;

export interface CreateProblemRequest {
    title: string;
    description: string;
}

export interface CreateProblemResponse {
    problemId: number;
}

export interface UpdateProblemRequest {
    problemId: number;
    title: string;
    description: string;
}

export interface PublishProblemResponse {
}

export interface UnpublishProblemResponse {
}

export interface UpdateProblemResponse {
    title: string;
    description: string;
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

export interface UpdateTestCaseRequest {
    testCaseId: number;
    input: string;
    output: string;
}

export interface UpdateTestCaseResponse {
}

export interface ArchiveTestCaseResponse {
}

export interface CreateExampleRequest {
    problemId: number;
    input: string;
    output: string;
    explanation: string;
}

export interface CreateExampleResponse {
    testCaseId: number;
}

export interface UpdateExampleRequest {
    exampleId: number;
    input: string;
    output: string;
    explanation: string;
}

export interface UpdateExampleResponse {
}

export interface ArchiveExampleResponse {
}



