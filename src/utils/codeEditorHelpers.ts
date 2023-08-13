import { ProgrammingLanguage } from "../models/ProgrammingLanguage";

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

export const codeTemplate = (programmingLanguage:ProgrammingLanguage): string => {
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