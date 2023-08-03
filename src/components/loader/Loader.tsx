import { Backdrop, CircularProgress } from "@mui/material";

interface LoaderProps {
    isLoading: boolean;
}

function Loader({isLoading}:LoaderProps) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={() => {}}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;