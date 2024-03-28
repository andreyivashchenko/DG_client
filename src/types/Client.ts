import {IGroup} from './Object';

export interface IClientWithGroups {
    client_id: number;
    groups: IGroup[];
}
