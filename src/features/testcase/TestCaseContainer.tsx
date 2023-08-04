import { Button, Grid } from "@mui/material";
import { TestCaseData } from "../../app/admin-api-slice";
import { useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import AddTestCaseForm from "./AddTestCaseForm";
import TestCaseTable from "./TestCaseTable";

interface TestCaseContainerProps {
    testCases: TestCaseData[];
    problemId: number;
}

function TestCaseContainer({testCases,problemId}:TestCaseContainerProps) {
    const [openAddTestCaseModal, setOpenAddTestCaseModal] = useState(false);

    const handleOpen = () => setOpenAddTestCaseModal(true);
    const handleClose= () => setOpenAddTestCaseModal(false);
    
    return (
       <Grid container>
            <Grid container direction="column" spacing={2}>
                    <Button onClick={handleOpen}>Add test case</Button>
                    <TestCaseTable data={testCases} />
                </Grid>
            <CodelyModal  
                isOpen={openAddTestCaseModal}
                onClose={handleClose}
            >
                <AddTestCaseForm problemId={problemId} handleClose={handleClose}/>
            </CodelyModal>
       </Grid>
    );
}

export default TestCaseContainer;