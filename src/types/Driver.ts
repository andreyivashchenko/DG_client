import {LngLat} from '../lib/ymaps';

export interface IDriver {
    driver_id: number;
    user_id: number;
    coordinates: LngLat;
    object_group_id: number;
    full_name: string;
    name_org: string;
    status: string;
}
