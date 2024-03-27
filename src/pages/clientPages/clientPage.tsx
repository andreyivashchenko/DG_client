import {useNavigate} from 'react-router-dom';
import YMapLayout from '../../components/ymapLayout';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {LngLat, YMapDefaultMarker, YMapListener} from '../../lib/ymaps';

import {useEffect, useState} from 'react';
import {useLazyGetMatrixQuery, useLazyGetRouteQuery} from '../../api/RouteService';
import DriverRoute from '../../components/DriverRoute';
import {logout} from '../../store/slices/AuthSlice';
import {MatrixData, Point, Route} from '../../types/Map';

const ClientPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [getMatrix] = useLazyGetMatrixQuery(undefined);
    const [getRoute] = useLazyGetRouteQuery(undefined);
    const [markers, setMarkers] = useState<LngLat[]>([]);
    const [optimal, setOptimal] = useState<LngLat | []>([]);
    const [routes, setRoute] = useState<Route[]>([]);
    const [matrixData, setMatrixData] = useState<MatrixData[]>([]);

    const handlePoint = () => {
        const fetchMatrix = async () => {
            const matrixData = (
                await getMatrix({
                    origins: markers,
                    destinations: markers
                }).unwrap()
            ).matrix;
            setOptimal(matrixData.origin);
            setMatrixData(matrixData.data);
        };

        fetchMatrix();
    };

    const fetchMultiRoute = () => {
        matrixData.map(async (route) => {
            const data = await fetchRoute([route.origin, route.destination]);
            setRoute((prevRoutes) => [...prevRoutes, data]);
        });
    };

    const fetchRoute = async (waypoints: Point[]) => {
        const routeData = (
            await getRoute({
                waypoints: waypoints
            }).unwrap()
        ).route as Route;
        return routeData;
    };

    useEffect(() => {
        setRoute([]);
        fetchMultiRoute();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matrixData]);

    return (
        <div>
            Client Page
            <div style={{height: '500px', width: '500px'}}>
                <YMapLayout>
                    <YMapListener onFastClick={(e, eve) => setMarkers([...markers, eve.coordinates])} />
                    {markers.map((marker) => {
                        return (
                            <YMapDefaultMarker
                                coordinates={marker}
                                key={marker[0]}
                                color={marker[0] === optimal[0] && marker[1] === optimal[1] ? '#3a82db' : '#f25'}
                            />
                        );
                    })}
                    {routes &&
                        routes.map((route) => {
                            return <DriverRoute route={route} key={route.duration} />;
                        })}
                </YMapLayout>
            </div>
            <button onClick={handleLogout}>logout</button>
            <br />
            <button onClick={handlePoint}>Найти оптимальное расположение</button>
        </div>
    );
};
export default ClientPage;
