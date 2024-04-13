import type {IInfo} from '../types/Admin';
import type {Status} from '../types/Object';
import {ApiService} from './ApiService';

const AdminUrl = '/admin';

export interface IAdminResp {
    message: string;
    data: IInfo[];
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
                const {driverId, objectGroupId, nameOrg, status} = args;

                return {
                    url: `${AdminUrl}/set-driver`,
                    method: 'POST',
                    body: {driverId, objectGroupId, nameOrg, status}
                };
            }
        })
    })
});

export const {useGetInfoQuery, useSetObjectStatusMutation, useSetDriverDataMutation} = AdminService;
