import { Button } from "@mui/material";
import { useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import UpdateProblemForm from "./UpdateProblemForm";
import { GetProblemsData } from "../../app/admin-api-slice";

interface EditProblemButtonProps{
    problem: GetProblemsData;
}

function EditProblemButton({problem}:EditProblemButtonProps){
    const [openUpdateProblemModal, setOpenUpdateProblemModal] = useState(false);

    const handleOpenUpdateProblemModal = () => setOpenUpdateProblemModal(true);
    const handleCloseUpdateProblemModal = () => setOpenUpdateProblemModal(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpenUpdateProblemModal}>
                Edit problem
            </Button>
            <CodelyModal  
                        isOpen={openUpdateProblemModal}
                        onClose={handleCloseUpdateProblemModal}
                    >
            <UpdateProblemForm problem={problem} handleClose={handleCloseUpdateProblemModal}/>
        </CodelyModal>
        </>
    );
};

export default EditProblemButton;