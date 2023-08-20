import { SxProps, Theme } from '@mui/material';
import Pill from '../generic/Pill';
import { ProblemSubmissionStatus } from '../../app/enums';

interface ProblemSubmissionStatusPillProps{
    status: ProblemSubmissionStatus;
}

const solvedStyle:SxProps<Theme> = {
    backgroundColor: "#E4F8DD",
    color:"#229A16"
};

const pendingStyle:SxProps<Theme> = {
    backgroundColor: "#FFF6DA",
    color:"#FFC107"
}

const failedStlye:SxProps<Theme> = {
    backgroundColor: "#F7DBDB",
    color:"#C13E50"
};

const unsolvedStyle:SxProps<Theme> = {
    backgroundColor: "#EBEBEB",
    color:"#1E1E1E"
};

const ProblemSubmissionStatusPill = ({ status }:ProblemSubmissionStatusPillProps) => {
    let style:SxProps<Theme> = {};

    switch(status) {
        case ProblemSubmissionStatus.Succeeded: 
            style = solvedStyle;
            break;
        case ProblemSubmissionStatus.Failed:
            style = failedStlye;
            break;
        case ProblemSubmissionStatus.Pending:
            style = pendingStyle;
            break;
        default: 
            style = unsolvedStyle;
    };

  return (
    <Pill text={status} sx={style}/>
  );
};

export default ProblemSubmissionStatusPill;