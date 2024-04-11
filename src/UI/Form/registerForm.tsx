import {FC, useEffect, useState} from 'react';
import type {FieldErrors, UseFormGetValues, UseFormRegister, UseFormReset} from 'react-hook-form';
import {useLazyGetClientsQuery} from '../../api/ClientService';
import {useLazyGetObjectGroupsByClientIdQuery} from '../../api/ObjectGroupService';
import {useLazyGetObjectsByObjectGroupIdQuery} from '../../api/ObjectService';
import {RegisterFrom} from '../../pages/registerPage/registerPage';
import {Roles} from '../../types/User';

interface RegisterFormProps {
    register: UseFormRegister<RegisterFrom>;
    classes: {
        readonly [key: string]: string;
    };
    errors: FieldErrors<RegisterFrom>;
    reset: UseFormReset<RegisterFrom>;
    getValues: UseFormGetValues<RegisterFrom>;
}

export const RegisterForm: FC<RegisterFormProps> = ({register, classes, errors, reset, getValues}) => {
    const [role, setRole] = useState<Roles>('driver');
    const [nameOrg, setNameOrg] = useState<[{client_id: number; name_org: string}] | []>([]);
    const [selectedClient, setSelectedClient] = useState<{client_id: number; name_org: string} | undefined>(undefined);
    const [getClients] = useLazyGetClientsQuery();
    const [getObjectsByObjectGroup] = useLazyGetObjectsByObjectGroupIdQuery();
    const [getObjectGroupByClientId] = useLazyGetObjectGroupsByClientIdQuery();
    useEffect(() => {
        const fetchClients = async () => {
            const fetchedClients = await getClients('');
            setNameOrg(fetchedClients.data.data);
        };

        if (role === 'driver') {
            fetchClients();
        }
    }, [nameOrg, getClients, role]);

    useEffect(() => {
        const fetchObjects = async () => {
            if (selectedClient?.client_id) {
                const objectGroupId = await getObjectGroupByClientId(selectedClient?.client_id);
                //const optimalObject = await getObjectsByObjectGroup(objectGroupId);
            }
        };

        console.log(getValues('client_id'));
    }, [getValues]);

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

                        <select
                            className={classes.form__input}
                            defaultValue={-1}
                            onClick={() => {
                                setSelectedClient(
                                    nameOrg.find((client) => client.client_id === +getValues('client_id'))
                                );
                                console.log(selectedClient);
                            }}
                            {...register('client_id', {required: true})}
                        >
                            <option value={-1} disabled>
                                Select the name of the organization
                            </option>
                            {nameOrg.map((client) => {
                                return (
                                    <option value={client.client_id} key={client.client_id}>
                                        {client.name_org}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.client_id && <div className={classes.error}>{errors.client_id.message}</div>}
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
