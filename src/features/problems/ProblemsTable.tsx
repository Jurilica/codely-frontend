import { Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Paper, TablePagination, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink} from "react-router-dom";
import { toast } from "react-toastify";
import { ProblemStatus, useArchiveProblemMutation, GetProblemsData } from "../../app/admin-api-slice";
import Dot from "../../components/generic/Dot";
import { Column } from "../../app/models";
import CodelyModal from "../../components/modal/CodelyModal";
import CodelyConfirmationModal from "../../components/modal/CodelyConfirmationModal";

const columns : Column[] = [
    {id:"1", label: "Id"},
    {id:"2", label: "Title"},
    {id:"3", label: "Status"},
    {id:"4", label: "Delete"}
];

const ProblemStatusComponent = ({status}: {status: ProblemStatus}) => {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Dot color={status == ProblemStatus.Published ? "green" : "red"} size={8}/>
        <Typography>{status}</Typography>
      </Stack>
    );
  };

interface ProblemsTableData {
    data: GetProblemsData[];
    handleOpenDeleteProblemModal: (id:number) => void;
}

function ProblemsTable({data, handleOpenDeleteProblemModal}:ProblemsTableData) {
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
            <TableContainer sx={{ height: 'max-content', minHeight:'720px', maxHeight:'820px'}}>
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
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="left">
                                    <ProblemStatusComponent status={row.problemStatus}/>
                            </TableCell>
                            <TableCell align="left">
                                <Button onClick={() => {handleOpenDeleteProblemModal(row.id)}}>Delete</Button>
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