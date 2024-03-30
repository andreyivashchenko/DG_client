import {IClientWithGroups} from '../types/Client';
import {Status} from '../types/Object';
import {ApiService} from './ApiService';

const ObjectUrl = '/object';

export interface IObjectsResp {
    message: string;
    data: IClientWithGroups[];
}

export const ObjectService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getObjects: builder.query<IObjectsResp, number | undefined>({
            query: (arg) =>
                arg
                    ? {
                          url: `${ObjectUrl}/`,
                          params: {client_id: arg}
                      }
                    : {
                          url: `${ObjectUrl}/`
                      },
            providesTags: ['/object']
        }),
        setObjectStatus: builder.mutation<{message: string}, {object_id: number; status: Status}>({
            query: (args) => {
                const {object_id, status} = args;
                return {
                    url: `${ObjectUrl}/status`,
                    method: 'POST',
                    body: {object_id, status}
                };
            },
            invalidatesTags: ['/object']
        })
    })
});

export const {useSetObjectStatusMutation, useGetObjectsQuery, useLazyGetObjectsQuery} = ObjectService;
