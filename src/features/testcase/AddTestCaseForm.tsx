import { Grid, Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../../components/form/CodelyTextField";
import { CreateTestCaseRequest, useAddTestCaseMutation } from "./testcase-api-slice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TestCaseForm, { TestCaseData } from "../../components/testcase/TestCaseForm";

function AddTestCaseForm({problemId, handleClose }: {problemId:number, handleClose:() => void}) {
    const [addTestCase, result] = useAddTestCaseMutation();

    function handleSubmit(values: TestCaseData) {
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
    },[result.isSuccess])

    return (
      <TestCaseForm handleSubmit={handleSubmit} initialValues={{input:"", output:""}} />
    );
}

export default AddTestCaseForm;