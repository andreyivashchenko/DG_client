import {IObjectGroup} from '../types/ObjectGroup';
import {ApiService} from './ApiService';

const ObjectGroupUrl = '/object-group';

export interface IObjectGroupsResp {
    message: string;
    data: IObjectGroup[];
}

export const ObjectGroupService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getObjectGroupsByClientId: builder.query<IObjectGroupsResp, number>({
            query: (arg) => ({
                url: `${ObjectGroupUrl}/${arg}`
            }),
            providesTags: ['/object-group']
        }),
        createObjectGroup: builder.mutation<{message: string}, {client_id: number}>({
            query: (args) => {
                const {client_id} = args;

                return {
                    method: 'POST',
                    url: `${ObjectGroupUrl}/`,
                    body: {client_id}
                };
            },
            invalidatesTags: ['/object-group']
        }),
        deleteObjectGroupById: builder.mutation<{message: string}, number>({
            query: (arg) => ({
                url: `${ObjectGroupUrl}/${arg}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['/object-group']
        })
    })
});

export const {useGetObjectGroupsByClientIdQuery, useCreateObjectGroupMutation, useDeleteObjectGroupByIdMutation} =
    ObjectGroupService;
