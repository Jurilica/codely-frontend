import { Typography, Grid, Button } from "@mui/material";
import CodelyModal from "./CodelyModal";

interface CodleyConfirmationModalProps{
    isOpen: boolean;
    onConfirm: () => void;
    onDecline: () => void;
    onClose: () => void;
    text: string;
}

function CodelyConfirmationModal({isOpen, onConfirm, onDecline, onClose, text}:CodleyConfirmationModalProps) {
    return (
        <CodelyModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Typography> {text}</Typography>
            <Grid container direction="row" spacing={5} marginTop="10px">
                <Grid item xs={6} textAlign="right">
                    <Button variant="contained" onClick={onConfirm}>Yes</Button>
                </Grid> 
                <Grid item xs={6} textAlign="left">
                    <Button variant="outlined" onClick={onDecline}>No</Button>
                </Grid>
            </Grid>
        </CodelyModal>
    );
}

export default CodelyConfirmationModal;