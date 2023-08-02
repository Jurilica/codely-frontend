import { Box, Button, Grid, Modal } from '@mui/material';
import { useGetProblemQuery } from './problem-api-slice';
import { useParams } from 'react-router';
import { useState } from 'react';
import AddTestCaseForm from '../testcase/AddTestCaseForm';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function EditProblemPage() {
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetProblemQuery(id!);

    const [openAddTestCaseModal, setOpenAddTestCaseModal] = useState(false);

    const handleOpen = () => setOpenAddTestCaseModal(true);
    const handleClose = () => setOpenAddTestCaseModal(false);

    return (
        <>
            {isLoading && <div>Loading</div>}
            {isSuccess && <div> {data.problem.title} </div>}
            <Button onClick={handleOpen}>Add test case</Button>
            <Modal  
                open={openAddTestCaseModal}
                onClose={handleClose}
                >
                    <Box sx={modalStyle}> 
                        <AddTestCaseForm problemId={Number(id)} handleClose={handleClose}/>
                    </Box>
            </Modal>
        </>
    );
}

export default EditProblemPage;