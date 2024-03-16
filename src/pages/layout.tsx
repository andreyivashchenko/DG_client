import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div style={{ height: '100vh', color: 'white', padding: '20px' }}>
			layout
			<br />
			<Link to={'/main'}>main page</Link>
			<br />
			<Link to={'/driver'}>driver page</Link>
			<br />
			<Link to={'/client'}>client page</Link>
			<Outlet />
		</div>
	)
}

export default Layout
