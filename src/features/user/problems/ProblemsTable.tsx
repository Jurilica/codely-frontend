import { Column } from "../../../app/models";
import { GetProblemsData } from "./problemsApiSlice";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";

const columns : Column[] = [
    {id:"1", label: "Title"},
    {id:"2", label: "Status"}
];

interface ProblemsTableData {
    data: GetProblemsData[];
}

function ProblemsTable({data}:ProblemsTableData) {
    return (
        <CodelyTable columns={columns}
            data={data} 
            tableType={TableType.UserProblem} 
            sx={{ height: '760px'}} 
            rowsPerPageOptions={[10, 25, 100]} 
            initalNumberOfRows={10} />
    );
}

export default ProblemsTable;