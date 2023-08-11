import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CodelyConfirmationModal from "../../../components/modal/CodelyConfirmationModal";
import { TestCaseData } from "../problems/problemsApiSlice";
import { useArchiveTestCaseMutation } from "./testCasesApiSlice";

interface DeleteTestCaseButtonProps{
    testCase: TestCaseData;
}

function DeleteTestCaseButton({testCase}:DeleteTestCaseButtonProps){
    const [archiveTestCase, result] = useArchiveTestCaseMutation();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleDelete = () =>  {
        archiveTestCase(testCase.id.toString());
        handleCloseModal();
    };

    useEffect(() => {
        if(result.isSuccess){
            toast.success("TestCase deleted");
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
                text={`Are you sure you want to delete tests case: ${testCase.id}?`} 
            />
        </>
    );
};

export default DeleteTestCaseButton;