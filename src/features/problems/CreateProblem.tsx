import { CreateProblemRequest, useAddProblemMutation } from './problem-api-slice';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@mui/material';

function CreateProblem() {
    const [addProblem, result] = useAddProblemMutation();

    function handleSubmit(values: CreateProblemRequest) {
        addProblem(values);
    };

    return (
        <Formik initialValues={{title: '', description: ''}} 
            onSubmit={(values) => handleSubmit(values)}>
            {({values, handleChange, handleBlur}) => (
                <Form>
                    <div>
                        <TextField 
                            name="title" 
                            label="Title" 
                            value={values.title} 
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    </div>
                    <div>
                    <TextField 
                        name="description"
                        label="Description"
                        value={values.description} 
                        multiline
                        rows={10}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                    </div>
                    <Button type="submit">Submit</Button>

                    <div>
                        {result.isLoading && <> Loading</>}
                        {result.isSuccess && <>Radi: {result.data.problemId}</>}
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default CreateProblem;