import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { PrivateRoutesProps } from '../types/User'

const PrivateRoutes: FC<PrivateRoutesProps> = ({ children }) => {
	const location = useLocation()
	const { isAuthenticated } = useAppSelector(store => store.auth)

	return isAuthenticated ? (
		<>{children}</>
	) : (
		<Navigate to={'/login'} state={{ from: location }} />
	)
}

export default PrivateRoutes
