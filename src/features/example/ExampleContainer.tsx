import { Button, Grid, Typography } from "@mui/material";
import { ExampleData } from "../../app/admin-api-slice";
import { useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import AddExampleForm from "./AddExampleForm";
import ExampleTable from "./ExampleTable";

interface ExampleContainerProps {
    examples: ExampleData[];
    problemId: number;
}

function ExampleContainer({examples,problemId}:ExampleContainerProps) {
    const [openAddExampleModal, setOpenAddExampleModal] = useState(false);

    const handleOpenAddExampleModal = () => setOpenAddExampleModal(true);
    const handleCloseAddExampleModal = () => setOpenAddExampleModal(false);

    return (
        <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography>Examples:</Typography>
                </Grid>
            </Grid>
            <Grid marginTop="25px" width="100%">
                <ExampleTable data={examples} handleOpenUpdateExampleModal={function (id: number): void {
                    throw new Error("Function not implemented.");
                } } handleOpenDeleteExampleModal={function (id: number): void {
                    throw new Error("Function not implemented.");
                } } />
            </Grid>
            <Grid item>
                    <Button variant="contained" onClick={handleOpenAddExampleModal}>Add new example</Button>
            </Grid>
            <CodelyModal  
                isOpen={openAddExampleModal}
                onClose={handleCloseAddExampleModal}
            >
                <AddExampleForm problemId={problemId} handleClose={handleCloseAddExampleModal}/>
            </CodelyModal>
        </Grid>
    );
}

export default ExampleContainer;