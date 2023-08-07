import { Button } from "@mui/material";
import { useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import UpdateProblemForm from "./UpdateProblemForm";
import { GetProblemsData } from "../../app/adminApiSlice";

interface EditProblemButtonProps{
    problem: GetProblemsData;
    variant: "contained" | "outlined" | "text";
}

function EditProblemButton({problem, variant}:EditProblemButtonProps){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button variant={variant} onClick={handleOpenModal}>
                Edit problem
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <UpdateProblemForm problem={problem} handleClose={handleCloseModal}/>
        </CodelyModal>
        </>
    );
};

export default EditProblemButton;