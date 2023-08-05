import { useEffect } from "react";
import { ExampleData, UpdateExampleRequest, useUpdateExampleMutation } from "../../app/admin-api-slice";
import ExampleForm, { ExampleFormData } from "./ExampleForm";
import { toast } from "react-toastify";
import { Grid, Typography } from "@mui/material";


interface UpdateExampleFormProps {
    example: ExampleData;
    handleClose: () => void;
}

function UpdateExampleForm({example, handleClose}: UpdateExampleFormProps) {
    const [updateExample, result] = useUpdateExampleMutation();

    function handleSubmit(values: ExampleFormData) {
        var updateExampleRequest: UpdateExampleRequest = {
            exampleId: example.id,
            ...values
        }

        updateExample(updateExampleRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            toast.success("Example updated");
            handleClose();
        }
    },[result.isSuccess, handleClose])

    return (
        <Grid 
            container
            spacing={1} 
            alignItems="center" 
            justifyContent="center"
            direction="column"
            >
            <Grid item>
                <Typography variant="h4" component="h4">Update example</Typography>
            </Grid>
            <Grid item>
                <ExampleForm handleSubmit={handleSubmit} initialValues={{input:example.input, output:example.output, explanation: example.explanation}} />
            </Grid>
        </Grid>
      
    );
}

export default UpdateExampleForm;