import { TextField } from "@mui/material";
import { FieldProps } from "formik";

interface CodelyTextFieldProps extends FieldProps {
    label: string;
    isMultiline: boolean;
    type: "text" | "password" | "email";
    isRequired: boolean;
    rowsNumbers: number;
    fullWidth: boolean;
    margin: "none" | "dense" | "normal"
}

function CodelyTextField( {
    label, 
    isMultiline = false, 
    rowsNumbers = 1, 
    type = "text", 
    isRequired = false, 
    fullWidth = false,
    margin = "none",
    field}:CodelyTextFieldProps) {
    return (
        <TextField 
            label={label}
            multiline={isMultiline}
            rows={rowsNumbers}
            required={isRequired}
            fullWidth={fullWidth}
            type={type}
            margin={margin}
            variant="outlined"
            {...field}
        />
    );
}

export default CodelyTextField;