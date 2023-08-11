import { useEffect, useState } from "react";
import { GetProblemsData, ProblemStatus, usePublishProblemMutation, useUnpublishProblemMutation } from './problemsApiSlice';
import { toast } from "react-toastify";
import CodelyConfirmationModal from "../../../components/modal/CodelyConfirmationModal";
import { Button } from "@mui/material";

interface ChangeProblemStatusButtonProps{
    problem: GetProblemsData;
    variant: "contained" | "outlined" | "text";
}

function  ChangeProblemStatusButton({problem, variant}: ChangeProblemStatusButtonProps){
    const [publishProblem, publishProblemResult] = usePublishProblemMutation();
    const [unpublishProblem, unpublishProblemResult] = useUnpublishProblemMutation();
    
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = () => {
        if(problem.problemStatus === ProblemStatus.Published) {
            unpublishProblem(problem.id.toString());
            handleCloseModal();
            return;
        }

        publishProblem(problem.id.toString());
        handleCloseModal();
    }

    useEffect(() => {
        if(publishProblemResult.isSuccess){
            toast.success("Problem published");
        }
    }, [publishProblemResult.isSuccess])

    useEffect(() => {
        if(unpublishProblemResult.isSuccess){
            toast.success("Problem unpublished");
        }
    }, [unpublishProblemResult.isSuccess])

    return (
        <>
            <Button variant={variant} onClick={handleOpenModal}>
                {problem.problemStatus === ProblemStatus.Unpublished ? "Publish problem" : "Unpublish problem"}
            </Button>
            <CodelyConfirmationModal 
                isOpen={openModal} 
                onConfirm={handleChange} 
                onDecline={handleCloseModal} 
                onClose={handleCloseModal} 
                text={`Are you sure you want to ${problem.problemStatus === ProblemStatus.Unpublished ? "publish" : "unpublish"} problem  ${problem.title}?`} 
            />
        </>
    );
};

export default ChangeProblemStatusButton;