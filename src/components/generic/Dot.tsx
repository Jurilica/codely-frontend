import { Box } from '@mui/material';

interface DotProps{
    color: string;
    size: number;
}

const Dot = ({ color, size }:DotProps) => {

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: color
      }}
    />
  );
};

export default Dot;