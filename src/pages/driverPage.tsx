import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {logout} from '../store/slices/AuthSlice';
import {useEffect, useState} from 'react';
import {useLazyGetRouteQuery} from '../api/RouteService';
import YMapLayout from '../components/ymapLayout';
import {LngLat} from '../lib/ymaps';
import type {Route} from '../types/Map';
import DriverRoute from '../components/DriverRoute';

const driving = async (route: Route, updateDriverCoordinates: (newCoordinates: LngLat) => void) => {
    const routeCoordinates = route.points;

    for (let i = 0; i < routeCoordinates.length; i++) {
        updateDriverCoordinates(routeCoordinates[i]);
        console.log(123);
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
};

const DriverPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [getRoute] = useLazyGetRouteQuery(undefined);

    const [route, setRoute] = useState<Route | null>(null);
    const [driverCoordinates, setDriverCoordinates] = useState<LngLat | undefined>(undefined);

    useEffect(() => {
        const fetchRoute = async () => {
            const routeData = (
                await getRoute({
                    waypoints: [
                        [37.9, 55.85],
                        [37.32, 55.57]
                    ]
                }).unwrap()
            ).route as Route;

            setRoute(routeData);
        };

        fetchRoute();
    }, []);
    return (
        <div>
            Driver Page
            <div style={{width: '500px', height: '500px'}}>
                <YMapLayout>{route && <DriverRoute route={route} driverCoordinates={driverCoordinates} />}</YMapLayout>
            </div>
            {route && <button onClick={() => driving(route, setDriverCoordinates)}>Start route</button>}
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default DriverPage;
