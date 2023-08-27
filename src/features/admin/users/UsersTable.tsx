import { Column } from "../../../app/models";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";
import { GetUsersData } from "./usersApiSlice";

const columns : Column[] = [
    {id:"1", label: "Username"},
    {id:"2", label: "Email"},
    {id:"3", label: "Status"},
    {id:"4", label: "Registration date"},
    {id:"5", label: "Change status"}
];

interface UsersTableProps {
    data: GetUsersData[];
}

function UsersTable({data}: UsersTableProps) {
    return (
        <CodelyTable columns={columns}
            data={data} 
            tableType={TableType.AdminUsers} 
            sx={{}} 
            rowsPerPageOptions={[10, 25, 100]} 
            initalNumberOfRows={10} />
    );
}

export default UsersTable;