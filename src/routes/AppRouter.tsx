import { Route, Routes } from 'react-router-dom'
import Layout from '../pages/layout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />} />
		</Routes>
	)
}

export default AppRouter
