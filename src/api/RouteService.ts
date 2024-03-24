// routeApi.ts
import {ApiService} from './ApiService';
import type {Point} from '../types/Map';

export const routeApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getRoute: builder.query<any, {waypoints: Point[]}>({
            query: (arg) => {
                const {waypoints} = arg;
                const formatWaypoints = JSON.stringify(waypoints);

                return {
                    url: '/route',
                    params: {waypoints: formatWaypoints},
                    method: 'get'
                };
            }
        })
    })
});

export const {useLazyGetRouteQuery} = routeApi;
