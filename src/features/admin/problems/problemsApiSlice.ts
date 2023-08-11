import { apiSlice } from "../../../app/apiSlice";

export const problemsApiSlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            getAdminProblems: builder.query<GetProblemsResponse, void>({
                query: () => ({
                    url: "admin/problems",
                    method: "GET"
                }),
                providesTags:['AdminProblem']
            }),
            getAdminProblem: builder.query<GetProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "GET"
                }),
                providesTags:['AdminProblem', 'AdminTestCase', 'AdminExample']
            }), 
            addProblem: builder.mutation<CreateProblemResponse, CreateProblemRequest>({
                query: (problem) => ({
                    url: "admin/problems",
                    method: "POST",
                    body: problem
                }),
                invalidatesTags:['AdminProblem']
            }),
            updateProblem : builder.mutation<UpdateProblemResponse, UpdateProblemRequest>({
                query: (problem) => ({
                    url: "admin/problems",
                    method: "PUT",
                    body: problem
                }),
                invalidatesTags:['AdminProblem']
            }),
            publishProblem : builder.mutation<PublishProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}/publish`,
                    method: "PUT"
                }),
                invalidatesTags:['AdminProblem']
            }),
            unpublishProblem : builder.mutation<UnpublishProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}/unpublish`,
                    method: "PUT"
                }),
                invalidatesTags:['AdminProblem']
            }),
            archiveProblem: builder.mutation<ArchiveProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags:['AdminProblem']
            })
        }
    }
});

export const {
    useAddProblemMutation, 
    useUpdateProblemMutation,
    usePublishProblemMutation,
    useUnpublishProblemMutation,
    useGetAdminProblemsQuery, 
    useGetAdminProblemQuery, 
    useArchiveProblemMutation} = problemsApiSlice;

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