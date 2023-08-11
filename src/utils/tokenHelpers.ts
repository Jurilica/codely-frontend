import { getToken } from "./storageHelpers";

export enum Role {
    Admin = "Admin",
    User = "User"
};

export class IUser {
    userId!: number;
    username!: string;
    userRole!: Role;
}

export const getUser = (): IUser => {
    const tokenJwt = getToken();

    // object.assign will work with flat models, e.g. if IUser has some nested object inside it won't be able to deserialize to IUser
    // if we need support for nested models inside IUser we will need to change this method
    const user: IUser = Object.assign(new IUser(), parseJwt(tokenJwt));

    return user;
};

function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}