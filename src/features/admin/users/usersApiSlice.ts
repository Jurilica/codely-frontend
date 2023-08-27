import { apiSlice } from "../../../app/apiSlice";
import { UserStatus } from "../../../app/enums";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getUsers: builder.query<GetUsersResponse, void>({
                query: () => ({
                    url: "admin/users",
                    method: "GET"
                }),
                providesTags:['AdminUser']
            }),
            banUser : builder.mutation<BanUserResponse, string>({
                query: (username) => ({
                    url: `admin/users/${username}/ban`,
                    method: "PUT",
                }),
                invalidatesTags:['AdminUser']
            }),
            unbanUser : builder.mutation<UnbanUserResponse, string>({
                query: (username) => ({
                    url: `admin/users/${username}/unban`,
                    method: "PUT",
                }),
                invalidatesTags:['AdminUser']
            })
        }
    }
});

export const {
    useGetUsersQuery,
    useBanUserMutation,
    useUnbanUserMutation} = userApiSlice;

export interface GetUsersResponse {
    users: GetUsersData[];
}

export interface GetUsersData {
    username: string;
    email: string;
    registrationDate: string;
    userStatus: UserStatus;
}

export interface BanUserResponse {
}

export interface UnbanUserResponse {
}