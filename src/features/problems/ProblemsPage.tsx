import { Button, Card, Grid, Typography } from '@mui/material';
import Loader from '../../components/loader/Loader';
import ProblemsTable from './ProblemsTable';
import { useEffect, useState } from 'react';
import CodelyModal from '../../components/modal/CodelyModal';
import AddProblemForm from './AddProblemForm';
import { useArchiveProblemMutation, useGetProblemsQuery } from '../../app/admin-api-slice';
import { toast } from 'react-toastify';
import CodelyConfirmationModal from '../../components/modal/CodelyConfirmationModal';

function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();
    const [archiveProblem, result] = useArchiveProblemMutation();

    const [openAddProblemModal, setOpenAddProblemModal] = useState(false);
    const [openDeleteProblemModal, setOpenDeleteProblemModal] = useState(false);
    const [problemId, setProblemId] = useState(0);

    const handleOpenAddProblemModal = () => setOpenAddProblemModal(true);
    const handleCloseAddProblemModal = () => setOpenAddProblemModal(false);

    const handleOpenDeleteProblemModal = (id:number) => {
        setProblemId(id);
        setOpenDeleteProblemModal(true);
    }

    const handleCloseDeleteProblemModal = () => setOpenDeleteProblemModal(false);

    const handleDelete = () =>  {
        archiveProblem(problemId.toString());
        handleCloseDeleteProblemModal();
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("Problem deleted");
        }
    }, [result.isSuccess]);

    return (
        <Grid item xs={12} md={7} lg={8}>
            <Loader isLoading={isLoading}/>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Problems</Typography>
                </Grid>
                <Grid item >
                    <Button onClick={handleOpenAddProblemModal}>Add new problem</Button>
                </Grid>
            </Grid>
            <Card sx={{ mt: 2 }}>
               {isSuccess && <ProblemsTable data={data.problems} handleOpenDeleteProblemModal={handleOpenDeleteProblemModal}/>}
            </Card>
            <CodelyModal  
                isOpen={openAddProblemModal}
                onClose={handleCloseAddProblemModal}
            >
                <AddProblemForm handleClose={handleOpenAddProblemModal}/>
            </CodelyModal>
            <CodelyConfirmationModal 
                isOpen={openDeleteProblemModal} 
                onConfirm={handleDelete} 
                onDecline={handleCloseDeleteProblemModal} 
                onClose={handleCloseDeleteProblemModal} 
                text={`Are you sure you want to delete ${data?.problems.find(x => x.id == problemId)?.title}?`} 
            />
      </Grid>
    );
}

export default ProblemsPage;
