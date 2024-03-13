import { Link, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import ClientPage from '../pages/clientPage'
import DriverPage from '../pages/driverPage'
import Layout from '../pages/layout'
import LoginPage from '../pages/loginPage'
import MainPage from '../pages/mainPage'
import PrivateRoutes, { PrivateRoute, Roles } from './privateRoutes'

const AppRouter = () => {
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
			roles: ['admin'],
		},
		{
			path: '/driver',
			element: <DriverPage />,
			roles: ['driver'],
		},
		{
			path: '/client',
			element: <ClientPage />,
			roles: ['client'],
		},
	]

	const { user } = useAppSelector(store => store.auth)
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{publicRoutes.map(route => (
					<Route path={route.path} element={route.element} />
				))}
				{privateRoutes.map(route =>
					route.roles.includes(user?.role as Roles) ? (
						<Route
							path={route.path}
							element={<PrivateRoutes>{route.element}</PrivateRoutes>}
						/>
					) : (
						<Route
							path={route.path}
							element={
								<div>
									У вас нет доступа к этой странице!
									<Link to={'/'}>Вернуться на главную</Link>
								</div>
							}
						/>
					)
				)}
			</Route>
		</Routes>
	)
}

export default AppRouter
