import { useState } from "react";
import { Column } from "../../../app/models";
import { GetProblemsData } from "./problemsApiSlice";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Link as RouterLink} from "react-router-dom";

const columns : Column[] = [
    {id:"1", label: "Title"},
    {id:"2", label: "Status"}
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
                        <TableRow hover tabIndex={-1} key={row.id} component={RouterLink} to={`/problems/${row.id}`} style={{textDecoration: "none"}}>
                            <TableCell align="left">
                                {row.title}
                            </TableCell>
                            <TableCell align="left">
                                {row.problemSubmissionStatus}
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