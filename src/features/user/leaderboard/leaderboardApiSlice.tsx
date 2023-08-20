import { apiSlice } from "../../../app/apiSlice";

export const leaderboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getLeaderboard: builder.query<GetLeaderboardResponse, void>({
                query: () => ({
                    url: `user/leaderboard`,
                    method: "GET"
                }),
                providesTags:['UserLeaderboard']
            })
        }
    }
});

export const {useGetLeaderboardQuery} = leaderboardApiSlice;

export interface GetLeaderboardResponse{
    leaderboard: GetLeaderboardData[];
}

export interface GetLeaderboardData {
    position: number;
    username: string;
    easyProblemsSolved: number;
    mediumProblemsSolved: number;
    hardProblemsSolved: number;
    points: number;
}