import {IObject} from './Object';

export interface IInfo {
    client_id: number;
    groups: {
        object_group_id: number;
        optimal_object_id: number | null;
        objects: IObject[];
    }[];
}
