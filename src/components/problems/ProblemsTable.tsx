import { Stack, Typography, Grid, Card, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link, Button } from "@mui/material";
import ProblemsPage from "../../features/problems/ProblemsPage";
import { GetProblemsResponse, ProblemStatus } from "../../app/admin-api-slice";
import Dot from "../generic/Dot";
import { Link as RouterLink } from 'react-router-dom';

interface TabelHeaders {
    id: string;
    align: "left"|"right"|"center";
    disablePadding: boolean;
    label: string;
}

const tabelHeaders : TabelHeaders[] = [
    {
        id:"1",
        align:"left",
        disablePadding: false,
        label: "Id"
    },
    {
        id:"2",
        align:"left",
        disablePadding: false,
        label: "Title"
    },
    {
        id:"3",
        align:"left",
        disablePadding: false,
        label: "Status"
    },
    {
        id:"4",
        align:"left",
        disablePadding: false,
        label: "Delete"
    }
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
    data: GetProblemsResponse;
    handleDelete: (id:number) => void;
}

function ProblemsTable({data, handleDelete}:ProblemsTableData) {
    return (
        <Box>
            <TableContainer
                sx={{
                width: '100%',
                overflowX: 'auto',
                position: 'relative',
                display: 'block',
                maxWidth: '100%',
                '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-of-type': {
                            pr: 3
                        }
                    }}
                >
                <TableHead>
                    <TableRow>
                        {tabelHeaders.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                        >
                            {headCell.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {data?.problems.map((row, index) => 
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            tabIndex={-1}
                            key={row.id}
                            >
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
                                <Button onClick={() => {handleDelete(row.id)}}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProblemsTable;