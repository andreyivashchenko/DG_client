import React, {useMemo} from 'react';
import YMapLayout from '../../ymapLayout';
import {YMapDefaultMarker} from '../../../lib/ymaps';
import type {Margin} from '../../../lib/ymaps';
import type {IGroup} from '../../../types/Object';
import {DEFAULT_LOCATION, bbox} from '../../../utils/map';

interface ObjectGroupItemProps {
    group: IGroup;
}

const MAP_MARGIN = [75, 75, 75, 75] as Margin;

function ObjectGroupItem({group}: ObjectGroupItemProps) {
    const mapLocation = useMemo(
        () => {
            if (group.objects.length === 0) {
                return DEFAULT_LOCATION;
            }

            if (group.objects.length === 1) {
                return {
                    center: group.objects[0].coordinates,
                    zoom: 14
                };
            }

            return {
                bounds: bbox(group.objects.map((object) => object.coordinates))
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <div>
            <div>Группа #{group.object_group_id}</div>
            <div style={{width: '300px', height: '300px'}}>
                <YMapLayout location={mapLocation} behaviors={[]} margin={MAP_MARGIN}>
                    {group.objects.map((object) => (
                        <YMapDefaultMarker key={object.object_id} coordinates={object.coordinates} />
                    ))}
                </YMapLayout>
            </div>

            <button>Изменить объекты</button>
        </div>
    );
}

export default ObjectGroupItem;
