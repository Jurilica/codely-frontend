import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TestCaseForm, { TestCaseFormData } from "./TestCaseForm";
import { TestCaseData, UpdateTestCaseRequest, useUpdateTestCaseMutation } from "../../app/admin-api-slice";

interface UpdateTestCaseFormProps {
    testCase: TestCaseData;
    handleClose: () => void;
}

function UpdateTestCaseForm({testCase, handleClose}: UpdateTestCaseFormProps) {
    const [updateTestCase, result] = useUpdateTestCaseMutation();

    function handleSubmit(values: TestCaseFormData) {
        var createTestCaseRequest: UpdateTestCaseRequest = {
            testCaseId: testCase.id,
            ...values
        };

        console.log(values);

        updateTestCase(createTestCaseRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("TestCase updated");
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
                <Typography variant="h4" component="h4">Update test case</Typography>
            </Grid>
            <Grid item>
                <TestCaseForm handleSubmit={handleSubmit} initialValues={{input:testCase.input, output:testCase.output}} />
            </Grid>
        </Grid>
    );
}

export default UpdateTestCaseForm;