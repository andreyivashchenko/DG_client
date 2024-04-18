import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useGetClientsWithDriversQuery} from '../../api/AdminService';
import {useGetFreeDriversQuery} from '../../api/DriverService';
import PopupWindow from '../../components/UI/PopupWindow/PopupWindow';
import {IDriverWithName} from '../../types/Driver';
export interface DriverForm {
    object_group_id: number;
    drivers: number[];
}
const NewDriversPage = () => {
    const {data: FreeDrivers, isLoading: isLoadingDrivers} = useGetFreeDriversQuery(undefined);
    const {data: ClientsWithDrivers, isLoading: isLoadingClients} = useGetClientsWithDriversQuery(undefined);
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [freeDrivers, setFreeDrivers] = useState<IDriverWithName[] | undefined>();
    const [rerender, setRerender] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        getValues,
        unregister
    } = useForm<DriverForm>();

    const onSubmit: SubmitHandler<DriverForm> = (data) => {
        data.drivers = data.drivers.filter((item) => item).map((item) => +item);
        const checkSet = new Set(data.drivers);
        if (checkSet.size !== data.drivers.length) alert('Указаны одинаковые водители');

        setPopupActive(false);
    };

    const handleClickGroup = (group_id: number) => {
        const foundedClient = ClientsWithDrivers?.data.find((item) => {
            if (item.groups) {
                return item.groups.some((group) => group.object_group_id === group_id);
            }
            return false;
        });
        const foundedGroup = foundedClient?.groups?.find((item) => item.object_group_id === group_id);
        setValue('object_group_id', foundedGroup!.object_group_id);
        foundedGroup?.drivers.forEach((driver, i) => {
            setValue(`drivers.${i}`, driver.driver_id);
        });
        setPopupActive(true);
    };

    const handleAddDriver = () => {
        setRerender((prev) => !prev);
        !getValues('drivers') ? setValue(`drivers.${0}`, -1) : setValue(`drivers.${getValues('drivers').length}`, -1);
    };

    const handleDeleteDriver = (driverIndex: number) => {
        unregister(`drivers.${driverIndex}`);
    };

    useEffect(() => {
        if (!isLoadingDrivers && FreeDrivers) {
            setFreeDrivers(FreeDrivers?.data);
        }
    }, [FreeDrivers, freeDrivers, isLoadingDrivers]);
    if (!isLoadingDrivers && !isLoadingClients) {
        return (
            <>
                <div>
                    {ClientsWithDrivers?.data.map((client) => {
                        return (
                            <div key={client.client_id}>
                                <span> Клиент с id: {client.client_id}</span>
                                <br />
                                <span>Название организации: {client.name_org}</span>
                                <br />
                                <span>
                                    {client.groups.length ? (
                                        client.groups.map((group) => {
                                            return (
                                                <div
                                                    key={group.object_group_id}
                                                    onClick={() => {
                                                        handleClickGroup(group.object_group_id);
                                                    }}
                                                >
                                                    <br />
                                                    <span>Группа с id: {group.object_group_id}</span>
                                                    <br />
                                                    <span>Оптимальный объект в группе {group.optimal_object_id}</span>
                                                    <br />
                                                    <span>
                                                        {' '}
                                                        Водители: <br />
                                                        {group.drivers.length ? (
                                                            group.drivers.map((driver) => {
                                                                return (
                                                                    <div key={driver.driver_id}>
                                                                        <span>Водитель с id: {driver.driver_id}</span>
                                                                        <span> ФИО: {driver.full_name}</span>
                                                                        <br />
                                                                    </div>
                                                                );
                                                            })
                                                        ) : (
                                                            <>
                                                                <b>Водители не назначены!</b> <br />
                                                            </>
                                                        )}
                                                    </span>
                                                    <br />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <>
                                            <b>Группы не созданы!</b>
                                        </>
                                    )}
                                </span>
                                <br />
                                <br />
                                <br />
                            </div>
                        );
                    })}
                </div>
                <PopupWindow popupActive={popupActive} setPopupActive={setPopupActive} resetForm={reset}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register('object_group_id')} disabled />
                        <br />
                        <br />
                        {getValues('drivers')?.map((driver, i) => {
                            return (
                                <>
                                    <select {...register(`drivers.${i}`)}>
                                        {freeDrivers?.map((driver) => {
                                            return (
                                                <option value={driver.driver_id} hidden={!!driver.object_group_id}>
                                                    {driver.full_name}
                                                </option>
                                            );
                                        })}
                                        <option value={-1} disabled>
                                            Выберите водителя
                                        </option>
                                    </select>
                                    <button onClick={() => handleDeleteDriver(i)}>Удалить </button>
                                    <br /> <br />
                                </>
                            );
                        })}
                        <br /> <br />
                        <button type="submit">Сохранить</button>
                    </form>
                    <button onClick={() => handleAddDriver()}>добавить</button>

                    <br />
                </PopupWindow>
            </>
        );
    } else {
        return <div>Загрузка</div>;
    }
};

export default NewDriversPage;
