import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../api/AuthService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { setUser } from '../../store/slices/AuthSlice'
import { UserRegister } from '../../types/User'
import classes from './registerPage.module.scss'

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
		setError,
	} = useForm<UserRegister>()
	const onSubmit: SubmitHandler<UserRegister> = data => {
		handleLogin(data)
	}
	const handleLogin = async (user: UserRegister) => {
		try {
			const res = await registerUser(user).unwrap()
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
		<div className={classes.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<div className={classes.form__titleBlock}>
					<h1 className={classes.form__title}> Register</h1>
					<Link to={'/login'} className={classes.form__link}>
						Sign in
					</Link>
				</div>

				<input
					type='text'
					{...register('name', { required: true })}
					placeholder='User name'
					className={classes.form__input}
				/>
				{errors.name && (
					<div className={classes.error}>Это поле является обязательным</div>
				)}
				<input
					type='email'
					{...register('email', { required: true })}
					placeholder='Email'
					className={classes.form__input}
				/>
				{errors.email && (
					<div className={classes.error}>Это поле является обязательным</div>
				)}
				<input
					type='password'
					{...register('pass', { required: true })}
					placeholder='Password'
					className={classes.form__input}
				/>
				{errors.pass && (
					<div className={classes.error}>Это поле является обязательным</div>
				)}
				<select
					className={classes.form__input}
					{...register('role')}
					defaultValue={'driver'}
				>
					<option className={classes.form__selectOpt} value='admin'>
						admin
					</option>
					<option className={classes.form__selectOpt} value='client'>
						client
					</option>
					<option className={classes.form__selectOpt} value='driver'>
						driver
					</option>
				</select>
				{errors.role && (
					<div className={classes.error}>Это поле является обязательным</div>
				)}

				<button type='submit' className={classes.form__subButton}>
					Sign up
				</button>
				{errors.root && (
					<div className={classes.error__root}>
						{errors.root.serverError.message}
					</div>
				)}
			</form>
		</div>
	)
}

export default RegisterPage
