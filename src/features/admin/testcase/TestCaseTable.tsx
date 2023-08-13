import { Column } from "../../../app/models";
import { TestCaseData } from "../problems/problemsApiSlice";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";
  
const columns: Column[] = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'input', label: 'Input', minWidth: 100 },
    { id: 'output', label: 'Output', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 }

  ];

interface TestCaseTableProps {
    data: TestCaseData[];
} 

function TestCaseTable({data}: TestCaseTableProps) {
  return (
    <CodelyTable columns={columns} 
      data={data} 
      tableType={TableType.AdminTestCase} 
      sx={{height:"410px"}}
      rowsPerPageOptions={[5, 10, 25]} 
      initalNumberOfRows={5} />
  );
}

export default TestCaseTable;