// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Roles } from '../../routes/privateRoutes'

export interface IUser {
	_id: string
	name: string
	email: string
	role: Roles
}

export interface AuthResponse {
	user: IUser
	message: string
	success: boolean
}

interface AuthState {
	user: IUser | null
	isAuthenticated: boolean
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthResponse>) => {
			state.user = action.payload.user
			state.isAuthenticated = action.payload.success
		},
		logout: state => {
			state.user = null
			state.isAuthenticated = false
		},
	},
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
