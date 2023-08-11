import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Paper, TablePagination} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink} from "react-router-dom";
import { GetProblemsData } from './problemsAdminApiSlice';
import { Column } from "../../../app/models";
import ProblemStatusComponent  from "./ProblemStatusComponent";
import EditProblemButton from "./EditProblemButton";
import DeleteProblemButton from "./DeleteProblemButton";
import ChangeProblemStatusButton from "./ChangeProblemStatusButton";

const columns : Column[] = [
    {id:"1", label: "Id"},
    {id:"2", label: "Title"},
    {id:"3", label: "Status"},
    {id:"4", label: "Edit"},
    {id:"5", label: "Delete"},
    {id:"6", label: "Change status"}
];

interface ProblemsTableData {
    data: GetProblemsData[];
}

function ProblemsTable({data}:ProblemsTableData) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow:'hidden'}}>
            <TableContainer sx={{ height: '760px'}}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell component="th" scope="row" align="left">
                                <Link color="secondary" component={RouterLink} to={`/problems/${row.id}`} style={{textDecoration: "none"}}>
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
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default ProblemsTable;