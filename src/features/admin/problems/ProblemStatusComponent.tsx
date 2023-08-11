import { Stack, Typography } from "@mui/material";
import { ProblemStatus } from './problemsApiSlice';
import Dot from "../../../components/generic/Dot";

interface ProblemStatusComponentProps{
    status: ProblemStatus;
    fontWeight?: string;
    fontSize?: string;
    dotSize?: number;
}
function ProblemStatusComponent({status, fontWeight='normal', fontSize='1rem', dotSize = 8}:ProblemStatusComponentProps){
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={status === ProblemStatus.Published ? "green" : "red"} size={dotSize}/>
            <Typography sx={{fontWeight:{fontWeight}, fontSize:{fontSize}}}>{status}</Typography>
        </Stack>
    );
};

export default ProblemStatusComponent;
