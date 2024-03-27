import {ReactNode} from 'react';

export type Roles = 'admin' | 'driver' | 'client';

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
