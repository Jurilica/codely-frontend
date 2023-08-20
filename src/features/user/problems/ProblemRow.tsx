import { GetProblemsData } from "./problemsApiSlice";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DifficultyPill from "../../../components/difficulty/DifficultyPill";
import ProblemSubmissionStatusPill from "../../../components/difficulty/ProblemSubmssionStatusPill";

interface ProblemRowProps {
    row: GetProblemsData;
}

function ProblemRow({row}:ProblemRowProps) {
    const navigate = useNavigate();
  
    const handleClick = (id:number) => {
        navigate(`/problems/${id}`);
    }

    return (
        <TableRow hover tabIndex={-1} key={row.id} onClick={() => handleClick(row.id)}>
            <TableCell align="left">
                {row.title}
            </TableCell>
            <TableCell align="left">
                <ProblemSubmissionStatusPill status={row.problemSubmissionStatus} />
            </TableCell>
            <TableCell align="left">
                <DifficultyPill difficulty={row.difficulty} />
            </TableCell>
        </TableRow>
    );
}

export default ProblemRow;