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
}

export interface IAuthResponse{
    token: string;
    roles: string [] | string;
}