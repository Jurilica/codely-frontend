import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useState } from "react";
import { TestCaseData } from "../../app/admin-api-slice";
import { Column } from "../../app/models";
  
const columns: Column[] = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'input', label: 'Input', minWidth: 100 },
    { id: 'output', label: 'Output', minWidth: 100 }
  ];

interface TestCaseTableProps {
    data: TestCaseData[];
} 
export default function TestCaseTable({data}: TestCaseTableProps) {
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
      <TableContainer sx={{ height: 'max-content', maxHeight:'820px'}}>
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
                    <TableCell>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.input}
                    </TableCell>
                    <TableCell>
                      {row.output}
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