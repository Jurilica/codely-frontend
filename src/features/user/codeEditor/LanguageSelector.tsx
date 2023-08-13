import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDisptach } from "../../../app/hooks";
import { setDefaultCode, setProgrammingLanguage } from "./codeEditorSlice";
import { ProgrammingLanguage } from "../../../app/enums";

function LanguageSelector(){
    const language = useSelector((state: RootState) => state.codeEditor.programmingLanguage);
    const dispatch = useAppDisptach();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        let value = event.target.value as string;
        let selectedLanguage: ProgrammingLanguage = ProgrammingLanguage[value as keyof typeof ProgrammingLanguage];
        dispatch(setProgrammingLanguage(selectedLanguage));
        dispatch(setDefaultCode());
    };

    const languageValues = Object.values(ProgrammingLanguage);

    return (
        <FormControl >
            <InputLabel id="language-select-label" sx={{color:"white"}}>Language</InputLabel>
            <Select
                label="Language"
                labelId="language-select-label"
                sx={{color:"white", marginRight: "20px", textAlign:"left", width:"200px"}}
                defaultValue={language}
                onChange={handleLanguageChange}
                value={language}
            >
                {languageValues.map(language => 
                        <MenuItem value={language} key={language}>{language}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
     
    );
};

export default LanguageSelector;