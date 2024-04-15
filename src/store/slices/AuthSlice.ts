// authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types/User';
import {IDriver} from '../../types/Driver';
import {IClient} from '../../types/Client';

export interface AuthResponse {
    user: IUser;
    message: string;
    success: boolean;
}

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    roleData: IDriver | IClient | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    roleData: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        },
        setRoleData: (state, action: PayloadAction<Omit<AuthState, 'user' | 'isAuthenticated'>>) => {
            state.roleData = action.payload.roleData;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.roleData = null;
        }
    }
});

export const {setUser, setRoleData, logout} = authSlice.actions;
export default authSlice.reducer;
