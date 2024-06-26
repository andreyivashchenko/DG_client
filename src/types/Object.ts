import {LngLat} from '@yandex/ymaps3';
export interface IObject {
    object_id: number;
    coordinates: LngLat;
    status: Status;
}

export interface INewObject extends Omit<IObject, 'object_id' | 'status'> {}

export type Status = 'working' | 'waiting' | 'repair';
