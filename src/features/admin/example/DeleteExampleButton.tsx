import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CodelyConfirmationModal from "../../../components/modal/CodelyConfirmationModal";
import { useArchiveExampleMutation } from "./examplesApiSlice";
import { ExampleData } from "../problems/problemsApiSlice";

interface DeleteExampleButtonProps{
    example: ExampleData;
}

function DeleteExampleButton({example}:DeleteExampleButtonProps){
    const [archiveExample, result] = useArchiveExampleMutation();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDelete = () =>  {
        archiveExample(example.id.toString());
        handleCloseModal();
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("Example deleted");
        }
    }, [result.isSuccess]);

    return (
        <>
            <Button onClick={handleOpenModal}>
                Delete 
            </Button>
            <CodelyConfirmationModal 
                isOpen={openModal} 
                onConfirm={handleDelete} 
                onDecline={handleCloseModal} 
                onClose={handleCloseModal} 
                text={`Are you sure you want to delete example: ${example.id}?`} 
            />
        </>
    );
};

export default DeleteExampleButton;