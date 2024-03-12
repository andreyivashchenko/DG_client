import { useLoginMutation } from '../api/AuthServise'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setUser } from '../store/slices/AuthSlice'

const Layout = () => {
	const [login] = useLoginMutation()
	const dispatch = useAppDispatch()
	const handleLogin = async () => {
		try {
			const resp = await login({
				name: 'chmonya',
				pass: '123',
				email: 'chmonya@mail.ru',
			}).unwrap()
			if (resp) dispatch(setUser(resp))
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

export default Layout
