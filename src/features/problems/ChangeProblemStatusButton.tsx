import { useEffect, useState } from "react";
import { GetProblemsData, ProblemStatus, usePublishProblemMutation, useUnpublishProblemMutation } from "../../app/admin-api-slice";
import { toast } from "react-toastify";
import CodelyConfirmationModal from "../../components/modal/CodelyConfirmationModal";
import { Button } from "@mui/material";

interface ChangeProblemStatusButtonProps{
    problem: GetProblemsData;
}

function  ChangeProblemStatusButton({problem,}: ChangeProblemStatusButtonProps){
    const [publishProblem, publishProblemResult] = usePublishProblemMutation();
    const [unpublishProblem, unpublishProblemResult] = useUnpublishProblemMutation();
    
    const [openPublishUnpublishProblemModal, setOpenPublishUnpublishProblemProblemModal] = useState(false);

    const handleOpenPublishUnpublishProblemProblemModal = () => setOpenPublishUnpublishProblemProblemModal(true);
    const handleClosePublishUnpublishProblemProblemModal = () => setOpenPublishUnpublishProblemProblemModal(false);

    const handleChange = () => {
        if(problem.problemStatus == ProblemStatus.Published) {
            unpublishProblem(problem.id.toString());
            handleClosePublishUnpublishProblemProblemModal();
            return;
        }

        publishProblem(problem.id.toString());
        handleClosePublishUnpublishProblemProblemModal();
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
            <Button variant="contained" onClick={handleOpenPublishUnpublishProblemProblemModal}>
                {problem.problemStatus === ProblemStatus.Unpublished ? "Publish problem" : "Unpublish problem"}
            </Button>
            <CodelyConfirmationModal 
                isOpen={openPublishUnpublishProblemModal} 
                onConfirm={handleChange} 
                onDecline={handleClosePublishUnpublishProblemProblemModal} 
                onClose={handleClosePublishUnpublishProblemProblemModal} 
                text={`Are you sure you want to ${problem.problemStatus === ProblemStatus.Unpublished ? "publish" : "unpublish"} problem  ${problem.title}?`} 
            />
        </>
    );
};

export default ChangeProblemStatusButton;