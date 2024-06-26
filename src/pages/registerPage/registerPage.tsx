import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useRegisterMutation} from '../../api/AuthService';
import {RegisterForm} from '../../components/UI/Form/registerForm';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setUser} from '../../store/slices/AuthSlice';
import {IAdminRegister, IClientRegister, IDriverRegister} from '../../types/User';
import classes from './registerPage.module.scss';
export type RegisterFrom = IDriverRegister & IClientRegister & IAdminRegister;

const RegisterPage = () => {
    const [registerUser] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location.state?.from?.pathname || '/';
    const {isAuthenticated} = useAppSelector((store) => store.auth);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        reset,
        getValues
    } = useForm<RegisterFrom>();
    const onSubmit: SubmitHandler<RegisterFrom> = (data) => {
        let dataToFetch: RegisterFrom = {
            name: '',
            fullName: '',
            nameOrg: '',
            role: 'client',
            email: '',
            pass: '',
            client_id: '0'
        };
        if (data.role === 'client') {
            dataToFetch['nameOrg'] = data.nameOrg;
        } else if (data.role === 'driver') {
            dataToFetch['fullName'] = data.fullName;
            dataToFetch['nameOrg'] = data.nameOrg;
        } else {
            dataToFetch['name'] = data.fullName;
        }
        dataToFetch['email'] = data.email;
        dataToFetch['pass'] = data.pass;
        dataToFetch['role'] = data.role;
        handleRegister(data);
    };
    const handleRegister = async (user: RegisterFrom) => {
        try {
            if (user.client_id === '-1') {
                throw new Error('Вы не указали организацию!', {cause: 'client_id is not selected'});
            }
            const res = await registerUser(user).unwrap();
            if (res) dispatch(setUser(res));
            navigate(fromPage, {replace: true});
        } catch (error: any) {
            if (error.cause === 'client_id is not selected') {
                setError('client_id', {
                    type: errors.client_id?.type,
                    message: error.message
                });
            } else if (error) {
                setError('root.serverError', {
                    type: error.error.status,
                    message: error.error.data.message
                });
            }
        }
    };
    if (isAuthenticated) return <Navigate to={'/'} />;
    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.form__titleBlock}>
                    <h1 className={classes.form__title}> Register</h1>
                    <Link to={'/login'} className={classes.form__link}>
                        Sign in
                    </Link>
                </div>

                <RegisterForm
                    register={register}
                    classes={classes}
                    errors={errors}
                    reset={reset}
                    getValues={getValues}
                />

                <button type="submit" className={classes.form__subButton}>
                    Sign up
                </button>
                {errors.root && <div className={classes.error__root}>{errors.root.serverError.message}</div>}
            </form>
        </div>
    );
};

export default RegisterPage;
