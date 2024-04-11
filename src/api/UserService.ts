import {IClient} from '../types/Client';
import {IDriver} from '../types/Driver';
import {ApiService} from './ApiService';

const UserUrl = '/user';

export interface IClientResp {
    message: string;
    data: IClient;
}

export interface IDriverResp {
    message: string;
    data: IDriver;
}

export const UserService = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getClientByUserId: builder.query<IClientResp, number>({
            query: (arg) => ({
                url: `${UserUrl}/client/${arg}`
            })
        }),
        getDriverByUserId: builder.query<IDriverResp, number>({
            query: (arg) => ({
                url: `${UserUrl}/driver/${arg}`
            })
        })
    })
});

export const {useGetClientByUserIdQuery, useGetDriverByUserIdQuery} = UserService;
