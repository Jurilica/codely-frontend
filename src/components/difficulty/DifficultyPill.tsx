import { SxProps, Theme } from '@mui/material';
import { ProblemDifficulty } from '../../app/enums';
import Pill from '../generic/Pill';

interface DifficultyPillProps{
    difficulty: ProblemDifficulty;
}

const easyDifficulty:SxProps<Theme> = {
    backgroundColor: "#E4F8DD",
    color:"#229A16"
};

const mediumDifficulty:SxProps<Theme> = {
    backgroundColor: "#FFF6DA",
    color:"#FFC107"
};

const hardDificulty: SxProps<Theme> = {
    backgroundColor: "#F7DBDB",
    color:"#C13E50"
};
const DifficultyPill = ({ difficulty }:DifficultyPillProps) => {
    let style:SxProps<Theme> = {};

    switch(difficulty) {
        case ProblemDifficulty.Easy: 
            style = easyDifficulty;
            break;
        case ProblemDifficulty.Medium:
            style = mediumDifficulty;
            break;
        case ProblemDifficulty.Hard:
            style = hardDificulty;
            break;
    };

  return (
   <Pill text={difficulty} sx={style}/>
  );
};

export default DifficultyPill;