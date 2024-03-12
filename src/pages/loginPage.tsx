import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../api/AuthService'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setUser } from '../store/slices/AuthSlice'

const LoginPage = () => {
	const [login] = useLoginMutation()
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const fromPage = location.state?.from?.pathname || '/'
	const handleLogin = async () => {
		try {
			const res = await login({
				name: 'chmonya',
				pass: '12345',
				email: 'chmonya@mail.ru',
			}).unwrap()
			if (res) dispatch(setUser(res))
			navigate(fromPage, { replace: true })
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<div>
			<button onClick={handleLogin}>login</button>
		</div>
	)
}

export default LoginPage
