import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logout} from '../../store/slices/AuthSlice';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useState, useEffect, useCallback} from 'react';
import ObjectGroupItem from '../../components/client/objectGroupItem';
import {IObjectGroup} from '../../types/ObjectGroup';
import {useCreateObjectGroupMutation, useGetObjectGroupsByClientIdQuery} from '../../api/ObjectGroupService';

const ClientPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [groups, setGroups] = useState<IObjectGroup[]>([]);

    const clientId = useAppSelector((state) => state.auth.roleId)!;

    const {data, isLoading} = useGetObjectGroupsByClientIdQuery(clientId);

    const [createObjectGroup] = useCreateObjectGroupMutation();

    useEffect(() => {
        if (data) {
            setGroups(data.data);
        }
    }, [isLoading, data]);

    const onClickCreateObjectGroupHandler = useCallback((clientId: number) => {
        createObjectGroup({client_id: clientId});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{height: '100%'}}>
            <button onClick={() => onClickCreateObjectGroupHandler(clientId)}>Добавить новую группу</button>
            <div style={{overflow: 'auto', height: '90%', padding: '10px 0'}}>
                {groups.map((group) => (
                    <ObjectGroupItem key={group.object_group_id} group={group} />
                ))}
            </div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};
export default ClientPage;
