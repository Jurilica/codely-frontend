import { GetProblemsData, UpdateProblemRequest, useUpdateProblemMutation} from '../../app/adminApiSlice';
import { useEffect } from 'react';
import ProblemForm, { ProblemData } from './ProblemForm';
import { toast } from 'react-toastify';
import { Grid, Typography } from '@mui/material';

interface  UpdateProblemFormProps {
    problem: GetProblemsData;
    handleClose: () => void;
}

function UpdateProblemForm({problem, handleClose}:UpdateProblemFormProps) {
    const [updateProblem, result] = useUpdateProblemMutation();

    function handleSubmit(values: ProblemData) {
        var updateProblemRequest: UpdateProblemRequest = {
            problemId: problem.id,
            ...values
        };

        updateProblem(updateProblemRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("Problem updated");
            handleClose();
        }
    },[result.isSuccess, handleClose]);

    return (
        <Grid 
            container
            spacing={1} 
            alignItems="center" 
            justifyContent="center"
            direction="column"
        >
            <Grid item>
                <Typography variant="h4" component="h4">Update problem</Typography>
            </Grid>
            <Grid item>
                <ProblemForm handleSubmit={handleSubmit} initialValues={{title:problem.title, description:problem.description}} />
            </Grid>
        </Grid>
    );
}

export default UpdateProblemForm;