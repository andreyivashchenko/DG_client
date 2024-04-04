import {ReactNode} from 'react';

export type Roles = 'admin' | 'driver' | 'client';

export interface RoutePathElement {
    path: string;
    element: JSX.Element;
}

export interface PrivateRoutesProps {
    children: ReactNode;
}
export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: Roles;
}
export interface UserCredentials extends Omit<IUser, '_id' | 'role'> {
    pass: string;
}
export interface UserRegister extends UserCredentials {
    role: Roles;
}
export interface IClientRegister extends Omit<UserRegister, 'name'> {
    nameOrg: string;
}
export interface IDriverRegister extends IClientRegister {
    fullName: string;
    nameOrg: string;
    client_id: number;
}
export interface IAdminRegister extends UserRegister {}
