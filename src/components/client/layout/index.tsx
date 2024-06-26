import {Outlet} from 'react-router-dom';
import {useGetClientByUserIdQuery} from '../../../api/UserService';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useEffect} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {setRoleData} from '../../../store/slices/AuthSlice';

const Layout = () => {
    const dispatch = useAppDispatch();

    const {user, roleData} = useAppSelector((state) => state.auth)!;

    const {data, error} = useGetClientByUserIdQuery(+user?.id!);

    useEffect(() => {
        if (data) {
            dispatch(setRoleData({roleData: data.data}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (error) {
        return <div>{(error as {data: {message: string}}).data.message}</div>;
    }

    return !roleData ? <div>Role Loading</div> : <Outlet />;
};

export default Layout;
