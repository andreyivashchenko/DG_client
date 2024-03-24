import {useNavigate} from 'react-router-dom';
import YMapLayout from '../components/ymapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {LngLat, YMapDefaultMarker, YMapListener} from '../lib/ymaps';

import {useState} from 'react';
import {useLazyGetMatrixQuery} from '../api/RouteService';
import {logout} from '../store/slices/AuthSlice';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [getMatrix] = useLazyGetMatrixQuery(undefined);
    const [markers, setMarkers] = useState<LngLat[]>([]);
    const [optimal, setOptimal] = useState<LngLat | []>([]);

    const handlePoint = () => {
        const fetchMatrix = async () => {
            const matrixData = (
                await getMatrix({
                    origins: markers,
                    destinations: markers
                }).unwrap()
            ).matrix;

            setOptimal(matrixData.origin);
        };

        fetchMatrix();
    };

    return (
        <div>
            Main Page
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
                </YMapLayout>
            </div>
            <button onClick={handleLogout}>logout</button>
            <br />
            <button onClick={handlePoint}>Найти оптимальное расположение</button>
        </div>
    );
};

export default MainPage;
