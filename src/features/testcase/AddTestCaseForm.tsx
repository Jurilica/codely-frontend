import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TestCaseForm, { TestCaseFormData } from "../../components/testcase/TestCaseForm";
import { CreateTestCaseRequest, TestCaseData, useAddTestCaseMutation } from "../../app/admin-api-slice";

interface AddTestCaseFormProps {
    problemId: number;
    handleClose: () => void;
    addToList: (testCase: TestCaseData) => void;
}

function AddTestCaseForm({problemId, handleClose, addToList }: AddTestCaseFormProps) {
    const [addTestCase, result] = useAddTestCaseMutation();

    function handleSubmit(values: TestCaseFormData) {
        var createTestCaseRequest: CreateTestCaseRequest = {
            problemId: problemId,
            ...values
        }

        addTestCase(createTestCaseRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("TestCase added");

            let testCase:TestCaseData = {
                id: result.data.testCaseId,
                input: result.originalArgs?.input!,
                output: result.originalArgs?.output!
            }
            
            addToList(testCase);
            handleClose();
        }
    },[result.isSuccess])

    return (
        <Grid 
            container
            spacing={1} 
            alignItems="center" 
            justifyContent="center"
            direction="column"
            >
            <Grid item>
                <Typography variant="h4" component="h4">Create test case</Typography>
            </Grid>
            <Grid item>
                <TestCaseForm handleSubmit={handleSubmit} initialValues={{input:"", output:""}} />
            </Grid>
        </Grid>
      
    );
}

export default AddTestCaseForm;