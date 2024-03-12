import { useAppDispatch } from '../hooks/useAppDispatch'
import { logout } from '../store/slices/AuthSlice'

const DriverPage = () => {
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}
	return (
		<div>
			Driver Page
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default DriverPage
