import { CreateProblemRequest, useAddProblemMutation} from './problem-api-slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProblemForm, { ProblemData } from '../../components/problems/ProblemForm';

function CreateProblemPage() {
    const [addProblem, result] = useAddProblemMutation();
    const navigate = useNavigate();

    function handleSubmit(values: ProblemData) {
        var createProblemRequest: CreateProblemRequest = {
            ...values
        };

        addProblem(createProblemRequest);
    };

    useEffect(() => {
        if(result.isSuccess) {
            navigate(`/problems/${result.data.problemId}`);
        }
    },[result.isSuccess]);

    return (
        <ProblemForm handleSubmit={handleSubmit} initialValues={{title:"", description:""}} />
    );
}

export default CreateProblemPage;