import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div>
			layout
			<Outlet />
			<br />
			<Link to={'/main'}>main page</Link>
			<br />
			<Link to={'/driver'}>driver page</Link>
			<br />
			<Link to={'/client'}>client page</Link>
		</div>
	)
}

export default Layout
