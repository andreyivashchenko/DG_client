import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLazyGetRouteQuery} from '../api/RouteService';
import DriverRoute from '../components/DriverRoute';
import MapLayout from '../components/mapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {LngLat} from '../lib/ymaps';
import {logout} from '../store/slices/AuthSlice';
import type {Route} from '../types/Map';
import {useAppSelector} from '../hooks/useAppSelector';
import {IDriver} from '../types/Driver';
import {mockDrive} from '../utils/mockNavigation';
import {throttle} from 'lodash';
import {useLazyGetOptimalObjectQuery} from '../api/ObjectGroupService';
import {IObject} from '../types/Object';
import MapObjectMarker from '../components/mapObjectMarker';
import MapDriverMarker from '../components/mapDriverMarker';

const DriverPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const driverData = useAppSelector((state) => state.auth.roleData) as IDriver;

    const [isDriving, setIsDriving] = useState(false);
    const [route, setRoute] = useState<Route | null>(null);
    const [optimalObject, setOptimalObject] = useState<IObject | undefined>(undefined);
    const [driverCoordinates, setDriverCoordinates] = useState<LngLat>(driverData.coordinates);

    const [getRoute] = useLazyGetRouteQuery();
    const [getOptimalObject] = useLazyGetOptimalObjectQuery();

    useEffect(() => {
        switch (driverData.status) {
            case 'going_to_base':
                const fetchOptimalObject = async () => {
                    if (driverData.object_group_id) {
                        const data = await getOptimalObject(driverData.object_group_id).unwrap();
                        setOptimalObject(data?.data);
                    }
                };

                fetchOptimalObject();
        }
    }, [driverData.status]);

    useEffect(() => {
        const throttledFetch = throttle((coordinates: LngLat) => {
            fetch('http://localhost:4000/driver', {
                method: 'POST',
                body: JSON.stringify({driver_id: driverData.driver_id, coordinates}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, 1000);

        const navigatorWatchId = navigator.geolocation.watchPosition((position) => {
            const coordinates: LngLat = [position.coords.longitude, position.coords.latitude];
            setDriverCoordinates(coordinates);

            throttledFetch(coordinates);
        });

        return () => navigator.geolocation.clearWatch(navigatorWatchId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buildRoute = useCallback(async (pointA: LngLat, pointB: LngLat) => {
        const routeData = (
            await getRoute({
                waypoints: [pointA, pointB]
            }).unwrap()
        ).route as Route;

        setRoute(routeData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            Driver Page
            <div>Status {driverData.status}</div>
            <div style={{width: '500px', height: '500px'}}>
                <MapLayout>
                    <MapDriverMarker coordinates={driverCoordinates} />
                    {route && <DriverRoute route={route} driverCoordinates={driverCoordinates} />}
                    {optimalObject && <MapObjectMarker coordinates={optimalObject.coordinates} isOptimal />}
                </MapLayout>
            </div>
            {driverData.status === 'going_to_base' &&
                optimalObject &&
                (!route ? (
                    <button onClick={() => buildRoute(driverData.coordinates, optimalObject.coordinates)}>
                        Построить маршрут до базы
                    </button>
                ) : (
                    route && (
                        <button
                            onClick={() => {
                                mockDrive(route.points);
                                setIsDriving(true);
                            }}
                            disabled={isDriving}
                        >
                            Поехали!
                        </button>
                    )
                ))}
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default DriverPage;
