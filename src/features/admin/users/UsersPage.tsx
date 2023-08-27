import { Card, Grid, Typography } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import { useGetUsersQuery } from "./usersApiSlice";
import UsersTable from "./UsersTable";

function UsersPage(){
    const {data, isLoading, isSuccess} = useGetUsersQuery();

    return (
        <Grid item>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Users</Typography>
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <UsersTable data={data.users}/>}
            </Card>
      </Grid>
    );
};

export default UsersPage;