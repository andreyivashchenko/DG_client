import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../api/AuthService'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setUser } from '../store/slices/AuthSlice'
import { UserCredentials } from '../types/User'

const LoginPage = () => {
	const [login] = useLoginMutation()
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const fromPage = location.state?.from?.pathname || '/'
	const { isAuthenticated } = useAppSelector(store => store.auth)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		clearErrors,
	} = useForm<UserCredentials>()
	const onSubmit: SubmitHandler<UserCredentials> = data => {
		handleLogin(data)
	}
	const handleLogin = async (user: UserCredentials) => {
		clearErrors('root')
		try {
			const res = await login(user).unwrap()
			if (res) dispatch(setUser(res))
			navigate(fromPage, { replace: true })
		} catch (error: any) {
			if (error) {
				setError('root.serverError', {
					type: error.error.status,
					message: error.error.data.message,
				})
			}
		}
	}

	if (isAuthenticated) return <Navigate to={'/'} />
	return (
		<div>
			<span>Страница авторизации</span>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					{...register('name', { required: true })}
					placeholder='Имя пользователя'
				/>
				{errors.name && <div>Это поле является обязательным</div>}
				<input
					type='email'
					{...register('email', { required: true })}
					placeholder='Почта'
				/>
				{errors.email && <div>Это поле является обязательным</div>}
				<input
					type='password'
					{...register('pass', { required: true })}
					placeholder='Пароль'
				/>
				{errors.pass && <div>Это поле является обязательным</div>}
				<button type='submit'>sign in</button>
				{errors.root && (
					<div style={{ color: 'red' }}>{errors.root.serverError.message}</div>
				)}
			</form>
		</div>
	)
}

export default LoginPage
