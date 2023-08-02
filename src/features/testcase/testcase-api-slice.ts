import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../app/api';

export const testcaseApiSlice = createApi({
    reducerPath: 'testCaseApi',
    baseQuery : baseQueryWithErrorHandling,
    endpoints(builder) {
        return {
            addTestCase : builder.mutation<CreateTestCaseResponse, CreateTestCaseRequest>({
                query: (testCase) => ({
                    url: "admin/test-cases",
                    method: "POST",
                    body: testCase
                })
            })
        }
    }
});

export const { useAddTestCaseMutation } = testcaseApiSlice;

export interface CreateTestCaseRequest {
    problemId: number;
    input: string;
    output: string;
}

export interface CreateTestCaseResponse {
    testCaseId: number;
}



