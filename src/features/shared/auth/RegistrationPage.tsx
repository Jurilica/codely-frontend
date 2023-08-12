import { Button, Link} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import CodelyTextField from "../../../components/form/CodelyTextField";
import { useNavigate } from "react-router-dom";
import { setUserLocalStorageData } from "../../../utils/storageHelpers";
import AuthContainer from "./AuthContainer";
import { RegisterRequest, useRegisterMutation } from "./authApiSlice";
import { getInitialRoute } from "../../../utils/navigateHelper";

interface RegistrationFormData {
    email: string;
    username: string;
    password: string;
}

const initalValues: RegistrationFormData = {
    email: "",
    username: "",
    password: ""
};

function RegistrationPage() {
    const [register, result] = useRegisterMutation();
    const navigate = useNavigate();

    function handleSubmit(values: RegistrationFormData) {
        let registerRequest: RegisterRequest = {...values};
        register(registerRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            setUserLocalStorageData(result.data);
            navigate(getInitialRoute());
        }
    },[result.isSuccess, result.data, navigate]);

    const link = (
        <Link href="/login" variant="body2">
            Already have an account? Sign in
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
                            name="email"
                            label="Email"
                            required
                            fullWidth
                            type="email"
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
                        Sign Up
                        </Button>
                    </Form>
                )}}
        </Formik>);

    return (
        <AuthContainer link={link} isLoading={result.isLoading} form={form} title={"Sing Up"} />
    );
}

export default RegistrationPage;