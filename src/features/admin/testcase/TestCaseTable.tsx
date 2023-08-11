import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useState } from "react";
import { Column } from "../../../app/models";
import { formatLength } from "../../../app/stringFormatter";
import EditTestCaseButton from "./EditTestCaseButton";
import DeleteTestCaseButton from "./DeleteTestCaseButton";
import { TestCaseData } from "../problems/problemsAdminApiSlice";
  
const columns: Column[] = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'input', label: 'Input', minWidth: 100 },
    { id: 'output', label: 'Output', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 }

  ];

interface TestCaseTableProps {
    data: TestCaseData[];
} 
export default function TestCaseTable({data}: TestCaseTableProps) {
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
    <Paper sx={{ width: "100%", overflow:"hidden"}}>
      <TableContainer sx={{height:"410px"}}>
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
                      <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
                        {row.id}
                      </TableCell>
                      <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
                        {formatLength(row.input)}
                      </TableCell>
                      <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
                        {formatLength(row.output)}
                      </TableCell>
                      <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
                          <EditTestCaseButton testCase={row} />
                      </TableCell>
                      <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
                          <DeleteTestCaseButton testCase={row} />
                      </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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