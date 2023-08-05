import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { useState } from "react";
import { ExampleData, TestCaseData } from "../../app/admin-api-slice";
import { Column } from "../../app/models";
import { formatLength } from "../../app/stringFormatter";
  
const columns: Column[] = [
    { id: 'id', label: 'Id', maxWidth: 50},
    { id: 'input', label: 'Input', maxWidth: 100 },
    { id: 'output', label: 'Output', maxWidth: 100 },
    { id: 'explanation', label: 'Explanation', maxWidth: 100 },
    { id: 'edit', label: 'Edit', maxWidth: 100 },
    { id: 'delete', label: 'Delete', maxWidth: 100 }
  ];

interface ExampleTableProps {
    data: ExampleData[];
    handleOpenUpdateExampleModal: (id: number) => void;
    handleOpenDeleteExampleModal: (id: number) => void;
} 
export default function ExampleTable({data, handleOpenUpdateExampleModal, handleOpenDeleteExampleModal}: ExampleTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{overflow:"hidden"}}>
      <TableContainer sx={{height:"410px"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
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
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                      {row.id}
                    </TableCell>
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                      {formatLength(row.input)}
                    </TableCell>
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                      {formatLength(row.output)}
                    </TableCell>
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                      {formatLength(row.explanation)}
                    </TableCell>
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                        <Button onClick={() => {handleOpenUpdateExampleModal(row.id)}}>Edit</Button>
                    </TableCell>
                    <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
                        <Button onClick={() => {handleOpenDeleteExampleModal(row.id)}}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
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