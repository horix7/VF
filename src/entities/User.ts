export enum UserRoles {
    Standard,
    Upgraded,
    Premium,
    Writer,
    Store_owner,
    Admin
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    pwdHash: string;
    role: UserRoles;
}

export class User implements IUser {

    public id: string;
    public name: string;
    public email: string;
    public role: UserRoles;
    public pwdHash: string;


    constructor(
        nameOrUser?: string | IUser,
        email?: string,
        role?: UserRoles,
        pwdHash?: string,
        id?: string,
    ) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            this.name = nameOrUser || '';
            this.email = email || '';
            this.role = role || UserRoles.Standard;
            this.pwdHash = pwdHash || '';
            this.id = id || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.role = UserRoles.Standard;
            this.pwdHash = nameOrUser.pwdHash;
            this.id = nameOrUser.id;
        }
    }
}
