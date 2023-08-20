import { Chip, SxProps, Theme } from '@mui/material';

interface PillProps{
    sx: SxProps<Theme>;
    text: string;
}

const Pill = ({ sx, text }:PillProps) => {

  return (
    <Chip label={text} sx={sx}/>
  );
};

export default Pill;