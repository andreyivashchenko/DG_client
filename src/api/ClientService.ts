import {ApiService} from './ApiService';

const ClientUrl = '/client';

export interface IClientResp {
    message: string;
    data: {client_id: number};
}
export const ClientService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getClients: builder.query({
            query: () => `${ClientUrl}/`,
            providesTags: ['/client/']
        })
    })
});

export const {useLazyGetClientsQuery} = ClientService;
