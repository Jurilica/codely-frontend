import { Grid, Typography } from "@mui/material";
import { ExampleData } from "../../app/admin-api-slice";
import AddExampleButton from "./AddExampleButton";
import ExampleTable from "./ExampleTable";

interface ExampleContainerProps {
    examples: ExampleData[];
    problemId: number;
}

function ExampleContainer({examples,problemId}:ExampleContainerProps) {
    return (
        <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography>Examples:</Typography>
                </Grid>
            </Grid>
            <Grid marginTop="25px" width="100%">
                <ExampleTable data={examples} />
            </Grid>
            <Grid item>
                <AddExampleButton problemId={problemId} />
            </Grid>
        </Grid>
    );
}

export default ExampleContainer;