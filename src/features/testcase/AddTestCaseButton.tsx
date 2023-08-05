import { Button } from "@mui/material";
import { useState } from "react";
import CodelyModal from "../../components/modal/CodelyModal";
import AddTestCaseForm from "./AddTestCaseForm";

interface AddTestCaseButtonProps{
    problemId: number;
}

function AddTestCaseButton({problemId}:AddTestCaseButtonProps){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpenModal}>
                Add test case
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <AddTestCaseForm problemId={problemId} handleClose={handleCloseModal} />
        </CodelyModal>
        </>
    );
};

export default AddTestCaseButton;