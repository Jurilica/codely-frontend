import { useState } from "react";
import { TestCaseData } from "../../app/admin-api-slice";
import { Button } from "@mui/material";
import CodelyModal from "../../components/modal/CodelyModal";
import UpdateTestCaseForm from "./UpdateTestCaseForm";

interface EditTestCaseButtonProps{
    testCase: TestCaseData;
}

function EditTestCaseButton({testCase}:EditTestCaseButtonProps){
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Button  onClick={handleOpenModal}>
                Edit
            </Button>
            <CodelyModal  
                isOpen={openModal}
                onClose={handleCloseModal}
            >
            <UpdateTestCaseForm testCase={testCase} handleClose={handleCloseModal}/>
        </CodelyModal>
        </>
    );
};

export default EditTestCaseButton;