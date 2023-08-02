import { TextField } from "@mui/material";
import { FieldProps } from "formik";

interface CodelyTextFieldProps extends FieldProps {
    label: string;
    isMultiline: boolean;
    rowsNumbers: number;
}

function CodelyTextField( {label, isMultiline, rowsNumbers = 1, field}:CodelyTextFieldProps) {
    return (
        <TextField 
            label={label}
            multiline={isMultiline}
            rows={rowsNumbers}
            variant="outlined"
            {...field}
        />
    );
}

export default CodelyTextField;