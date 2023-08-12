import { useParams } from "react-router-dom";
import { ProgrammingLanguage, useGetUserProblemQuery} from "./problemsApiSlice";
import { Button, Grid } from "@mui/material";
import Loader from "../../../components/loader/Loader";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import ProblemDescription from "./ProblemDescription";
import ExampleContainer from "../examples/ExampleContainer";
import { SubmitAnswerRequest, useSubmitAnswerMutation } from "../submission/submissionApiSlice";

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
    const {data, isLoading, isSuccess } = useGetUserProblemQuery(id!);
    const [code, setCode] = useState(codeTemplate(ProgrammingLanguage.Cpp));
    const [submitAnswer, result] = useSubmitAnswerMutation();

    const handleSubmit = () => {
        console.log(code);

        var submitAnswerRequest: SubmitAnswerRequest = {
            problemId: Number(id),
            answer: code,
            programmingLanguage: ProgrammingLanguage.Cpp
        };

        submitAnswer(submitAnswerRequest);
    };

    return (
        <Grid container >
            <Loader isLoading={isLoading}/>
            <Grid item xs={12} md={6} lg={6} paddingX="15px" overflow="scroll">
                <ProblemDescription title={data?.problem.title ?? ""} description={data?.problem.description ?? ""} />
                <ExampleContainer examples={data?.problem.examples ?? []}/>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <CodeEditor programmingLanguage={ProgrammingLanguage.Cpp} code={code} setCode={setCode}/>
                <Grid textAlign="right" padding="20px" sx={{backgroundColor:"#0d1117"}}>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
      </Grid>
    );
};

export default ProblemPage;