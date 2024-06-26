import ClientPage from '../pages/clientPages/clientPage';
import DriverPage from '../pages/driverPage';
import LoginPage from '../pages/loginPage/loginPage';
import MainPage from '../pages/mainPages/mainPage';
import NewDriversPage from '../pages/mainPages/newDriversPage';
import RegisterPage from '../pages/registerPage/registerPage';
import type {RoutePathElement} from '../types/User';

export const publicRoutes: RoutePathElement[] = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];

export const adminRoutes: RoutePathElement[] = [
    {
        path: '/main',
        element: <MainPage />
    },
    {path: '/main/drivers', element: <NewDriversPage />}
];

export const driverRoutes: RoutePathElement[] = [
    {
        path: '/driver',
        element: <DriverPage />
    },
    {
        path: '/driver/test',
        element: <div>test</div>
    }
];

export const clientRoutes: RoutePathElement[] = [
    {
        path: '/client',
        element: <ClientPage />
    }
];
