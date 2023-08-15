import { formatLength } from "../../../app/stringFormatter";
import EditExampleButton from "./EditExampleButton";
import DeleteExampleButton from "./DeleteExampleButton";
import { ExampleData } from "../problems/problemsApiSlice";
import { TableCell, TableRow } from "@mui/material";
  
interface ExampleRowProps {
    row: ExampleData;
} 
function ExampleRow({row}: ExampleRowProps) {
  return (
    <TableRow hover tabIndex={-1}>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            {row.id}
        </TableCell>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            {formatLength(row.input)}
        </TableCell>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            {formatLength(row.output)}
        </TableCell>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            {formatLength(row.explanation)}
        </TableCell>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            <EditExampleButton example={row}  />
        </TableCell>
        <TableCell style={{ maxWidth:100, overflow: "hidden"}}>
            <DeleteExampleButton example={row}/>
        </TableCell>
    </TableRow>
  );
}

export default ExampleRow;