import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useGetDriverByUserIdQuery} from '../../../api/UserService';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {setRoleData} from '../../../store/slices/AuthSlice';

const Layout = () => {
    const dispatch = useAppDispatch();

    const {user, roleData} = useAppSelector((state) => state.auth)!;
    console.log(user);

    const {data, error} = useGetDriverByUserIdQuery(+user?.id!);

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
