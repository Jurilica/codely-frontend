import { apiSlice } from "../../../app/apiSlice";

export const problemsUserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getProblems: builder.query<GetProblemsResponse, void>({
                query: () => ({
                    url: "user/problems",
                    method: "GET"
                }),
                providesTags:['UserProblem']
            }),
            getProblem: builder.query<GetProblemResponse, string>({
                query: (id) => ({
                    url: `user/problems/${id}`,
                    method: "GET"
                }),
                providesTags:['UserProblem']
            })
        }
    }
});

export interface GetProblemsResponse {
    problems: GetProblemsData[];
}

export interface GetProblemsData {
    id: number;
    title: string;
    problemSubmissionStatus: ProblemSubmissionStatus;
}

export interface GetProblemResponse {
}

export interface GetProblemData {
    id: number;
    title: string;
    description: string;
    problemSubmissionStatus: ProblemSubmissionStatus;
    examples: ExampleData[];
}

export interface ExampleData {
    input: string;
    output: string;
    explanation: string;
}

export enum ProblemSubmissionStatus {
    Unsolved="Unsolved",
    Pending="Pending",
    Succeeded="Succeeded",
    Failed="Failed"
}