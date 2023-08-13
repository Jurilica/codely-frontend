import { Column } from "../../../app/models";
import { ExampleData } from "../problems/problemsApiSlice";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";
  
const columns: Column[] = [
    { id: 'id', label: 'Id', maxWidth: 50},
    { id: 'input', label: 'Input', maxWidth: 100 },
    { id: 'output', label: 'Output', maxWidth: 100 },
    { id: 'explanation', label: 'Explanation', maxWidth: 100 },
    { id: 'edit', label: 'Edit', maxWidth: 100 },
    { id: 'delete', label: 'Delete', maxWidth: 100 }
  ];

interface ExampleTableProps {
    data: ExampleData[];
} 
function ExampleTable({data}: ExampleTableProps) {
    return (
      <CodelyTable columns={columns} 
        data={data} 
        tableType={TableType.AdminExample} 
        sx={{height:"410px"}}
        rowsPerPageOptions={[5, 10]} 
        initalNumberOfRows={5} />
    );
}

export default ExampleTable;