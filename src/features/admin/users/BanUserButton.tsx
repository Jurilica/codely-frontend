import { useEffect, useState } from "react";
import { useBanUserMutation, useUnbanUserMutation } from "./usersApiSlice";
import { toast } from "react-toastify";
import { UserStatus } from "../../../app/enums";
import { Button } from "@mui/material";
import CodelyConfirmationModal from "../../../components/modal/CodelyConfirmationModal";

interface ChangeUserStatusButtonProps{
    username: string;
    userStatus: UserStatus;
}

function  ChangeUserStatusButton({username, userStatus}: ChangeUserStatusButtonProps){
    const [banUser, banUserResult] = useBanUserMutation();
    const [unbanUser, unbanUserResult] = useUnbanUserMutation();
    
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = () => {
        if(userStatus === UserStatus.Active) {
            banUser(username);
            handleCloseModal();
            return;
        }

        unbanUser(username);
        handleCloseModal();
    }

    useEffect(() => {
        if(banUserResult.isSuccess){
            toast.success("User banned");
        }
    }, [banUserResult.isSuccess])

    useEffect(() => {
        if(unbanUserResult.isSuccess){
            toast.success("User unbanned");
        }
    }, [unbanUserResult.isSuccess])

    return (
        <>
            <Button onClick={handleOpenModal}>
                {userStatus === UserStatus.Active ? "Ban" : "Unban"}
            </Button>
            <CodelyConfirmationModal 
                isOpen={openModal} 
                onConfirm={handleChange} 
                onDecline={handleCloseModal} 
                onClose={handleCloseModal} 
                text={`Are you sure you want to ${userStatus === UserStatus.Active ? "ban" : "unban"} user ${username}?`} 
            />
        </>
    );
};

export default ChangeUserStatusButton;