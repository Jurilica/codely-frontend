import { Button, Grid, MenuItem} from "@mui/material";
import { Field, Form, Formik } from "formik";
import CodelyTextField from "../../../components/form/CodelyTextField";
import { ProblemDifficulty } from "../../../app/enums";
import CodelySelectField from "../../../components/form/CodelySelectField";

export interface ProblemData {
    title: string;
    description: string;
    difficulty: ProblemDifficulty;
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
                                <Field 
                                    name="difficulty"
                                    label="Difficulty"
                                    isFullWidth={true}
                                    component={CodelySelectField}
                                >
                                    <MenuItem value={ProblemDifficulty.Easy}>{ProblemDifficulty.Easy}</MenuItem>
                                    <MenuItem value={ProblemDifficulty.Medium}>{ProblemDifficulty.Medium}</MenuItem>
                                    <MenuItem value={ProblemDifficulty.Hard}>{ProblemDifficulty.Hard}</MenuItem>
                                </Field>
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