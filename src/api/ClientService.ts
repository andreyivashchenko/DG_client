import {ApiService} from './ApiService';

const ClientUrl = '/client';

export const ClientService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getClientByUserId: builder.query<number, number>({
            query: (arg) => ({
                url: `${ClientUrl}/${arg}`
            }),
            providesTags: ['/client/id']
        })
    })
});

export const {useGetClientByUserIdQuery} = ClientService;
