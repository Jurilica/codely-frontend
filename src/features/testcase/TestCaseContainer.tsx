import { Button, Grid, Typography } from "@mui/material";
import { TestCaseData, useArchiveTestCaseMutation } from "../../app/admin-api-slice";
import { useEffect, useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import AddTestCaseForm from "./AddTestCaseForm";
import TestCaseTable from "./TestCaseTable";
import UpdateTestCaseForm from "./UpdateTestCaseForm";
import CodelyConfirmationModal from "../../components/modal/CodelyConfirmationModal";
import { toast } from "react-toastify";

interface TestCaseContainerProps {
    testCases: TestCaseData[];
    problemId: number;
}

function TestCaseContainer({testCases,problemId}:TestCaseContainerProps) {
    const [archiveTestCase, result] = useArchiveTestCaseMutation();

    const [openAddTestCaseModal, setOpenAddTestCaseModal] = useState(false);
    const [openUpdateTestCaseModal, setOpenUpdateTestCaseModal] = useState(false);
    const [openDeleteTestCaseModal, setOpenDeleteAddTestCaseModal] = useState(false);

    const [testCaseId, setTestCaseId] = useState(0);

    const handleOpenAddTestCaseModal = () => setOpenAddTestCaseModal(true);
    const handleCloseAddTestCaseModal = () => setOpenAddTestCaseModal(false);

    const handleOpenUpdateTestCaseModal = (id: number) => {
        setTestCaseId(id);
        setOpenUpdateTestCaseModal(true);
    }
    const handleCloseUpdateTestCaseModal = () => setOpenUpdateTestCaseModal(false);

    const handleOpenDeleteTestCaseModal = (id: number) => {
        setTestCaseId(id);
        setOpenDeleteAddTestCaseModal(true);
    }

    const handleCloseDeleteTestCaseModal = () => setOpenDeleteAddTestCaseModal(false);

    const handleDelete = () =>  {
        archiveTestCase(testCaseId.toString());
        handleCloseDeleteTestCaseModal();
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("TestCase deleted");
        }
    }, [result.isSuccess]);
    
    return (
       <Grid container>
            <Grid container direction="column" spacing={2}>
                    <Grid container direction="row" spacing={1} padding="10px">
                        <Grid item xs={4}>
                            <Typography>TestCases:</Typography>
                        </Grid>
                        <Grid item xs={8} textAlign="right" paddingRight="20px">
                            <Button onClick={handleOpenAddTestCaseModal}>Add test case</Button>
                        </Grid>
                    </Grid>
                    <TestCaseTable data={testCases} handleOpenUpdateTestCaseModal={handleOpenUpdateTestCaseModal} handleOpenDeleteTestCaseModal={handleOpenDeleteTestCaseModal}/>
                </Grid>
            <CodelyModal  
                isOpen={openAddTestCaseModal}
                onClose={handleCloseAddTestCaseModal}
            >
                <AddTestCaseForm problemId={problemId} handleClose={handleCloseAddTestCaseModal}/>
            </CodelyModal>
            <CodelyModal  
                isOpen={openUpdateTestCaseModal}
                onClose={handleCloseUpdateTestCaseModal}
            >
                <UpdateTestCaseForm testCase={testCases.find(x => x.id == testCaseId)!} handleClose={handleCloseUpdateTestCaseModal}/>
            </CodelyModal>
            <CodelyConfirmationModal 
                  isOpen={openDeleteTestCaseModal} 
                  onConfirm={handleDelete} 
                  onDecline={handleCloseDeleteTestCaseModal} 
                  onClose={handleCloseDeleteTestCaseModal} 
                  text={`Are you sure you want to delete test case with id: ${testCases.find(x => x.id == testCaseId)?.id} ?`} 
            />
       </Grid>
    );
}

export default TestCaseContainer;