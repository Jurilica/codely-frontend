import { Card, Grid, Typography } from '@mui/material';
import Loader from '../../../components/loader/Loader';
import ProblemsTable from './ProblemsTable';
import { useGetAdminProblemsQuery as useGetProblemsQuery } from './problemsApiSlice';
import AddProblemButton from './AddProblemButton';

function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();

    return (
        <Grid item>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Problems</Typography>
                </Grid>
                <Grid item >
                    <AddProblemButton />
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <ProblemsTable data={data.problems}/>}
            </Card>
      </Grid>
    );
}

export default ProblemsPage;
