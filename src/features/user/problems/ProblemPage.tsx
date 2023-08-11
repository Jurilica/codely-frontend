import { useParams } from "react-router-dom";
import { ProgrammingLanguage, useGetUserProblemQuery as useGetUserProblemQuery } from "./problemsApiSlice";
import { Grid } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import CodeEditor from "./CodeEditor";
import { useState } from "react";

const cTemplate = '// Your C code\n' +
    '#include <stdio.h>\n' +
    '\n' +
    'int main() {\n' +
    '\tprintf("Hello, World!");\n' +
    '\treturn 0\n;' +
    '}';

const cppTemplate = '// Your C++ code\n' +
    '#include <iostream>\n' +
    '\n' +
    'int main() {\n' +
    '\tstd::cout << "Hello World!";\n' +
    '\treturn 0;\n' +
    '}';

const jsTemplate = 'console.log("Hello World!")';

const pythonTemplate = '#Write your python code here\n' +
    'print("Hello World!")';

const javaTemplate = 'class HelloWorld {\n' +
    '\tpublic static void main(String[] args) {\n' +
    '\t\tSystem.out.println("Hello, World!");\n' +
    '\t}\n'+
    '}';

const codeTemplate = (programmingLanguage:ProgrammingLanguage) => {
    switch(programmingLanguage){
        case ProgrammingLanguage.C:
            return cTemplate;
        case ProgrammingLanguage.Cpp:
            return cppTemplate;
        case ProgrammingLanguage.JavaScript:
            return jsTemplate;
        case ProgrammingLanguage.Python:
            return pythonTemplate;
        case ProgrammingLanguage.Java:
            return javaTemplate;
        default: 
            return "";
    }
}

function ProblemPage(){
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetUserProblemQuery(id!);
    const [code, setCode] = useState(codeTemplate(ProgrammingLanguage.Java));

    return (
        <Grid item xs={12} md={7} lg={8}>
            <Loader isLoading={isLoading}/>
            <CodeEditor programmingLanguage={ProgrammingLanguage.Cpp} code={code} setCode={setCode}/>
      </Grid>
    );
};

export default ProblemPage;