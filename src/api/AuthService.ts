// authApi.ts
import { AuthResponse } from '../store/slices/AuthSlice'
import { UserCredentials, UserRegister } from '../types/User'
import { ApiService } from './ApiService'

export const authApi = ApiService.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<AuthResponse, UserCredentials>({
			query: credentials => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),

			transformErrorResponse: error => {
				return { error, message: 'err' }
			},
		}),
		register: builder.mutation<AuthResponse, UserRegister>({
			query: registerCredentials => ({
				url: '/auth/register',
				method: 'POST',
				body: registerCredentials,
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApi
