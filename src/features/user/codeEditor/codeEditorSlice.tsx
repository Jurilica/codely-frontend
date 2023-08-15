import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProgrammingLanguage } from "../../../app/enums";

interface CodeEditorState {
    programmingLanguage: ProgrammingLanguage;
    code: string;
}

const initialState: CodeEditorState = {
    programmingLanguage: ProgrammingLanguage.C,
    code: ""
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
        resetCodeEditor: (state) => {
            state.code = "";
        }
    }
});

export const { setProgrammingLanguage, setCode, resetCodeEditor } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;