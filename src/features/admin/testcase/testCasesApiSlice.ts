import { apiSlice } from "../../../app/apiSlice";

export const testCasesApiSlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            archiveProblem: builder.mutation<ArchiveProblemResponse, string>({
                query: (id) => ({
                    url: `admin/problems/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags:['AdminProblem']
            }),
            addTestCase : builder.mutation<CreateTestCaseResponse, CreateTestCaseRequest>({
                query: (testCase) => ({
                    url: "admin/test-cases",
                    method: "POST",
                    body: testCase
                }),
                invalidatesTags:['AdminTestCase']
            }),
            updateTestCase : builder.mutation<UpdateTestCaseResponse, UpdateTestCaseRequest>({
                query: (testCase) => ({
                    url: "admin/test-cases",
                    method: "PUT",
                    body: testCase
                }),
                invalidatesTags:['AdminTestCase']
            }),
            archiveTestCase: builder.mutation<ArchiveTestCaseResponse, string>({
                query: (id) => ({
                    url: `admin/test-cases/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags:['AdminTestCase']
            })
        }
    }
});

export const {
    useAddTestCaseMutation,
    useUpdateTestCaseMutation,
    useArchiveTestCaseMutation} = testCasesApiSlice;

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
