import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import Loader from '../../../components/loader/Loader';
import { useGetAdminProblemQuery as useGetProblemQuery } from './problemsApiSlice';
import TestCaseContainer from '../testcase/TestCaseContainer';
import ProblemStatusComponent from './ProblemStatusComponent';
import ExampleContainer from '../example/ExampleContainer';
import EditProblemButton from './EditProblemButton';
import DeleteProblemButton from './DeleteProblemButton';
import ChangeProblemStatusButton from './ChangeProblemStatusButton';
import DifficultyPill from '../../../components/difficulty/DifficultyPill';

function EditProblemPage() {
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetProblemQuery(id!);
    
    return (
        <Grid container spacing={3} marginTop="20px" paddingX="20px">
            <Loader isLoading={isLoading} />
            {isSuccess && 
                <>
                    <Grid item lg={6}>
                        <Grid container direction="column" spacing={2} paddingX="10px">
                            <Grid container direction="row" justifyContent="space-between">                               
                                <Typography variant="h3" component="h3" fontWeight="bold" fontSize="2.5rem">{data?.problem.id}. {data?.problem.title}</Typography>
                            </Grid>
                            <Grid item marginTop="10px">
                                <DifficultyPill difficulty={data?.problem.difficulty} />
                            </Grid>
                            <Grid item>
                                <ProblemStatusComponent status={data.problem.problemStatus} fontWeight="bold"/>
                            </Grid>
                            <Grid item height="380px" overflow="scroll">
                                <Typography color="text.secondary" fontSize="1.2rem"  whiteSpace="pre-line">
                                    {data?.problem.description}
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} paddingY="10px" justifyContent="center">
                                <Grid item>
                                   <EditProblemButton problem={{...data.problem}} variant="contained"/>
                                </Grid>
                                <Grid item>
                                    <ChangeProblemStatusButton problem={{...data.problem}} variant="contained"/>
                                </Grid>
                                <Grid item>
                                    <DeleteProblemButton problem={{...data.problem}} shouldNavigate={true} variant="contained"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={6}>
                        <TestCaseContainer testCases={data?.problem.testCases ?? []} problemId={Number(id)} />
                    </Grid>
                    <Grid item xs={12}>
                        <ExampleContainer examples={data?.problem.examples ?? []} problemId={Number(id)} />
                    </Grid>
                </>}
        </Grid>
    );
}

export default EditProblemPage;