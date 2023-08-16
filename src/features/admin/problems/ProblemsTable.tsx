import { GetProblemsData } from './problemsApiSlice';
import { Column } from "../../../app/models";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";

const columns : Column[] = [
    {id:"1", label: "Id"},
    {id:"2", label: "Title"},
    {id:"3", label: "Status"},
    {id:"4", label: "Difficulty"},
    {id:"5", label: "Edit"},
    {id:"6", label: "Delete"},
    {id:"7", label: "Change status"}
];

interface ProblemsTableData {
    data: GetProblemsData[];
}

function ProblemsTable({data}:ProblemsTableData) {
    return (
        <CodelyTable columns={columns} 
            data={data} 
            tableType={TableType.AdminProblem} 
            sx={{height:"760px"}}
            rowsPerPageOptions={[10, 25, 100]} 
            initalNumberOfRows={10} />
    );
}

export default ProblemsTable;