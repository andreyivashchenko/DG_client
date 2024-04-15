import {LngLat} from '@yandex/ymaps3';
import {ApiService} from './ApiService';

const DriverUrl = '/driver';

export const DriverService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        updateDriverCoordinates: builder.mutation<number, {driver_id: number; coordinates: LngLat}>({
            query: (arg) => {
                const {driver_id, coordinates} = arg;
                return {
                    url: DriverUrl,
                    method: 'POST',
                    body: {driver_id, coordinates}
                };
            },
            invalidatesTags: ['/driver']
        })
    })
});

export const {useUpdateDriverCoordinatesMutation} = DriverService;
