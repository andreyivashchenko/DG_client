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
        }),
        getClients: builder.query({
            query: () => `${ClientUrl}/`,
            providesTags: ['/client/']
        })
    })
});

export const {useGetClientByUserIdQuery, useLazyGetClientsQuery} = ClientService;
