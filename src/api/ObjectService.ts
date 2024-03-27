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
        getObjects: builder.query<IObjectsResp, any>({
            query: () => `${ObjectUrl}/`,
            providesTags: ['Objects']
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
            invalidatesTags: ['Objects']
        })
    })
});

export const {useSetObjectStatusMutation, useGetObjectsQuery} = ObjectService;
