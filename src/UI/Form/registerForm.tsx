import {FC, useEffect, useState} from 'react';
import {FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue} from 'react-hook-form';
import {useLazyGetClientsQuery} from '../../api/ClientService';
import {RegisterFrom} from '../../pages/registerPage/registerPage';
import {Roles} from '../../types/User';

interface RegisterFormProps {
    register: UseFormRegister<RegisterFrom>;
    classes: {
        readonly [key: string]: string;
    };
    errors: FieldErrors<RegisterFrom>;
    reset: UseFormReset<RegisterFrom>;
    setValue: UseFormSetValue<RegisterFrom>;
}

export const RegisterForm: FC<RegisterFormProps> = ({register, classes, errors, reset, setValue}) => {
    const [role, setRole] = useState<Roles>('driver');
    const [clients, setClients] = useState();
    const [getClients] = useLazyGetClientsQuery();
    useEffect(() => {
        const fetchClients = async () => {
            const fetchedClients = await getClients('');
            setClients(fetchedClients.data.data);
        };

        if (role === 'driver') {
            fetchClients();
        }
    }, [role]);
    const selectForm = () => {
        switch (role) {
            case 'client':
                return (
                    <>
                        <input
                            type="text"
                            {...register('nameOrg', {required: true})}
                            placeholder="Organization name"
                            className={classes.form__input}
                        />
                        {errors.nameOrg && <div className={classes.error}>Это поле является обязательным</div>}

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
                    </>
                );
            case 'driver':
                return (
                    <>
                        <input
                            type="text"
                            {...register('fullName', {required: true})}
                            placeholder="FullName"
                            className={classes.form__input}
                        />
                        {errors.fullName && <div className={classes.error}>Это поле является обязательным</div>}

                        <input
                            type="text"
                            {...register('nameOrg', {required: true})}
                            placeholder="Organization name"
                            className={classes.form__input}
                        />
                        {errors.nameOrg && <div className={classes.error}>Это поле является обязательным</div>}
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
                    </>
                );
            case 'admin':
                return (
                    <>
                        <input
                            type="text"
                            {...register('name', {required: true})}
                            placeholder="Name"
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
                    </>
                );
        }
    };

    return (
        <>
            {selectForm()}
            <select
                className={classes.form__input}
                {...register('role')}
                onChange={(e) => {
                    setRole(e.target.value as Roles);
                    reset();
                }}
                value={role}
            >
                <option className={classes.form__selectOpt} value="admin">
                    admin
                </option>
                <option className={classes.form__selectOpt} value="client">
                    client
                </option>
                <option className={classes.form__selectOpt} value="driver">
                    driver
                </option>
            </select>
            {errors.role && <div className={classes.error}>Это поле является обязательным</div>}
        </>
    );
};
