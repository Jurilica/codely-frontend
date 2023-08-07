import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return  {
            login: builder.mutation<LoginResponse, LoginRequest>({
                query: (loginRequest) => ({
                    url: "authentication/login",
                    method: "POST",
                    body: loginRequest
                })
            }),
            refreshToken: builder.mutation<LoginResponse, RefreshTokenRequest>({
                query: (refreshTokenRequest) => ({
                    url: "authentication/refresh-token",
                    method: "POST",
                    body: refreshTokenRequest
                })
            })
        };
    }
})

export const {
    useLoginMutation
} = authApiSlice;

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string | null;
}
