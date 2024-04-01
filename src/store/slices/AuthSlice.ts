// authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, Roles} from '../../types/User';

export interface AuthResponse {
    user: IUser;
    message: string;
    success: boolean;
}

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    role: Roles | null;
    roleId: number | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    role: null,
    roleId: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        },
        setRole: (state, action: PayloadAction<Omit<AuthState, 'user' | 'isAuthenticated'>>) => {
            state.role = action.payload.role;
            state.roleId = action.payload.roleId;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null;
            state.roleId = null;
        }
    }
});

export const {setUser, setRole, logout} = authSlice.actions;
export default authSlice.reducer;
