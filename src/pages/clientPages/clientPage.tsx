import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logout} from '../../store/slices/AuthSlice';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useState, useEffect} from 'react';
import ObjectGroupItem from '../../components/client/objectGroupItem';
import {IObjectGroup} from '../../types/ObjectGroup';
import {useGetObjectGroupsByClientIdQuery} from '../../api/ObjectGroupService';

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

    useEffect(() => {
        if (data) {
            setGroups(data.data);
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
