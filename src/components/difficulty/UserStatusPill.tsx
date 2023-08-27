import { SxProps, Theme } from '@mui/material';
import Pill from '../generic/Pill';
import { UserStatus } from '../../app/enums';

interface UserStatusPillProps{
    status: UserStatus;
}

const activeStyle:SxProps<Theme> = {
    backgroundColor: "#E4F8DD",
    color:"#229A16"
};

const bannedStlye:SxProps<Theme> = {
    backgroundColor: "#F7DBDB",
    color:"#C13E50"
};

const UserStatusPill = ({ status }:UserStatusPillProps) => {
    let style:SxProps<Theme> = {};

    switch(status) {
        case UserStatus.Active: 
            style = activeStyle;
            break;
        case UserStatus.Banned:
            style = bannedStlye;
            break;
    };

  return (
    <Pill text={status} sx={style}/>
  );
};

export default UserStatusPill;