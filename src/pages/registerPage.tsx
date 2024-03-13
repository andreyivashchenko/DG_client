import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../api/AuthService'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setUser } from '../store/slices/AuthSlice'
import { UserRegister } from '../types/User'

const RegisterPage = () => {
	const [registerUser] = useRegisterMutation()
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const fromPage = location.state?.from?.pathname || '/'
	const { isAuthenticated } = useAppSelector(store => store.auth)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>()
	const onSubmit: SubmitHandler<UserRegister> = data => {
		handleLogin(data)
	}
	const handleLogin = async (user: UserRegister) => {
		try {
			const res = await registerUser(user).unwrap()
			if (res) dispatch(setUser(res))
			navigate(fromPage, { replace: true })
		} catch (error) {
			console.log(error)
		}
	}
	if (isAuthenticated) return <Navigate to={'/'} />
	return (
		<div>
			<span>Страница регистрации</span>
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
				<select {...register('role')} defaultValue={'driver'}>
					<option value='admin'>admin</option>
					<option value='client'>client</option>
					<option value='driver'>driver</option>
				</select>
				{errors.pass && <div>Это поле является обязательным</div>}

				<button type='submit'>sign up</button>
			</form>
		</div>
	)
}

export default RegisterPage
