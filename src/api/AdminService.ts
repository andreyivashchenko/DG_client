import type {IInfo} from '../types/Admin';
import type {Status} from '../types/Object';
import {ApiService} from './ApiService';

const AdminUrl = '/admin';

export interface IAdminResp {
    message: string;
    data: IInfo[];
}
export interface IClientsWithDrivers {
    client_id: number;
    name_org: string;
    groups:
        | {
              object_group_id: number;
              optimal_object_id: number;
              drivers: {driver_id: number; full_name: string}[] | [];
          }[]
        | [];
}

export interface IClientsWithDriversResp {
    success: boolean;
    message: string;
    data: IClientsWithDrivers[];
}

export const AdminService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getInfo: builder.query<IAdminResp, undefined>({
            query: () => `${AdminUrl}/info`,
            providesTags: ['/admin']
        }),

        setObjectStatus: builder.mutation<{message: string}, {object_id: number; status: Status}>({
            query: (args) => {
                const {object_id, status} = args;
                return {
                    url: `${AdminUrl}/object-status`,
                    method: 'POST',
                    body: {object_id, status}
                };
            },
            invalidatesTags: ['/admin']
        }),
        setDriverData: builder.mutation({
            query: (args) => {
                const {object_group_id, drivers} = args;

                return {
                    url: `${AdminUrl}/set-driver`,
                    method: 'POST',
                    body: {object_group_id, drivers}
                };
            },
            invalidatesTags: ['change-drivers', 'second-change-drivers']
        }),
        getClientsWithDrivers: builder.query<IClientsWithDriversResp, undefined>({
            query: () => `${AdminUrl}/test`,
            providesTags: ['change-drivers']
        }),
        removeDriverFromGroup: builder.mutation({
            query: ({driverId}) => {
                return {
                    url: `${AdminUrl}/remove-driver`,
                    method: 'POST',
                    body: {driverId}
                };
            },
            invalidatesTags: ['change-drivers', 'second-change-drivers']
        })
    })
});

export const {
    useGetInfoQuery,
    useSetObjectStatusMutation,
    useSetDriverDataMutation,
    useGetClientsWithDriversQuery,
    useRemoveDriverFromGroupMutation
} = AdminService;
