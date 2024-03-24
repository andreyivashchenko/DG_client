import {useNavigate} from 'react-router-dom';
import YMapLayout from '../components/ymapLayout';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {YMapListener} from '../lib/ymaps';

import {logout} from '../store/slices/AuthSlice';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const origins = [
        [37.678994344467164, 55.77243026992315],
        [37.70374942363269, 55.78088681812062]
    ];

    const destinations = [
        [37.6797439716393, 55.78931380873577],
        [37.66602194864067, 55.77996489255626]
    ];

    return (
        <div>
            Main Page
            <div style={{height: '500px', width: '500px'}}>
                <YMapLayout>
                    <YMapListener onFastClick={(e, eve) => console.log(eve.coordinates)} />
                </YMapLayout>
            </div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default MainPage;
