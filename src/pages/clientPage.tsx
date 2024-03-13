import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { logout } from '../store/slices/AuthSlice'

const ClientPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const handleLogout = () => {
		dispatch(logout())
		navigate('/')
	}
	return (
		<div>
			Client Page
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}
export default ClientPage
