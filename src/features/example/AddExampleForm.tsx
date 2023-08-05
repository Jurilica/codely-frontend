import { Grid, Typography } from "@mui/material";
import { CreateExampleRequest, useAddExampleMutation } from "../../app/admin-api-slice";
import ExampleForm, { ExampleData } from "./ExampleForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface CreateExampleFormProps {
    handleClose: () => void;
    problemId: number;
}

function AddProblemForm({handleClose, problemId}:CreateExampleFormProps) {
    const [addExample, result] = useAddExampleMutation();

    function handleSubmit(values: ExampleData) {
        var createExampleRequest: CreateExampleRequest = {
            problemId: problemId,
            ...values
        };

        addExample(createExampleRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("Example added");
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
                <Typography variant="h4" component="h4">Create example</Typography>
            </Grid>
            <Grid item>
                <ExampleForm handleSubmit={handleSubmit} initialValues={{input:"", output:"", explanation: ""}} />
            </Grid>
        </Grid>
    );
}

export default AddProblemForm;