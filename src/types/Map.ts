import {LngLat} from '../lib/ymaps';

export type Point = [number, number];

export interface Route {
    distance: number;
    duration: number;
    points: LngLat[];
}
