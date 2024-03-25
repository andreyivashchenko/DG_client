// routeApi.ts
import {LngLat} from '@yandex/ymaps3';
import type {Matrix, Point} from '../types/Map';
import {ApiService} from './ApiService';

export interface MatrixResp {
    success: boolean;
    message: string;
    matrix: Matrix;
}

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
        getMatrix: builder.query<MatrixResp, {origins: LngLat[]; destinations: LngLat[]}>({
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
