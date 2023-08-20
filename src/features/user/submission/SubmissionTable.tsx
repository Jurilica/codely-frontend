import { Column } from "../../../app/models";
import CodelyTable, { TableType } from "../../../components/table/CodelyTable";
import { useGetSubmissionsQuery } from "./submissionApiSlice";

interface SubmissionsTableProps {
    problemId: number;
}

const columns : Column[] = [
    {id:"1", label: "Status"},
    {id:"2", label: "Language"},
    {id:"3", label: "Test cases"},
    {id:"4", label: "Submission date"}
];

function SubmissionsTable({problemId}:SubmissionsTableProps ){
    const {data} = useGetSubmissionsQuery(Number(problemId),{
        pollingInterval: 2_500,
      });

    return (
        <CodelyTable 
            data={data?.submissions ?? []}
            columns={columns}
            tableType={TableType.UserSubmission}
            sx={{maxHeight:"600px"}} 
            rowsPerPageOptions={[10,25,50]} initalNumberOfRows={10} />
    );
};

export default SubmissionsTable;