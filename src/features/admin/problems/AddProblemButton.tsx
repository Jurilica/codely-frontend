import { Button } from "@mui/material";
import CodelyModal from "../../../components/modal/CodelyModal";
import AddProblemForm from "./AddProblemForm";
import { useState } from "react";

function  AddProblemButton(){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpenModal}>
                Add problem
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <AddProblemForm handleClose={handleCloseModal} />
        </CodelyModal>
        </>
    );
};

export default  AddProblemButton;