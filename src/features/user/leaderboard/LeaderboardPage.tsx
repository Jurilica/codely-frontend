import { Card, Grid, Typography } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import { useGetLeaderboardQuery } from "./leaderboardApiSlice";
import LeaderboardTable from "./LeaderboardTable";

function LeaderboardPage(){
    const {data, isLoading, isSuccess} = useGetLeaderboardQuery();

    return (
        <Grid item>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Problems</Typography>
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <LeaderboardTable data={data.leaderboard}/>}
            </Card>
      </Grid>
    );
};

export default LeaderboardPage;