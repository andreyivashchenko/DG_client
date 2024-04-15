import type {LngLat} from '../lib/ymaps';

export interface IDriver {
    driver_id: number;
    user_id: number;
    coordinates: LngLat;
    object_group_id?: number;
    full_name: string;
    status: DriverStatus;
}

export type DriverStatus = 'waiting_order' | 'going_to_order' | 'working' | 'going_to_base';
