import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetProblemsData, useArchiveProblemMutation } from "../../app/admin-api-slice";
import CodelyConfirmationModal from "../../components/modal/CodelyConfirmationModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteProblemButtonProps{
    problem: GetProblemsData;
    variant: "contained" | "outlined" | "text";
    shouldNavigate?: boolean;
}

function DeleteProblemButton({problem, variant, shouldNavigate = false}:DeleteProblemButtonProps){
    const [archiveProblem, result] = useArchiveProblemMutation();
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDelete = () =>  {
        archiveProblem(problem.id.toString());
        handleCloseModal();
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
            <Button variant={variant} onClick={handleOpenModal}>
                Delete problem
            </Button>
            <CodelyConfirmationModal 
                isOpen={openModal} 
                onConfirm={handleDelete} 
                onDecline={handleCloseModal} 
                onClose={handleCloseModal} 
                text={`Are you sure you want to delete ${problem.title}?`} 
            />
        </>
    );
};

export default DeleteProblemButton;