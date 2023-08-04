import { CreateProblemRequest, useAddProblemMutation} from '../../app/admin-api-slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProblemForm, { ProblemData } from '../../components/problems/ProblemForm';
import { toast } from 'react-toastify';

interface  CreateProblemFormProps {
    handleClose: () => void;
}

function AddProblemForm({handleClose}:CreateProblemFormProps) {
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
            toast.success("Problem added");
            handleClose();
        }
    },[result.isSuccess]);

    return (
        <ProblemForm handleSubmit={handleSubmit} initialValues={{title:"", description:""}} />
    );
}

export default AddProblemForm;