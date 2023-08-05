import { Button, Card, Grid, Typography } from '@mui/material';
import Loader from '../../components/loader/Loader';
import ProblemsTable from './ProblemsTable';
import { useState } from 'react';
import CodelyModal from '../../components/modal/CodelyModal';
import AddProblemForm from './AddProblemForm';
import { useGetProblemsQuery } from '../../app/admin-api-slice';


function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();

    const [openAddProblemModal, setOpenAddProblemModal] = useState(false);

    const handleOpenAddProblemModal = () => setOpenAddProblemModal(true);
    const handleCloseAddProblemModal = () => setOpenAddProblemModal(false);

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
               {isSuccess && <ProblemsTable data={data.problems}/>}
            </Card>
            <CodelyModal  
                isOpen={openAddProblemModal}
                onClose={handleCloseAddProblemModal}
            >
                <AddProblemForm handleClose={handleCloseAddProblemModal}/>
            </CodelyModal>
      </Grid>
    );
}

export default ProblemsPage;
