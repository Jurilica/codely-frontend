import { TableRow, TableCell, Link} from "@mui/material";
import { Link as RouterLink} from "react-router-dom";
import { GetProblemsData } from './problemsApiSlice';
import ProblemStatusComponent  from "./ProblemStatusComponent";
import EditProblemButton from "./EditProblemButton";
import DeleteProblemButton from "./DeleteProblemButton";
import ChangeProblemStatusButton from "./ChangeProblemStatusButton";

interface ProblemRowData {
    row: GetProblemsData;
}

function ProblemsTable({row}:ProblemRowData) {
    return (
        <TableRow hover tabIndex={-1}>
            <TableCell component="th" scope="row" align="left">
                <Link color="secondary" component={RouterLink} to={`/admin/problems/${row.id}`} style={{textDecoration: "none"}}>
                    {row.id}
                </Link>
            </TableCell>
            <TableCell align="left">
                {row.title}
            </TableCell>
            <TableCell align="left">
                <ProblemStatusComponent status={row.problemStatus}/>
            </TableCell>
            <TableCell align="left">
                {row.difficulty}
            </TableCell>
            <TableCell align="left">
                <EditProblemButton problem={row} variant="text"/>
            </TableCell>
            <TableCell align="left">
                <DeleteProblemButton problem={row} variant="text"/>
            </TableCell>
            <TableCell align="left">
                <ChangeProblemStatusButton problem={row} variant="text"/>
            </TableCell>
        </TableRow>            
    );
}

export default ProblemsTable;