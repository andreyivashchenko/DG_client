import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logout} from '../../store/slices/AuthSlice';
import {useLazyGetObjectsQuery} from '../../api/ObjectService';
import {useGetClientByUserIdQuery} from '../../api/ClientService';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useState, useEffect} from 'react';
import {IGroup} from '../../types/Object';
import ObjectGroupItem from '../../components/client/objectGroupItem';

const ClientPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [groups, setGroups] = useState<IGroup[]>([]);

    const userId = useAppSelector((state) => state.auth.user?._id)!;

    const {data: clientId, isLoading} = useGetClientByUserIdQuery(+userId);

    const [getClientObjectGroup] = useLazyGetObjectsQuery();

    useEffect(() => {
        if (clientId) {
            const fetchClientObjectGroup = async (clientId: number) => {
                const data = await getClientObjectGroup(clientId).unwrap();
                setGroups(data.data[0].groups);
            };

            fetchClientObjectGroup(clientId);
        }
    }, [clientId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {groups.map((group) => (
                <ObjectGroupItem key={group.object_group_id} group={group} />
            ))}
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};
export default ClientPage;
