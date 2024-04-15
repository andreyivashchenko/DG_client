import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store/store';

export const ApiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.user?.token;

            if (token) {
                headers.set('Authorization', token);
            }
        }
    }),
    tagTypes: ['/admin', '/object-group', '/object', '/client/id', '/driver', '/client'],
    endpoints: () => ({})
});
