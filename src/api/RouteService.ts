// routeApi.ts
import type {Point} from '../types/Map';
import {ApiService} from './ApiService';

export const routeApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        //TODO: присрать тип для принимаемого значения
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
        }),
        getMatrix: builder.query<any, {origins: Point[]; destinations: Point[]}>({
            query: (arg) => {
                const {origins, destinations} = arg;
                const formatOrigins = JSON.stringify(origins);
                const formatDestinations = JSON.stringify(destinations);

                return {
                    url: '/route/matrix',
                    params: {origins: formatOrigins, destinations: formatDestinations},
                    method: 'get'
                };
            }
        })
    })
});

export const {useLazyGetRouteQuery, useLazyGetMatrixQuery} = routeApi;
