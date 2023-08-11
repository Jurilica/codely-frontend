import { apiSlice } from "../../../app/apiSlice";

export const problemsApiSlice = apiSlice.injectEndpoints({
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
            })
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



