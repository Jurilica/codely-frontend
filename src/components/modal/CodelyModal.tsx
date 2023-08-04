import React from 'react';
import { Box, Modal } from '@mui/material';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
};

interface CodleyModalProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function CodelyModal({isOpen, onClose, children}:CodleyModalProps) {
    return (
        <Modal  
            open={isOpen}
            onClose={onClose}
            >
                <Box sx={modalStyle}> 
                    {children}
                </Box>
        </Modal>
    );
}

export default CodelyModal;