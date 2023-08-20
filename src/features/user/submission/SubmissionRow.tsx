import { TableCell,TableRow } from "@mui/material";
import { GetSubmissionData } from "./submissionApiSlice";
import { useAppDisptach } from "../../../app/hooks";
import { setCode, setProgrammingLanguage } from "../codeEditor/codeEditorSlice";
import { ProgrammingLanguage } from "../../../app/enums";
import ProblemSubmissionStatusPill from "../../../components/difficulty/ProblemSubmssionStatusPill";

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
        <TableRow hover tabIndex={-1} onClick={() => handleClick(row.answer, row.programmingLanguage)}>
            <TableCell align="left">
                <ProblemSubmissionStatusPill status={row.problemSubmissionStatus} />
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