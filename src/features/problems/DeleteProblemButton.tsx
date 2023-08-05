import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetProblemsData, useArchiveProblemMutation } from "../../app/admin-api-slice";
import CodelyConfirmationModal from "../../components/modal/CodelyConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteProblemButtonProps{
    problem: GetProblemsData;
    shouldNavigate?: boolean;
}

function EditProblemButton({problem, shouldNavigate = false}:DeleteProblemButtonProps){
    const [archiveProblem, result] = useArchiveProblemMutation();
    const [openDeleteProblemModal, setOpenDeleteProblemModal] = useState(false);

    const navigate = useNavigate();

    const handleOpenDeleteProblemModal = () => setOpenDeleteProblemModal(true);
    const handleCloseDeleteProblemModal = () => setOpenDeleteProblemModal(false);

    const handleDelete = () =>  {
        archiveProblem(problem.id.toString());
        handleCloseDeleteProblemModal();
        if(shouldNavigate){
            navigate("/problems");
        }
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("Problem deleted");
        }
    }, [result.isSuccess]);

    return (
        <>
            <Button variant="contained" onClick={handleOpenDeleteProblemModal}>
                Delete problem
            </Button>
            <CodelyConfirmationModal 
                isOpen={openDeleteProblemModal} 
                onConfirm={handleDelete} 
                onDecline={handleCloseDeleteProblemModal} 
                onClose={handleCloseDeleteProblemModal} 
                text={`Are you sure you want to delete ${problem.title}?`} 
            />
        </>
    );
};

export default EditProblemButton;