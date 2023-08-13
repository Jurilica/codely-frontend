import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { codeTemplate } from "../../../utils/codeEditorHelpers";
import { ProgrammingLanguage } from "../../../models/ProgrammingLanguage";

interface CodeEditorState {
    programmingLanguage: ProgrammingLanguage;
    code: string;
}

const initialState: CodeEditorState = {
    programmingLanguage: ProgrammingLanguage.C,
    code: codeTemplate(ProgrammingLanguage.C)
};

const codeEditorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        setProgrammingLanguage: (state, action: PayloadAction<ProgrammingLanguage>) => {
            state.programmingLanguage = action.payload;
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setDefaultCode: (state) => {
            state.code = codeTemplate(state.programmingLanguage);
        }
    }
});

export const { setProgrammingLanguage, setCode, setDefaultCode } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;