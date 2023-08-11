import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../../../components/form/CodelyTextField";

export interface ProblemData {
    title: string;
    description: string;
}

interface ProblemFormProps {
    handleSubmit: (values: ProblemData) => void;
    initialValues: ProblemData;
}

function ProblemForm({handleSubmit, initialValues}:ProblemFormProps) {
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
                                    name="title"
                                    label="Title"
                                    component={CodelyTextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field 
                                    name="description"
                                    label="Description"
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

export default ProblemForm;