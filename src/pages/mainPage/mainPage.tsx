import {useNavigate} from 'react-router-dom';
import YMapLayout from '../../components/ymapLayout';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {LngLat, YMapDefaultMarker} from '../../lib/ymaps';

import {useEffect, useState} from 'react';
import {useGetObjectsQuery, useSetObjectStatusMutation} from '../../api/ObjectService';
import {useLazyGetRouteQuery} from '../../api/RouteService';
import DriverRoute from '../../components/DriverRoute';
import {logout} from '../../store/slices/AuthSlice';
import {Route} from '../../types/Map';
import {IObject, Status} from '../../types/Object';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    const {data, isLoading} = useGetObjectsQuery(undefined);
    const [setObjectsStatus] = useSetObjectStatusMutation();
    const [objects, setObjects] = useState<IObject[]>([]);
    const [selectMarker, setSelectMarker] = useState<IObject | null>(null);
    const [route, setRoute] = useState<Route | null>(null);
    const [driverCoordinates, setDriverCoordinates] = useState<LngLat | undefined>(undefined);
    const [getRoute] = useLazyGetRouteQuery(undefined);

    const Statuses: Status[] = ['working', 'waiting', 'repair'];

    useEffect(() => {
        setObjects([]);
        if (!isLoading && data) {
            data.data.map((client) =>
                client.groups.map((group) =>
                    group.objects.map((object) => {
                        return setObjects((prevObjects) => [...prevObjects, object]);
                    })
                )
            );
        }
    }, [data, isLoading]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:4000/driver/1');

        if (typeof EventSource !== 'undefined') {
            console.log('1111');
        } else {
            console.log('0000');
        }
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);

            setDriverCoordinates(eventData);
        };
        return () => {
            eventSource.close();
        };
    }, []);
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

    const handleClickMarker = (obj: IObject) => {
        setSelectMarker(obj);
    };
    const handleSetObjectStatus = (selectMarker: IObject, status: Status) => {
        setObjectsStatus({object_id: selectMarker.object_id, status: status});
        setSelectMarker(null);
    };

    return (
        <div>
            Main Page
            <div style={{height: '500px', width: '500px'}}>
                <YMapLayout>
                    {route && <DriverRoute route={route} driverCoordinates={driverCoordinates} />}
                    <YMapDefaultMarker coordinates={[37.9, 55.85]} />
                    {objects.map((obj) => {
                        return (
                            <YMapDefaultMarker
                                coordinates={obj.coordinates}
                                key={obj.object_id}
                                color={
                                    obj.status === 'working'
                                        ? '#15f001'
                                        : obj.status === 'waiting'
                                        ? '#fcff3c'
                                        : '#ff0000'
                                }
                                onClick={() => handleClickMarker(obj)}
                            />
                        );
                    })}
                </YMapLayout>
            </div>
            <button onClick={handleLogout}>logout</button>
            <br />
            <br />
            {selectMarker ? (
                <div>
                    <span>Выбран объект с id : {selectMarker.object_id}</span>
                    <br />
                    <span>Текущее состояние объекта: {selectMarker.status}</span>
                    <br />
                    Можете задать ему следующие состояния:
                    {Statuses.map((status) =>
                        status !== selectMarker.status ? (
                            <div key={status}>
                                <br />
                                <button
                                    onClick={() => {
                                        handleSetObjectStatus(selectMarker, status);
                                    }}
                                    style={{padding: '10px', cursor: 'pointer'}}
                                >
                                    {status}
                                </button>
                                <br />
                            </div>
                        ) : (
                            ''
                        )
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default MainPage;
