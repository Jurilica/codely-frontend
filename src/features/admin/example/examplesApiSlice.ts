import { apiSlice } from "../../../app/apiSlice";

export const examplesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
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
            })
        }
    }
});

export const {
    useAddExampleMutation,
    useUpdateExampleMutation,
    useArchiveExampleMutation} = examplesApiSlice;

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




