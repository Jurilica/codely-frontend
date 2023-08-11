import { Button } from "@mui/material";
import { useState } from "react";
import CodelyModal from "../../../components/modal/CodelyModal";
import AddExampleForm from "./AddExampleForm";

interface AddExampleButtonProps{
    problemId: number;
}

function  AddExampleButton({problemId}:AddExampleButtonProps){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpenModal}>
                Add example
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <AddExampleForm problemId={problemId} handleClose={handleCloseModal} />
        </CodelyModal>
        </>
    );
};

export default  AddExampleButton;