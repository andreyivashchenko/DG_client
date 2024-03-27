import {useNavigate} from 'react-router-dom';
import YMapLayout from '../components/ymapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {YMapDefaultMarker} from '../lib/ymaps';

import {useEffect, useState} from 'react';
import {useGetObjectsQuery, useSetObjectStatusMutation} from '../api/ObjectService';
import {logout} from '../store/slices/AuthSlice';
import {IObject, Status} from '../types/Object';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    const {data, isLoading} = useGetObjectsQuery('');
    const [setObjectsStatus] = useSetObjectStatusMutation();
    const [objects, setObjects] = useState<IObject[]>([]);
    const [selectMarker, setSelectMarker] = useState<IObject | null>(null);
    const Statuses: Status[] = ['working', 'waiting', 'repair'];

    useEffect(() => {
        setObjects([]);
        if (!isLoading && data) {
            data
                ? data.data.map((client) =>
                      client.groups.map((group) =>
                          group.objects.map((object) => {
                              return setObjects((prevObjects) => [...prevObjects, object]);
                          })
                      )
                  )
                : setObjects([]);
        }
    }, [data, isLoading]);

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
