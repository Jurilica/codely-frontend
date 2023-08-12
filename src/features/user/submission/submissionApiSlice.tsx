import { apiSlice } from "../../../app/apiSlice";
import { ProgrammingLanguage } from "../problems/problemsApiSlice";

export const submissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
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

export const {useSubmitAnswerMutation} = submissionApiSlice;

export interface SubmitAnswerRequest {
    problemId: number;
    answer: string;
    programmingLanguage: ProgrammingLanguage;
}

export interface SubmitAnswerResponse {
    submissionId: number;
}