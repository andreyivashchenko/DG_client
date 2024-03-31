import {LngLat} from '@yandex/ymaps3';

export interface IGroup {
    object_group_id: number;
    objects: IObject[];
}
export interface IObject {
    object_id: number;
    coordinates: LngLat;
    status: Status;
}

export interface INewObject extends Omit<IObject, 'object_id' | 'status'> {}

export type Status = 'working' | 'waiting' | 'repair';
