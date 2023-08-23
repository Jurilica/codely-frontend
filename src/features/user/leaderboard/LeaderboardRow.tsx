import { TableCell, TableRow } from "@mui/material";
import { GetLeaderboardData } from "./leaderboardApiSlice";
import { useAppSelector } from "../../../app/hooks";
import CodelyAvatar from "../../../components/avatar/CodelyAvatar";

interface LeaderboardRowProps {
    row: GetLeaderboardData;
}

function LeaderboardRow({row}:LeaderboardRowProps) {
    const username = useAppSelector(state => state.auth.username);
    const backgroundColor = username === row.username ? "#F5F5F5" : "white";

    return (
        <TableRow hover tabIndex={-1} key={row.username} sx={{backgroundColor:{backgroundColor}}}>
             <TableCell align="left">
                {row.position}
            </TableCell>
            <TableCell align="left">
                <CodelyAvatar username={row.username}/>
            </TableCell>
            <TableCell align="left">
                {row.username}
            </TableCell>
            <TableCell align="left">
                {row.easyProblemsSolved}
            </TableCell>
            <TableCell align="left">
                {row.mediumProblemsSolved}
            </TableCell>
            <TableCell align="left">
                {row.hardProblemsSolved}
            </TableCell>
            <TableCell align="left">
                {row.points}
            </TableCell>
        </TableRow>
    );
}

export default LeaderboardRow;