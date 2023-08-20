import { githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { Button, Grid} from "@mui/material";
import LanguageSelector from "./LanguageSelector";
import { SubmitAnswerRequest, useSubmitAnswerMutation } from "../submission/submissionApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useAppDisptach } from "../../../app/hooks";
import { setCode } from "./codeEditorSlice";
import { ProgrammingLanguage } from '../../../app/enums';

const codeMirrorLanguage = (programmingLanguage: ProgrammingLanguage) => {
    switch(programmingLanguage){
        case ProgrammingLanguage.C:
            return cpp();
        case ProgrammingLanguage.Cpp:
            return cpp();
        case ProgrammingLanguage.JavaScript:
            return javascript();
        case ProgrammingLanguage.Python:
            return python();
        case ProgrammingLanguage.Java:
            return java();
        default: 
            return cpp();
    }
}

export interface CodeEditorProps{
    problemId: number;
}

function CodeEditor({problemId}: CodeEditorProps){
    const programmingLanguage = useSelector((state: RootState) => state.codeEditor.programmingLanguage);
    const code = useSelector((state: RootState) => state.codeEditor.code);
    const dispatch = useAppDisptach();
    const [submitAnswer, result] = useSubmitAnswerMutation();

    const handleSubmit = () => {
        var submitAnswerRequest: SubmitAnswerRequest = {
            problemId: problemId,
            answer: code,
            programmingLanguage: programmingLanguage
        };

        submitAnswer(submitAnswerRequest);
    };

    const handleCodeChange = (value: string) => {
        dispatch(setCode(value));
    }

    return (
        <>
            <Grid>
                <CodeMirror
                    value={code}
                    theme={githubDark}
                    minHeight="400px"
                    height="calc(80vh - 96px)"
                    placeholder="Write your code here"
                    extensions={[codeMirrorLanguage(programmingLanguage)]}
                    onChange={(value) => { handleCodeChange(value);}}
                />
            </Grid>
            <Grid textAlign="right" padding="20px" sx={{backgroundColor:"#0d1117"}} justifyContent="center" height="96px">
                <LanguageSelector />
                <Button variant="contained" onClick={handleSubmit} disabled={result.isLoading}>Submit</Button>
            </Grid>
        </>
    );
};

export default CodeEditor;