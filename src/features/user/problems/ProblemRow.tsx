import { GetProblemsData } from "./problemsApiSlice";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
                {row.problemSubmissionStatus}
            </TableCell>
        </TableRow>
    );
}

export default ProblemRow;