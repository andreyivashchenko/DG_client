import {Outlet} from 'react-router-dom';
import {useGetDriverByUserIdQuery} from '../../../api/UserService';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useEffect} from 'react';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {setRoleId} from '../../../store/slices/AuthSlice';

const Layout = () => {
    const dispatch = useAppDispatch();

    const {user, roleId} = useAppSelector((state) => state.auth)!;

    const {data, error} = useGetDriverByUserIdQuery(+user?.id!);

    useEffect(() => {
        if (data) {
            dispatch(setRoleId({roleId: data.data.driver_id}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (error) {
        return <div>{(error as {data: {message: string}}).data.message}</div>;
    }

    return !roleId ? <div>Role Loading</div> : <Outlet />;
};

export default Layout;
