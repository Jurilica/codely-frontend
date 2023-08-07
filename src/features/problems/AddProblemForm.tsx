import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProblemForm, { ProblemData } from './ProblemForm';
import { toast } from 'react-toastify';
import { Grid, Typography } from '@mui/material';
import { CreateProblemRequest, useAddProblemMutation } from './problemsApiSlice';

interface CreateProblemFormProps {
    handleClose: () => void;
}

function AddProblemForm({handleClose}:CreateProblemFormProps) {
    const [addProblem, result] = useAddProblemMutation();
    const navigate = useNavigate();

    function handleSubmit(values: ProblemData) {
        var createProblemRequest: CreateProblemRequest = {
            ...values
        };

        addProblem(createProblemRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            navigate(`/problems/${result.data.problemId}`);
            toast.success("Problem added");
            handleClose();
        }
    },[result.isSuccess]);

    return (
        <Grid 
            container
            spacing={1} 
            alignItems="center" 
            justifyContent="center"
            direction="column"
        >
            <Grid item>
                <Typography variant="h4" component="h4">Create problem</Typography>
            </Grid>
            <Grid item>
                <ProblemForm handleSubmit={handleSubmit} initialValues={{title:"", description:""}} />
            </Grid>
        </Grid>
    );
}

export default AddProblemForm;