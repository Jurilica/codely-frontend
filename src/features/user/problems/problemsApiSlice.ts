import { apiSlice } from "../../../app/apiSlice";
import { ProblemDifficulty, ProblemSubmissionStatus } from "../../../app/enums";

export const problemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getUserProblems: builder.query<GetProblemsResponse, void>({
                query: () => ({
                    url: "user/problems",
                    method: "GET"
                }),
                providesTags:['UserProblem', 'UserSubmission']
            }),
            getUserProblem: builder.query<GetProblemResponse, string>({
                query: (id) => ({
                    url: `user/problems/${id}`,
                    method: "GET"
                }),
                providesTags:['UserProblem']
            })
        }
    }
});

export const {
    useGetUserProblemsQuery, 
    useGetUserProblemQuery} = problemsApiSlice;

export interface GetProblemsResponse {
    problems: GetProblemsData[];
}

export interface GetProblemsData {
    id: number;
    title: string;
    problemSubmissionStatus: ProblemSubmissionStatus;
    difficulty: ProblemDifficulty;
}

export interface GetProblemResponse {
    problem: GetProblemData;
}

export interface GetProblemData {
    id: number;
    title: string;
    description: string;
    problemSubmissionStatus: ProblemSubmissionStatus;
    difficulty: ProblemDifficulty;
    examples: ExampleData[];
}

export interface ExampleData {
    input: string;
    output: string;
    explanation: string;
}
