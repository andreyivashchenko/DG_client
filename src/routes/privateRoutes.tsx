import { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'

export interface PrivateRoute {
	path: string
	element: ReactNode
	roles: Roles[]
}

export type Roles = 'admin' | 'driver' | 'client'

export interface PrivateRoutesProps {
	children: ReactNode
}

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
