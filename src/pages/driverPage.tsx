import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {logout} from '../store/slices/AuthSlice';
import {useEffect, useState} from 'react';
import {useLazyGetRouteQuery} from '../api/RouteService';
import YMapLayout from '../components/ymapLayout';
import {YMapFeature} from '../lib/ymaps';
import type {Route} from '../types/Map';
// const fetchRouteTest = async (func: any) => {
//     const route = await fetch(
//         'https://api.routing.yandex.net/v2/route?waypoints=25.234369457896325,55.280222457968712|25.234369457896325,55.401544758961258&apikey=c529833b-445d-4d4a-8e75-cb253f46007f'
//     ).then((data) => data.json());

//     const routeCoordinates = route.route.legs[0];
//     console.log(routeCoordinates);

//     const data = await func({
//         waypoints: [
//             [37.9, 55.85],
//             [37.32, 55.57]
//         ]
//     }).unwrap();
//     console.log(data);
// };

const DriverPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [getRoute] = useLazyGetRouteQuery(undefined);

    const [route, setRoute] = useState<Route | null>(null);

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
                <YMapLayout>
                    {route && (
                        <YMapFeature
                            geometry={{type: 'LineString', coordinates: route.points}}
                            style={{
                                stroke: [
                                    {
                                        color: '#83C753',
                                        width: 8,
                                        opacity: 0.8
                                    }
                                ]
                            }}
                        />
                    )}
                </YMapLayout>
            </div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default DriverPage;
