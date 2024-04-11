// authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types/User';

export interface AuthResponse {
    user: IUser;
    message: string;
    success: boolean;
}

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    roleId: number | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
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
        setRoleId: (state, action: PayloadAction<Omit<AuthState, 'user' | 'isAuthenticated'>>) => {
            state.roleId = action.payload.roleId;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.roleId = null;
        }
    }
});

export const {setUser, setRoleId, logout} = authSlice.actions;
export default authSlice.reducer;
