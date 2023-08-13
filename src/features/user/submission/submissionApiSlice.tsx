import { apiSlice } from "../../../app/apiSlice";
import { ProblemSubmissionStatus, ProgrammingLanguage } from "../../../app/enums";

export const submissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getSubmissions: builder.query<GetSubmussionsResponse, number>({
                query: (problemId) => ({
                    url: `user/submission/${problemId}`,
                    method: "GET"
                }),
                providesTags:['UserSubmission']
            }),
            submitAnswer: builder.mutation<SubmitAnswerResponse, SubmitAnswerRequest>({
                query: (request) => ({
                    url: "user/submission",
                    method: "POST",
                    body: request
                }),
                invalidatesTags: ['UserSubmission']
            })
        }
    }
});

export const {
    useGetSubmissionsQuery,
    useSubmitAnswerMutation} = submissionApiSlice;

export interface SubmitAnswerRequest {
    problemId: number;
    answer: string;
    programmingLanguage: ProgrammingLanguage;
}

export interface SubmitAnswerResponse {
    submissionId: number;
}

export interface GetSubmissionsRequest{
}

export interface GetSubmussionsResponse{
    submissions: GetSubmissionData[];
}

export interface GetSubmissionData {
    dateTime: string,
    answer: string,
    programmingLanguage: ProgrammingLanguage,
    problemSubmissionStatus: ProblemSubmissionStatus,
    numberOfTestCases: number,
    numberOfPassedTestCases: number
}