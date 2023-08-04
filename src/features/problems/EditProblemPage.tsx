import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import Loader from '../../components/loader/Loader';
import { useGetProblemQuery } from '../../app/admin-api-slice';
import TestCaseContainer from '../testcase/TestCaseContainer';

function EditProblemPage() {
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetProblemQuery(id!);

    return (
        <Grid container>
            <Loader isLoading={isLoading} />
            <Grid item xs={12} lg={6}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                    {data?.problem.id}. {data?.problem.title}
                    </Grid>
                    <Grid item>
                        {data?.problem.description}
                    </Grid>
                    <Grid item>
                        {data?.problem.examples.map((example,index) =>
                            <Grid>
                                <Typography>Example {index+1}:</Typography>
                                <Grid>
                                    Input: {example.input}
                                    Output: {example.output}
                                    Explanation: {example.explanation}
                                </Grid>
                            </Grid>)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TestCaseContainer testCases={data?.problem.testCases ?? []} problemId={Number(id)} />
            </Grid>
        </Grid>
    );
}

export default EditProblemPage;