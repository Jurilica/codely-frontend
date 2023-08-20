import { Column } from "../../../app/models";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";
import { GetLeaderboardData } from "./leaderboardApiSlice";

const columns : Column[] = [
    {id:"1", label: "Position"},
    {id:"2", label: "Avatar"},
    {id:"3", label: "Username"},
    {id:"4", label: "Easy"},
    {id:"5", label: "Medium"},
    {id:"6", label: "Hard"},
    {id:"7", label: "Points"},
];

interface LeaderboardTableData {
    data: GetLeaderboardData[];
}

function LeaderboardTable({data}:LeaderboardTableData) {
    return (
        <CodelyTable 
            columns={columns}
            data={data} 
            tableType={TableType.UserLeaderboard} 
            sx={{}} 
            rowsPerPageOptions={[10, 25, 100]} 
            initalNumberOfRows={10} />
    );
}

export default LeaderboardTable;