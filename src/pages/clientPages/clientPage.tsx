import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logout} from '../../store/slices/AuthSlice';
import {useGetObjectsQuery} from '../../api/ObjectService';
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

    const clientId = useAppSelector((state) => state.auth.roleId)!;

    const {data, isLoading} = useGetObjectsQuery(clientId);

    useEffect(() => {
        if (data) {
            setGroups(data.data[0].groups);
        }
    }, [isLoading, data]);

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
