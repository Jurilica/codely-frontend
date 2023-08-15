import { apiSlice } from "../../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return  {
            register: builder.mutation<AuthResponse, RegisterRequest>({
                query: (registerRequest) => ({
                    url: "authentication/register",
                    method: "POST",
                    body: registerRequest
                }),
                invalidatesTags:['AdminProblem', 'AdminTestCase', 'AdminExample', 'UserProblem', 'UserSubmission']
            }),
            login: builder.mutation<AuthResponse, LoginRequest>({
                query: (loginRequest) => ({
                    url: "authentication/login",
                    method: "POST",
                    body: loginRequest
                }),
                invalidatesTags:['AdminProblem', 'AdminTestCase', 'AdminExample', 'UserProblem', 'UserSubmission']
            }),
            refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
                query: (refreshTokenRequest) => ({
                    url: "authentication/refresh-token",
                    method: "POST",
                    body: refreshTokenRequest
                }),
                invalidatesTags:['AdminProblem', 'AdminTestCase', 'AdminExample', 'UserProblem', 'UserSubmission']
            })
        };
    }
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApiSlice;

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string | null;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
}
