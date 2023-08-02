import { Grid, Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../../components/form/CodelyTextField";
import { CreateTestCaseRequest, useAddTestCaseMutation } from "./testcase-api-slice";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AddTestCaseForm({problemId, handleClose }: {problemId:number, handleClose:() => void}) {
    const [addTestCase, result] = useAddTestCaseMutation();

    function handleSubmit(values: CreateTestCaseRequest) {
        addTestCase(values);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("TestCase added");
            handleClose();
        }
    },[result.isSuccess])

    return (
        <Formik initialValues={{input: '', output: ''}} 
            onSubmit={(values) => handleSubmit({problemId:problemId, ...values})}>
            {() => {
                return (
                    <Form> 
                        <Grid 
                            container 
                            spacing={1} 
                            alignItems="center" 
                            justifyContent="center" 
                            direction="column"
                            bgcolor="white">
                            <Grid item>
                                <Field 
                                    name="input"
                                    label="Input"
                                    isMultiline={true}
                                    rowsNumbers={10}
                                    component={CodelyTextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field 
                                    name="output"
                                    label="Output"
                                    isMultiline={true}
                                    rowsNumbers={10}
                                    component={CodelyTextField}
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default AddTestCaseForm;