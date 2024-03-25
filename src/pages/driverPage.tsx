import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLazyGetRouteQuery} from '../api/RouteService';
import YMapLayout from '../components/ymapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {logout} from '../store/slices/AuthSlice';
import DriverRoute from '../components/DriverRoute';
import {LngLat, YMapDefaultMarker} from '../lib/ymaps';
import type {Route} from '../types/Map';
import {navigation} from '../utils/navigation';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            Driver Page
            <div style={{width: '500px', height: '500px'}}>
                <YMapLayout>
                    {route && <DriverRoute route={route} driverCoordinates={driverCoordinates} />}
                    <YMapDefaultMarker coordinates={[37.9, 55.85]} />
                </YMapLayout>
            </div>
            {route && <button onClick={() => navigation(route, setDriverCoordinates)}>Start route</button>}
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default DriverPage;
