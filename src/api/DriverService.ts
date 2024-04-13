import {LngLat} from '@yandex/ymaps3';
import {IDriver} from '../types/Driver';
import {ApiService} from './ApiService';

const DriverUrl = '/driver';
interface GetDriversResponse {
    success: boolean;
    message: string;
    data?: Omit<IDriver, 'coordinates' | 'user_id'>[];
}

export const DriverService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        updateDriverCoordinates: builder.mutation<number, {driver_id: number; coordinates: LngLat}>({
            query: (arg) => {
                const {driver_id, coordinates} = arg;
                return {
                    url: `${DriverUrl}/coordinates`,
                    method: 'POST',
                    body: {driver_id, coordinates}
                };
            }
        }),
        getDrivers: builder.query<GetDriversResponse, undefined>({
            query: () => `${DriverUrl}`
        })
    })
});

export const {useUpdateDriverCoordinatesMutation, useGetDriversQuery} = DriverService;
