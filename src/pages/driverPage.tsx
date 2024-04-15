import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLazyGetRouteQuery} from '../api/RouteService';
import DriverRoute from '../components/DriverRoute';
import MapLayout from '../components/mapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {LngLat} from '../lib/ymaps';
import {logout} from '../store/slices/AuthSlice';
import type {Route} from '../types/Map';
import {navigation} from '../utils/navigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {IDriver} from '../types/Driver';

const DriverPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const driverData = useAppSelector((state) => state.auth.roleData) as IDriver;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [getRoute] = useLazyGetRouteQuery(undefined);
    const [route, setRoute] = useState<Route | null>(null);
    const [driverCoordinates, setDriverCoordinates] = useState<LngLat | undefined>(driverData.coordinates);

    useEffect(() => {
        const fetchRoute = async () => {
            const routeData = (
                await getRoute({
                    waypoints: [driverData.coordinates, [37.32, 55.57]]
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
            <div>Status {driverData.status}</div>
            <div style={{width: '500px', height: '500px'}}>
                <MapLayout>{route && <DriverRoute route={route} driverCoordinates={driverCoordinates} />}</MapLayout>
            </div>
            {route && (
                <button onClick={() => navigation(route, setDriverCoordinates, driverData.driver_id)}>
                    Start route
                </button>
            )}
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default DriverPage;
