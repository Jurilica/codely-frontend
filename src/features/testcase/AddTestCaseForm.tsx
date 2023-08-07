import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TestCaseForm, { TestCaseFormData } from "./TestCaseForm";
import { CreateTestCaseRequest, useAddTestCaseMutation } from './testCasesApiSlice';

interface AddTestCaseFormProps {
    problemId: number;
    handleClose: () => void;
}

function AddTestCaseForm({problemId, handleClose}: AddTestCaseFormProps) {
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
            handleClose();
        }
    },[result.isSuccess, handleClose])

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