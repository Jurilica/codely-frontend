import { Role, getUser } from "./tokenHelpers";

export const getInitialRoute = (): string => {
    var user = getUser();

    if(user.userRole === Role.User) {
        return "/problems";
    } 

    return "/admin/problems";
}