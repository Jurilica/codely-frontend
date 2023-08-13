import { useState } from "react";
import { Column } from "../../../app/models";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { GetSubmissionData } from "./submissionApiSlice";
import { ProgrammingLanguage } from "../../../models/ProgrammingLanguage";
import { useAppDisptach } from "../../../app/hooks";
import { setCode, setProgrammingLanguage } from "../codeEditor/codeEditorSlice";

const columns : Column[] = [
    {id:"1", label: "Status"},
    {id:"2", label: "Language"},
    {id:"3", label: "Test cases"},
    {id:"4", label: "Submission date"}
];

interface SubmissionsTableData {
    data: GetSubmissionData[];
}

function SubmissionsTable({data}:SubmissionsTableData) {
    const dispatch = useAppDisptach();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleClick = (answer:string, language: ProgrammingLanguage) => {
        dispatch(setProgrammingLanguage(language));
        dispatch(setCode(answer));
    }

    return (
        <Paper sx={{ width: '100%', overflow:'hidden'}}>
            <TableContainer sx={{ height: '600px'}}>
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

export default SubmissionsTable;