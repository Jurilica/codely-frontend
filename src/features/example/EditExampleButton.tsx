import { useState } from "react";
import { Button } from "@mui/material";
import CodelyModal from "../../components/modal/CodelyModal";
import UpdateExampleForm from "./UpdateExampleForm";
import { ExampleData } from "../problems/problemsApiSlice";

interface EditExampleButtonProps{
    example: ExampleData;
}

function EditExampleButton({example}:EditExampleButtonProps){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button onClick={handleOpenModal}>
                Edit
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <UpdateExampleForm example={example} handleClose={handleCloseModal}/>
        </CodelyModal>
        </>
    );
};

export default EditExampleButton;