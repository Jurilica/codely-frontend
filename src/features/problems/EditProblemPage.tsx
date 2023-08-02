import { useGetProblemQuery } from './problem-api-slice';
import { useParams } from 'react-router';

function EditProblemPage() {
    let {id} = useParams();
    const {data,isLoading, isSuccess } = useGetProblemQuery(id!);

    return (
        <>
            {isLoading && <div>Loading</div>}
            {isSuccess && <div> {data.problem.title} </div>}
        </>
    );
}

export default EditProblemPage;