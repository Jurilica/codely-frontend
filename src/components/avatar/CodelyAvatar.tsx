import { Avatar } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import authSlice from "../../features/shared/auth/authSlice";

function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
}

interface CodelyAvatarProps {
    username: string | null;
}

const CodelyAvatar = ({username}: CodelyAvatarProps) => {

    return (
        <>
            {username && <Avatar {...stringAvatar(username)}/>}
        </>
    );
};

export default CodelyAvatar;