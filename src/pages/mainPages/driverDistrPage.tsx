import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useGetInfoQuery, useSetDriverDataMutation} from '../../api/AdminService';
import {useGetDriversQuery} from '../../api/DriverService';
import {IDriverWithCLient} from '../../types/Driver';

export interface SetDriverDataForm extends Omit<IDriverWithCLient, 'coordinates' | 'user_id'> {}

const DriverDistrPage = () => {
    const {data: ClientsData} = useGetInfoQuery(undefined);
    const {data: DriversData, isLoading} = useGetDriversQuery(undefined);
    const [setDriverData] = useSetDriverDataMutation();
    const [clients, setClients] = useState<({clientId: number; objectGroupId: number} | undefined)[]>();
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [activeDriver, setActiveDriver] = useState<SetDriverDataForm | null>(null);

    useEffect(() => {
        //FIXME: все переписать, сейчас лень
        if (!isLoading && ClientsData) {
            const arr = ClientsData.data.flatMap((client) =>
                client.groups.map((group) => {
                    if (group.optimal_object_id) {
                        return {
                            clientId: client.client_id,
                            nameOrg: client.name_org,
                            objectGroupId: group.object_group_id
                        };
                    }
                })
            );
            const filteredArr = arr.filter((item) => item);
            if (filteredArr) {
                setClients(filteredArr);
            }
        }
    }, [ClientsData, isLoading]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        watch
    } = useForm<SetDriverDataForm>();
    const onSubmit: SubmitHandler<SetDriverDataForm> = (data) => {
        const dataForSend = {
            driverId: +data.driver_id,
            objectGroupId: +data.object_group_id,

            status: data.status
        };
        // setDriverData(dataForSend);
        console.log(dataForSend);
    };
    const handleSelectDriver = (driver: Omit<IDriverWithCLient, 'coordinates' | 'user_id'>) => {
        setActiveDriver(driver);
        setPopupActive(true);
        setValue('full_name', driver.full_name);
        setValue('driver_id', driver.driver_id);
        if (driver.object_group_id) setValue('object_group_id', driver.object_group_id);
        if (driver.client_id) setValue('client_id', driver.client_id);
        if (driver.status) setValue('status', driver.status);
    };
    const handlePopupClose = () => {
        setActiveDriver(null);
        reset();
        setPopupActive(false);
    };
    const uniqueClientsObjects: ({clientId: number; objectGroupId: number} | undefined)[] | undefined = clients?.reduce(
        (
            acc: ({clientId: number; objectGroupId: number} | undefined)[],
            currentValue: {clientId: number; objectGroupId: number} | undefined
        ) => {
            const existingItem = acc.find((item) => item?.clientId === currentValue?.clientId);
            if (!existingItem) {
                acc.push(currentValue);
            }
            return acc;
        },
        []
    );
    const selectClientId = watch('client_id');

    return (
        <div>
            {DriversData?.data?.map((driver) => (
                <div key={driver.driver_id} onClick={() => handleSelectDriver(driver)}>
                    <span>Id водителя {driver.driver_id}</span>
                    <br />
                    <span>Имя водителя {driver.full_name}</span>
                    <br />
                    <span>Id группы объектов {driver.object_group_id}</span>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            ))}
            {/* <PopupWindow popupActive={popupActive} setPopupActive={setPopupActive} resetForm={reset}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>ФИО водителя {activeDriver?.full_name}</span>
                    <input type="text" {...register('full_name')} />
                    <br />
                    Название организации
                    <select {...register('client_id')} defaultValue={-1}>
                        <option value={-1} disabled>
                            Выберите организацию
                        </option>
                        {uniqueClientsObjects?.map((client) => {
                            return (
                                <option key={client?.objectGroupId} value={client?.clientId!}>
                                    {client?.clientId}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    Id группы, к которой привязан водитель
                    <select {...register('object_group_id')} defaultValue={-1}>
                        <option value={-1} disabled>
                            Выберите группу
                        </option>
                        {clients?.map((client) => {
                            if (client?.clientId === +selectClientId) {
                                return (
                                    <option key={client?.objectGroupId} value={client?.objectGroupId}>
                                        Группа № {client?.objectGroupId}
                                    </option>
                                );
                            } else return '';
                        })}
                    </select>
                    <br />
                    <button type="submit">Отправить</button>
                </form>{' '}
                <br />
                <button onClick={handlePopupClose}>Закрыть</button>
            </PopupWindow> */}
        </div>
    );
};
export default DriverDistrPage;
