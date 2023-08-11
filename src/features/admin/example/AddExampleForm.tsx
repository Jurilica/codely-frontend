import { Grid, Typography } from "@mui/material";
import ExampleForm, { ExampleFormData } from "./ExampleForm";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CreateExampleRequest, useAddExampleMutation } from "./examplesAdminApiSlice";

interface CreateExampleFormProps {
    handleClose: () => void;
    problemId: number;
}

function AddExampleForm({handleClose, problemId}:CreateExampleFormProps) {
    const [addExample, result] = useAddExampleMutation();

    function handleSubmit(values: ExampleFormData) {
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
                <Typography variant="h4" component="h4">Add example</Typography>
            </Grid>
            <Grid item>
                <ExampleForm handleSubmit={handleSubmit} initialValues={{input:"", output:"", explanation: ""}} />
            </Grid>
        </Grid>
    );
}

export default AddExampleForm;