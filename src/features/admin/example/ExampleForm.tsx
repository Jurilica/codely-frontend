import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../../../components/form/CodelyTextField";

export interface ExampleFormData {
    input: string;
    output: string;
    explanation: string;
}

interface ExampleFormProps {
    handleSubmit: (values: ExampleFormData) => void;
    initialValues: ExampleFormData;
}

function ExampleForm({handleSubmit, initialValues}:ExampleFormProps) {
    return (
        <Formik initialValues={{...initialValues}} 
            onSubmit={(values) => handleSubmit(values)}>
            {() => {
                return (
                    <Form>
                        <Grid 
                            container 
                            spacing={1} 
                            alignItems="center" 
                            justifyContent="center" 
                            direction="column">
                            <Grid item>
                                <Field 
                                    name="input"
                                    label="Input"
                                    isMultiline={true}
                                    rowsNumbers={5}
                                    component={CodelyTextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field 
                                    name="output"
                                    label="Output"
                                    isMultiline={true}
                                    rowsNumbers={5}
                                    component={CodelyTextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field 
                                    name="explanation"
                                    label="Explanation"
                                    isMultiline={true}
                                    rowsNumbers={5}
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

export default ExampleForm;