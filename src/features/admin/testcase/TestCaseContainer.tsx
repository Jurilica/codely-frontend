import {  Grid, Typography } from "@mui/material";
import TestCaseTable from "./TestCaseTable";
import AddTestCaseButton from "./AddTestCaseButton";
import { TestCaseData } from "../problems/problemsApiSlice";

interface TestCaseContainerProps {
    testCases: TestCaseData[];
    problemId: number;
}

function TestCaseContainer({testCases,problemId}:TestCaseContainerProps) { 
    return (
        <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography>TestCases:</Typography>
                </Grid>
            </Grid>
            <Grid container marginTop="25px">
                <TestCaseTable data={testCases} />
            </Grid>
            <Grid item>
                <AddTestCaseButton problemId={problemId}/>
            </Grid>
       </Grid>
    );
}

export default TestCaseContainer;