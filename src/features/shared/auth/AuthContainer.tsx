import { Avatar, Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from '../../../components/loader/Loader';
import React from 'react';

interface AuthContainerProps {
    isLoading: boolean;
    form: React.ReactNode;
    link: React.ReactNode;
    title: string;
}

function AuthContainer({isLoading, form, link, title}: AuthContainerProps) {
    return (
        <Container component="main" maxWidth="xs" sx={{backgroundColor:"white", borderRadius:"15px", boxShadow: 3}}>
            <Loader isLoading= {isLoading} />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: "20px"
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               {title}
            </Typography>
            <Box sx={{ mt: 1 }}>
                {form}
                <Grid container>
                    <Grid item>
                       {link}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
    );
}

export default AuthContainer;