import { Box, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { ProblemStatus, useGetProblemsQuery } from "./problem-api-slice";
import Loader from "../../components/loader/Loader";
import Dot from "../../components/generic/Dot";

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

function ProblemsPage() {
    const {data, isLoading, isSuccess} = useGetProblemsQuery();

    return (
        <Grid container direction="column">
            <Loader isLoading={isLoading} />
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
                        {data?.problems.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                tabIndex={-1}
                                key={row.id}
                                >
                                <TableCell component="th" id={labelId} scope="row" align="left">
                                    <Link color="secondary" component={RouterLink} to={`/problems/${row.id}`}>
                                        {row.id}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left">
                                    <ProblemStatusComponent status={row.problemStatus}/>
                                </TableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    );
}

export default ProblemsPage;