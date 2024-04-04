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
        }),

        setOptimalObject: builder.mutation<
            {message: string},
            {object_group_id: number; optimal_object_id: number | null}
        >({
            query: (args) => {
                const {object_group_id, optimal_object_id} = args;

                return {
                    method: 'POST',
                    url: `${ObjectGroupUrl}/optimal-object`,
                    body: {object_group_id, optimal_object_id}
                };
            },
            invalidatesTags: ['/object-group']
        })
    })
});

export const {
    useGetObjectGroupsByClientIdQuery,
    useCreateObjectGroupMutation,
    useDeleteObjectGroupByIdMutation,
    useSetOptimalObjectMutation
} = ObjectGroupService;
