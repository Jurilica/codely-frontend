import { TableRow, TableCell } from "@mui/material";
import { formatLength } from "../../../app/stringFormatter";
import EditTestCaseButton from "./EditTestCaseButton";
import DeleteTestCaseButton from "./DeleteTestCaseButton";
import { TestCaseData } from "../problems/problemsApiSlice";
  
interface TestCaseRowProps {
    row: TestCaseData;
} 
function TestCaseRow({row}: TestCaseRowProps) {
  return (
    <TableRow hover tabIndex={-1}>
        <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
            {row.id}
        </TableCell>
        <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
            {formatLength(row.input)}
        </TableCell>
        <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
            {formatLength(row.output)}
        </TableCell>
        <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
            <EditTestCaseButton testCase={row} />
        </TableCell>
        <TableCell  style={{ maxWidth:100, overflow: "hidden"}}>
            <DeleteTestCaseButton testCase={row} />
        </TableCell>
    </TableRow>         
  );
}

export default TestCaseRow;