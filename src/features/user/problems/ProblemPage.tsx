import { useParams } from "react-router-dom";
import { useGetUserProblemQuery} from "./problemsApiSlice";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import CodeEditor from "../codeEditor/CodeEditor";
import { useEffect, useState } from "react";
import ProblemDescription from "./ProblemDescription";
import ExampleContainer from "../examples/ExampleContainer";
import { useAppDisptach } from "../../../app/hooks";
import { resetCodeEditor } from "../codeEditor/codeEditorSlice";
import SubmissionTable from "../submission/SubmissionTable";

function ProblemPage(){
    const dispatch = useAppDisptach();

    let {id} = useParams();
    const {data, isLoading, isSuccess } = useGetUserProblemQuery(id!);
    const [tab, setTab] = useState(0);
   
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        dispatch(resetCodeEditor());
    },[dispatch])

    return (
        <Grid container alignItems="stretch" height="100%">
            <Loader isLoading={isLoading}/>
            <Grid item xs={12} md={6} lg={6} paddingX="15px" minHeight="720px" height="80vh" sx={{overflow:"hidden"}} marginBottom="20px">
                <Box marginBottom="10px">
                    <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Description" />
                        <Tab label="Submissions"/>
                    </Tabs>
                </Box>
                {tab === 0 &&
                    <Grid boxShadow="3" padding="20px" borderRadius="10px">
                        <ProblemDescription title={data?.problem.title ?? ""} description={data?.problem.description ?? ""} difficulty={data?.problem.difficulty!}/>
                        <ExampleContainer examples={data?.problem.examples ?? []}/>
                    </Grid>}
                {tab === 1 &&
                    <SubmissionTable problemId={Number(id)} />
                }
            </Grid>
            <Grid item xs={12} md={6} lg={6} minHeight="720px" height="80vh" borderRadius="10px" overflow="hidden">
                <CodeEditor problemId={Number(id)}/>
            </Grid>
      </Grid>
    );
};

export default ProblemPage;