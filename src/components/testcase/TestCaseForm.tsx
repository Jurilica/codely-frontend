import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../form/CodelyTextField";

export interface TestCaseFormData {
    input: string;
    output: string;
}

interface TestCaseFormProps {
    handleSubmit: (values: TestCaseFormData) => void;
    initialValues: TestCaseFormData;
}

function TestCaseForm({handleSubmit, initialValues}:TestCaseFormProps) {
    return (
        <Formik initialValues={{...initialValues}} 
            onSubmit={(values) => handleSubmit({...values})}>
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

export default TestCaseForm;