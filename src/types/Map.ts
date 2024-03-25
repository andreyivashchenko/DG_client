import {LngLat} from '../lib/ymaps';

export type Point = [number, number];

export interface Route {
    distance: number;
    duration: number;
    points: LngLat[];
}

export interface Matrix {
    totalDuration: number;
    origin: Point;
    data: MatrixData[];
}

export interface MatrixData {
    status: string;
    distance: {value: number};
    duration: {value: number};
    destination: Point;
    origin: Point;
}
