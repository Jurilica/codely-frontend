import { ProgrammingLanguage } from "./problemsApiSlice";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";

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
            return python();
    }
}

export interface CodeEditorProps{
    programmingLanguage: ProgrammingLanguage;
    code: string;
    setCode: (code: string) => void;
}

function CodeEditor({programmingLanguage, code, setCode}: CodeEditorProps){

    return (
        <CodeMirror
            value={code}
            height="80vh"
            placeholder="Write your code here"
            extensions={[codeMirrorLanguage(programmingLanguage)]}
            onChange={(value) => {
                setCode(value);
        }}
        />
    );
};

export default CodeEditor;