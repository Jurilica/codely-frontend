import { Button, Link} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { LoginRequest, useLoginMutation } from "./authApiSlice";
import { useEffect } from "react";
import CodelyTextField from "../../../components/form/CodelyTextField";
import { useNavigate } from "react-router-dom";
import { setUserLocalStorageData } from "../../../utils/storageHelpers";
import AuthContainer from "./AuthContainer";
import { Role, getUser } from "../../../utils/tokenHelpers";

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

            var user= getUser();
            if(user.userRole === Role.User){
                navigate("/problems");
            }
            navigate("/admin/problems");
        }

    },[result.isSuccess, result.data, navigate]);

    const link = ( 
        <Link href="/register" variant="body2">
            Don't have an account? Sign Up
        </Link>);

    const form = (
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
                                fullWidth
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
        </Formik>);

    return (
        <AuthContainer link={link} isLoading={result.isLoading} form={form} title={"Sing In"} />
    );
}

export default LoginPage;