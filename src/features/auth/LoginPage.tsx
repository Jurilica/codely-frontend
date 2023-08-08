import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Field, Form, Formik } from "formik";
import { LoginRequest, useLoginMutation } from "./authApiSlice";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { useAppDisptach } from "../../app/hooks";
import CodelyTextField from "../../components/form/CodelyTextField";
import { useNavigate } from "react-router-dom";
import { setUserLocalStorageData } from "../../utils/storageHelpers";

interface LoginFormData {
    username: string;
    password: string;
}

const initalValues: LoginFormData = {
    username: "",
    password: ""
};

function LoginPage() {
    const [login, result] = useLoginMutation();
    const navigate = useNavigate();

    function handleSubmit(values: LoginFormData) {
        let loginRequest: LoginRequest = {...values};
        login(loginRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            setUserLocalStorageData(result.data);
            navigate("/problems");
        }

    },[result.isSuccess,result.data, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <Loader isLoading={result.isLoading} />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Formik initialValues={{...initalValues}} 
                    onSubmit={(values) => handleSubmit(values)}>
                         {() => {
                            return (
                                <Form>
                                    <Field 
                                        name="username"
                                        label="Username"
                                        required
                                        fullWidth
                                        margin="normal"
                                        component={CodelyTextField}
                                    />
                                    <Field 
                                        name="password"
                                        label="Password"
                                        required
                                        fullWidth={true}
                                        type="password"
                                        margin="normal"
                                        component={CodelyTextField}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                    Sign In
                                    </Button>
                                </Form>
                            )}}
                    </Formik>
                <Grid container>
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    );
}

export default LoginPage;