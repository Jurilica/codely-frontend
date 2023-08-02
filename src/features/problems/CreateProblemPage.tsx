import { CreateProblemRequest, useAddProblemMutation} from './problem-api-slice';
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from '@mui/material';
import CodelyTextField from '../../components/form/CodelyTextField';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CreateProblemPage() {
    const [addProblem, result] = useAddProblemMutation();
    const navigate = useNavigate();

    function handleSubmit(values: CreateProblemRequest) {
        addProblem(values);
    };

    useEffect(() => {
        if(result.isSuccess) {
            navigate(`/problems/${result.data.problemId}`);
        }
    },[result.isSuccess]);


    return (
        <Formik initialValues={{title: '', description: ''}} 
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

export default CreateProblemPage;