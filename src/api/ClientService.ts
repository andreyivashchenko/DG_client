import {ApiService} from './ApiService';

const ClientUrl = '/client';

export interface IClientResp {
    message: string;
    data: {client_id: number};
}
export const ClientService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getClientByUserId: builder.query<IClientResp, number>({
            query: (arg) => ({
                url: `${ClientUrl}/${arg}`
            }),
            providesTags: ['/client/id']
        })
    })
});

export const {useGetClientByUserIdQuery} = ClientService;
