export interface IRegAccount {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    roles: string [] | string;
}

export interface IAuthAccount {
    username: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface IAuthResponse{
    token: string;
}