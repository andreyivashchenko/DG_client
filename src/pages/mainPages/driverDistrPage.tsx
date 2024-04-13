import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useGetInfoQuery} from '../../api/AdminService';
import {useGetDriversQuery} from '../../api/DriverService';
import PopupWindow from '../../components/UI/PopupWindow/PopupWindow';
import {IDriver} from '../../types/Driver';

interface SetDriverDataForm extends Omit<IDriver, 'coordinates' | 'user_id'> {}

const DriverDistrPage = () => {
    const {data: ClientsData} = useGetInfoQuery(undefined);
    const {data: DriversData, isLoading} = useGetDriversQuery(undefined);
    const [clients, setClients] =
        useState<({clientId: number; nameOrg: string; objectGroupId: number} | undefined)[]>();
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const [activeDriver, setActiveDriver] = useState<SetDriverDataForm | null>(null);
    const [activeGroups, setActiveGroups] =
        useState<({clientId: number; nameOrg: string; objectGroupId: number} | undefined)[]>();

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
        reset
    } = useForm<SetDriverDataForm>();
    const onSubmit: SubmitHandler<SetDriverDataForm> = (data) => {
        console.log(data);
    };

    const handleSelectDriver = (driver: Omit<IDriver, 'coordinates' | 'user_id'>) => {
        setActiveDriver(driver);
        setPopupActive(true);
        setValue('full_name', driver.full_name);
        setValue('driver_id', driver.driver_id);
        setValue('object_group_id', driver.object_group_id);
        setValue('status', driver.status);
    };
    const handlePopupClose = () => {
        setActiveDriver(null);
        reset();
        setPopupActive(false);
    };
    const handleSetClientId = (client_id: string) => {
        const groups = clients?.filter((client) => client?.clientId === +client_id);
        setActiveGroups(groups);
    };
    return (
        <div>
            {DriversData?.data?.map((driver) => (
                <div key={driver.driver_id} onClick={() => handleSelectDriver(driver)}>
                    <span>Id водителя {driver.driver_id}</span>
                    <br />
                    <span>Имя водителя {driver.full_name}</span>
                    <br />
                    <span>Название организации {driver.name_org}</span>
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
            <PopupWindow popupActive={popupActive} setPopupActive={setPopupActive}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>ФИО водителя {activeDriver?.full_name}</span>
                    <input type="text" {...register('full_name')} />
                    <br />
                    Название организации
                    <select onChange={(e) => handleSetClientId(e.target.value)}>
                        {clients?.map((client) => {
                            return (
                                <option key={client?.objectGroupId} value={client?.clientId}>
                                    {client?.nameOrg}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    Id группы, к которой привязан водитель
                    <select {...register('object_group_id')}>
                        {activeGroups?.map((group) => {
                            return (
                                <option key={group?.objectGroupId} value={group?.objectGroupId}>
                                    Группа № {group?.objectGroupId}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <button type="submit">Отправить</button>
                </form>{' '}
                <br />
                <button onClick={handlePopupClose}>Закрыть</button>
            </PopupWindow>
        </div>
    );
};
export default DriverDistrPage;
