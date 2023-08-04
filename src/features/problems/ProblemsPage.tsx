import { Button, Card, Grid, Typography } from "@mui/material";
import { useArchiveProblemMutation, useGetProblemsQuery } from "../../app/admin-api-slice";
import Loader from "../../components/loader/Loader";
import ProblemsTable from "../../components/problems/ProblemsTable";
import { useEffect, useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import AddProblemForm from "./AddProblemForm";
import { toast } from "react-toastify";

function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();
    const [archiveProblem, result] = useArchiveProblemMutation();

    const [openAddProblemModal, setOpenAddProblemModal] = useState(false);

    const handleOpenAddProblemModal = () => setOpenAddProblemModal(true);
    const handleCloseAddProblemModal = () => setOpenAddProblemModal(false);

    const handleDelete = (id:number) =>  {
        archiveProblem(id.toString());
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("Problem deleted");
        }
    }, [result.isSuccess])

    return (
        <Grid item xs={12} md={7} lg={8}>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Problems</Typography>
                </Grid>
                <Grid item >
                    <Button onClick={handleOpenAddProblemModal}>Add new problem</Button>
                    <CodelyModal  
                        isOpen={openAddProblemModal}
                        onClose={handleCloseAddProblemModal}
                    >
                        <AddProblemForm handleClose={handleOpenAddProblemModal}/>
                    </CodelyModal>
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <ProblemsTable data={data} handleDelete={handleDelete}/>}
            </Card>
      </Grid>
    );
}

export default ProblemsPage;
