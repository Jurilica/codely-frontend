import { TableCell,TableRow } from "@mui/material";
import { GetSubmissionData } from "./submissionApiSlice";
import { useAppDisptach } from "../../../app/hooks";
import { setCode, setProgrammingLanguage } from "../codeEditor/codeEditorSlice";
import { ProgrammingLanguage } from "../../../app/enums";

interface SubmissionRowProps {
    row: GetSubmissionData;
}

function SubmissionRow({row}:SubmissionRowProps) {
    const dispatch = useAppDisptach();

    const handleClick = (answer:string, language: ProgrammingLanguage) => {
        dispatch(setProgrammingLanguage(language));
        dispatch(setCode(answer));
    }

    return (
        <TableRow hover tabIndex={-1} key={row.dateTime} onClick={() => handleClick(row.answer, row.programmingLanguage)}>
            <TableCell align="left">
                {row.problemSubmissionStatus}
            </TableCell>
            <TableCell align="left">
                {row.programmingLanguage}
            </TableCell>
            <TableCell align="left">
                {row.numberOfPassedTestCases}/{row.numberOfTestCases}
            </TableCell>
            <TableCell align="left">
                {new Date(row.dateTime).toLocaleString()}
            </TableCell>
        </TableRow>
                    
    );
}

export default SubmissionRow;