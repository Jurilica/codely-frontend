import { useState } from "react";
import { Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Theme } from "@mui/material";
import { Column } from "../../app/models";
import SubmissionRow from "../../features/user/submission/SubmissionRow";
import ExampleRow from "../../features/admin/example/ExampleRow";
import AdminProblemRow from "../../features/admin/problems/ProblemRow";
import TestCaseRow from "../../features/admin/testcase/TestCaseRow";
import UserProblemRow from "../../features/user/problems/ProblemRow";

export enum TableType {
    AdminProblem,
    AdminExample,
    AdminTestCase,
    UserProblem,
    UserSubmission
}

interface CodleyTableProps {
    columns: Column[];
    data: any[];
    tableType: TableType;
    sx: SxProps<Theme>;
    rowsPerPageOptions: number[];
    initalNumberOfRows: number;
}

function CodelyTable({columns, data, tableType, sx, rowsPerPageOptions, initalNumberOfRows}:CodleyTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initalNumberOfRows);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow:'hidden'}}>
            <TableContainer sx={sx}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                sx={{backgroundColor:"#F8F9FA"}}
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
                            switch(tableType){
                                case TableType.AdminExample : return <ExampleRow row={row} key={row.id}/>;
                                case TableType.AdminProblem : return <AdminProblemRow row={row} key={row.id}/>;
                                case TableType.AdminTestCase : return <TestCaseRow row={row} key={row.id}/>;
                                case TableType.UserProblem : return <UserProblemRow row={row} key={row.id}/>;
                                case TableType.UserSubmission : return <SubmissionRow row={row} key={row.dateTime}/>;
                            }
                            return <></>;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
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

export default CodelyTable;