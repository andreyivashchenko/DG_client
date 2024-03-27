import {LngLat} from '@yandex/ymaps3';

export interface IGroups {
    object_group_id: number;
    objects: IObject[];
}

export interface IObject {
    object_id: number;
    coordinates: LngLat;
    status: Status;
}
export type Status = 'working' | 'waiting' | 'repair';
