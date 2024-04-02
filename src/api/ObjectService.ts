import {LngLat} from '../lib/ymaps';
import {IObject} from '../types/Object';
import {Status} from '../types/Object';
import {ApiService} from './ApiService';

const ObjectUrl = '/object';

export interface IObjectsResp {
    message: string;
    data: IObject[];
}

export const ObjectService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getObjectsByObjectGroupId: builder.query<IObjectsResp, number>({
            query: (arg) => ({
                url: `${ObjectUrl}/${arg}`
            }),
            providesTags: ['/object']
        }),
        createObject: builder.mutation<{message: string}, {coordinates: LngLat; object_group_id: number}>({
            query: (args) => {
                const {coordinates, object_group_id} = args;

                return {
                    method: 'POST',
                    url: `${ObjectUrl}/`,
                    body: {coordinates, object_group_id}
                };
            },
            invalidatesTags: ['/object']
        }),
        deleteObjectById: builder.mutation<{message: string}, number>({
            query: (args) => {
                return {
                    method: 'DELETE',
                    url: `${ObjectUrl}/${args}`
                };
            },
            invalidatesTags: ['/object']
        })
    })
});

export const {useCreateObjectMutation, useGetObjectsByObjectGroupIdQuery, useDeleteObjectByIdMutation} = ObjectService;
