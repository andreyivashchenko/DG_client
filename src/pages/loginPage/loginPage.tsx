import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../api/AuthService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setUser} from '../../store/slices/AuthSlice';
import {UserCredentials} from '../../types/User';
import classes from './loginPage.module.scss';

const LoginPage = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location.state?.from?.pathname || '/';
    const {isAuthenticated} = useAppSelector((store) => store.auth);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        clearErrors
    } = useForm<UserCredentials>();
    const onSubmit: SubmitHandler<UserCredentials> = (data) => {
        handleLogin(data);
    };
    const handleLogin = async (user: UserCredentials) => {
        clearErrors('root');
        try {
            const res = await login(user).unwrap();
            if (res) dispatch(setUser(res));
            navigate(fromPage, {replace: true});
        } catch (error: any) {
            if (error) {
                setError('root.serverError', {
                    type: error.error.status,
                    message: error.error.data.message
                });
            }
        }
    };

    if (isAuthenticated) return <Navigate to={'/register'} />;
    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.form__titleBlock}>
                    <h1 className={classes.form__title}> Sign in</h1>
                    <Link to={'/register'} className={classes.form__link}>
                        Register
                    </Link>
                </div>

                <input
                    type="text"
                    {...register('name', {required: true})}
                    placeholder="User name"
                    className={classes.form__input}
                />
                {errors.name && <div className={classes.error}>Это поле является обязательным</div>}
                <input
                    type="email"
                    {...register('email', {required: true})}
                    placeholder="Email"
                    className={classes.form__input}
                />
                {errors.email && <div className={classes.error}>Это поле является обязательным</div>}
                <input
                    type="password"
                    {...register('pass', {required: true})}
                    placeholder="Password"
                    className={classes.form__input}
                />
                {errors.pass && <div className={classes.error}>Это поле является обязательным</div>}
                <button type="submit" className={classes.form__subButton}>
                    Sign in
                </button>
                {errors.root && <div className={classes.error__root}>{errors.root.serverError.message}</div>}
            </form>
        </div>
    );
};

export default LoginPage;
