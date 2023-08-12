import { useParams } from "react-router-dom";
import { ProgrammingLanguage, useGetUserProblemQuery} from "./problemsApiSlice";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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
    '\treturn 0;\n' +
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

const languageValues = Object.values(ProgrammingLanguage);

function ProblemPage(){
    let {id} = useParams();
    const {data, isLoading, isSuccess } = useGetUserProblemQuery(id!);
    const [language, setLanguage] = useState(ProgrammingLanguage.Cpp);
    const [code, setCode] = useState(codeTemplate(language));
    const [submitAnswer, result] = useSubmitAnswerMutation();

    const handleSubmit = () => {
        var submitAnswerRequest: SubmitAnswerRequest = {
            problemId: Number(id),
            answer: code,
            programmingLanguage: ProgrammingLanguage.Cpp
        };

        submitAnswer(submitAnswerRequest);
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        let value = event.target.value as string;
        let selectedLanguage: ProgrammingLanguage = ProgrammingLanguage[value as keyof typeof ProgrammingLanguage];
        setLanguage(selectedLanguage);
        setCode(codeTemplate(selectedLanguage));
    };

    return (
        <Grid container >
            <Loader isLoading={isLoading}/>
            <Grid item xs={12} md={6} lg={6} paddingX="15px" overflow="scroll" minHeight="500px" maxHeight="80vh">
                <ProblemDescription title={data?.problem.title ?? ""} description={data?.problem.description ?? ""} />
                <ExampleContainer examples={data?.problem.examples ?? []}/>
            </Grid>
            <Grid item xs={12} md={6} lg={6} minHeight="500px" maxHeight="80vh">
                <CodeEditor programmingLanguage={language} code={code} setCode={setCode}/>
                <Grid textAlign="right" padding="20px" sx={{backgroundColor:"#0d1117"}} justifyContent="center">
                    <FormControl>
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
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
      </Grid>
    );
};

export default ProblemPage;