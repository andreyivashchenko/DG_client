import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import ClientPage from '../pages/clientPage'
import DriverPage from '../pages/driverPage'
import Layout from '../pages/layout'
import LoginPage from '../pages/loginPage'
import MainPage from '../pages/mainPage'
import PrivateRoutes, { PrivateRoute } from './privateRoutes'

const AppRouter = () => {
	const { isAuthenticated } = useAppSelector(store => store.auth)

	const publicRoutes = [
		{
			path: '/login',
			element: <LoginPage />,
		},
	]
	const privateRoutes: PrivateRoute[] = [
		{
			path: '/main',
			element: <MainPage />,
			role: 'Admin',
		},
		{
			path: '/driver',
			element: <DriverPage />,
			role: 'Driver',
		},
		{
			path: '/client',
			element: <ClientPage />,
			role: 'Client',
		},
	]
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/login' element={<LoginPage />} />
				{privateRoutes.map(route => (
					<Route
						path={route.path}
						element={<PrivateRoutes>{route.element}</PrivateRoutes>}
					/>
				))}
			</Route>
		</Routes>
	)
}

export default AppRouter
