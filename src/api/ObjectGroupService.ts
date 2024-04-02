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
        })
    })
});

export const {useGetObjectGroupsByClientIdQuery} = ObjectGroupService;
