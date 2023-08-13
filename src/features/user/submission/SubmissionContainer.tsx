import SubmissionsTable from "./SubmissionsTable";
import { useGetSubmissionsQuery } from "./submissionApiSlice";

interface SubmissionsContainerProps {
    problemId: number;
}

function SubmissionsContainer({problemId}:SubmissionsContainerProps ){
    const {data} = useGetSubmissionsQuery(Number(problemId),{
        pollingInterval: 2_500,
      });

    return (
        <>
            <SubmissionsTable data={data?.submissions ?? []} />
        </>
    );
};

export default SubmissionsContainer;