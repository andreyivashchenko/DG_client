import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{height: '100vh', color: 'white', padding: '20px'}}>
            client layout
            <div style={{display: 'flex', gap: '0 15px', paddingBottom: '30px'}}>
                <Link to={'/lol'}>client page</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
