import { Grid } from "@mui/material";
import { useGetProblemsQuery } from "./problem-api-slice";
import Loader from "../../components/loader/Loader";

function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();

    return (
        <Grid direction="column">
            <Loader isLoading={isLoading} />
            {isSuccess && data.problems.map(problem =>
                <Grid>
                   {problem.id}. {problem.title}
                </Grid>)}
        </Grid>
    );
}

export default ProblemsPage;