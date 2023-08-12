import { Card, Grid, Typography } from "@mui/material";
import { useGetUserProblemsQuery } from "./problemsApiSlice";
import Loader from "../../../components/loader/Loader";
import ProblemsTable from "./ProblemsTable";

function ProblemsPage(){
    const {data, isLoading, isSuccess} = useGetUserProblemsQuery(undefined,{
        pollingInterval: 10_000,
      });

    return (
        <Grid item>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Problems</Typography>
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <ProblemsTable data={data.problems}/>}
            </Card>
      </Grid>
    );
};

export default ProblemsPage;