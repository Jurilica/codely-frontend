import { Button, Grid, Typography } from '@mui/material';
import { TestCaseData, useGetProblemQuery } from '../../app/admin-api-slice';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import AddTestCaseForm from '../testcase/AddTestCaseForm';
import CodelyModal from '../../components/modal/CodelyModal';
import Loader from '../../components/loader/Loader';

function EditProblemPage() {
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetProblemQuery(id!);
    const [openAddTestCaseModal, setOpenAddTestCaseModal] = useState(false);

    const [testCases, setTestCases] = useState<TestCaseData[]>([]);

    useEffect(() =>{
        if(isSuccess){
            setTestCases(data?.problem.testCases!);
        }
    },[isSuccess]);

    const handleOpen = () => setOpenAddTestCaseModal(true);
    const handleClose= () => setOpenAddTestCaseModal(false);

    const addToList = (newTestCase: TestCaseData) => {
        console.log(newTestCase);
        setTestCases(oldValues => [...oldValues, newTestCase]);
    };

    return (
        <Grid container>
            <Loader isLoading={isLoading} />
            <CodelyModal  
                isOpen={openAddTestCaseModal}
                onClose={handleClose}
            >
                <AddTestCaseForm problemId={Number(id)} handleClose={handleClose} addToList={addToList}/>
            </CodelyModal>
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
                <Grid container direction="column" spacing={2}>
                    <Button onClick={handleOpen}>Add test case</Button>
                    <Grid item>
                        {data?.problem.testCases.map((testCase) =>
                            <Grid key={testCase.id}>
                                <Grid>
                                    Input: {testCase.input}
                                    Output: {testCase.output}
                                </Grid>
                            </Grid>)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EditProblemPage;