import {IObject} from './Object';

export interface IInfo {
    client_id: number;
    groups: {
        object_group_id: number;
        objects: IObject[];
    }[];
}
