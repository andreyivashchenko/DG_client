// authApi.ts
import { AuthResponse } from '../store/slices/AuthSlice'
import { ApiService } from './ApiService'

interface Credentials {
	name: string
	pass: string
	email: string
}

export const authApi = ApiService.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<AuthResponse, Credentials>({
			query: credentials => ({
				url: '/auth/login',
				method: 'POST',
				body: credentials,
			}),

			transformErrorResponse: error => {
				return { error, message: 'err' }
			},
		}),
	}),
})

export const { useLoginMutation } = authApi
