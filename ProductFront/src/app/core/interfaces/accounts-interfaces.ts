export interface IRegAccount {
    id?: number;
    name: string;
}

export interface IAuthAccount {
    username: string;
    password: string;
}

export interface IAuthResponse{
    token: string;
}