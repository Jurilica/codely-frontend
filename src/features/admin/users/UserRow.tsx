import { TableCell,TableRow } from "@mui/material";
import { GetUsersData } from "./usersApiSlice";
import UserStatusPill from "../../../components/difficulty/UserStatusPill";
import ChangeUserStatusButton from "./BanUserButton";

interface UserRowProps {
    row: GetUsersData;
}

function UserRow({row}:UserRowProps) {
    return (
        <TableRow hover tabIndex={-1}>
            <TableCell align="left">
                {row.username}
            </TableCell>
            <TableCell align="left">
                {row.email}
            </TableCell>
            <TableCell align="left">
                <UserStatusPill status={row.userStatus} />
            </TableCell>
            <TableCell align="left">
                {new Date(row.registrationDate).toLocaleString()}
            </TableCell>
            <TableCell align="left">
                <ChangeUserStatusButton username={row.username} userStatus={row.userStatus} />
            </TableCell>
        </TableRow>
    );
}

export default UserRow;