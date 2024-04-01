import {Outlet} from 'react-router-dom';
import {useGetClientByUserIdQuery} from '../../../api/ClientService';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useEffect} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {setRole} from '../../../store/slices/AuthSlice';

const Layout = () => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector((state) => state.auth.user?._id)!;

    const {data, isLoading, error} = useGetClientByUserIdQuery(+userId);

    useEffect(() => {
        if (data) {
            dispatch(setRole({role: 'client', roleId: data.data.client_id}));
        }
    }, [data]);

    if (error) {
        return <div>{(error as {data: {message: string}}).data.message}</div>;
    }

    return isLoading ? <div>Role Loading</div> : <Outlet />;
};

export default Layout;
