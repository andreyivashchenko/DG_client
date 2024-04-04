import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const ApiService = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/'
    }),
    tagTypes: ['/admin', '/object-group', '/object', '/client/id', '/driver/id', '/client/'],
    endpoints: () => ({})
});
