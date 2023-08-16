import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import { FieldProps } from "formik";

interface CodelySelectField extends FieldProps {
    label: string;
    isRequired: boolean;
    children: React.ReactNode;
}

function CodelySelectField( {
    label, 
    isRequired = false, 
    children,
    field}:CodelySelectField) {
    return (
        <FormControl sx={{width:"200px", textAlign:"left"}}>
            <InputLabel id="problem-difficulty-label">{label}</InputLabel>
            <Select 
                labelId="problem-difficulty-label"
                label={label}
                required={isRequired}
                variant="outlined"
                {...field}
            >
                {children}
            </Select>
        </FormControl>
    );
}

export default CodelySelectField;