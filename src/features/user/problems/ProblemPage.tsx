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
            <Grid item xs={12} md={6} lg={6} paddingX="15px" minHeight="500px" height="90vh" sx={{overflowY:"scroll"}} marginBottom="10px">
                <Box marginBottom="10px">
                    <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Description" />
                        <Tab label="Submissions"/>
                    </Tabs>
                </Box>
                {tab === 0 &&
                    <>
                        <ProblemDescription title={data?.problem.title ?? ""} description={data?.problem.description ?? ""} />
                        <ExampleContainer examples={data?.problem.examples ?? []}/>
                    </>}
                {tab === 1 &&
                    <SubmissionTable problemId={Number(id)} />
                }
            </Grid>
            <Grid item xs={12} md={6} lg={6} minHeight="500px" height="90vh">
                <CodeEditor problemId={Number(id)}/>
            </Grid>
      </Grid>
    );
};

export default ProblemPage;