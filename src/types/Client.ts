import {IGroups} from './Object';

export interface IClientWithGroups {
    client_id: number;
    groups: IGroups[];
}
