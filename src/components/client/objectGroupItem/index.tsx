import React, {useMemo, useState} from 'react';
import YMapLayout from '../../ymapLayout';
import {YMapDefaultMarker, YMapControls} from '../../../lib/ymaps';
import type {Margin, BehaviorType} from '../../../lib/ymaps';
import type {IGroup} from '../../../types/Object';
import {DEFAULT_LOCATION, bbox} from '../../../utils/map';
import MapInfoControl from '../mapInfoControl';

const MAP_MARGIN = [75, 75, 75, 75] as Margin;
const STATIC_MAP_BEHAVIORS: BehaviorType[] = [];
const RESPONSIVE_MAP_BEHAVIORS: BehaviorType[] = ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'];

interface ObjectGroupItemProps {
    group: IGroup;
}

function ObjectGroupItem({group}: ObjectGroupItemProps) {
    const [isChangeObjects, setIsChangeObjects] = useState(false);

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

    const onClickHandler = () => {
        setIsChangeObjects(!isChangeObjects);
    };

    return (
        <div>
            <div>Группа #{group.object_group_id}</div>
            <div style={{width: '50%', height: '350px'}}>
                <YMapLayout
                    location={mapLocation}
                    behaviors={isChangeObjects ? RESPONSIVE_MAP_BEHAVIORS : STATIC_MAP_BEHAVIORS}
                    margin={MAP_MARGIN}
                >
                    {group.objects.map((object) => (
                        <YMapDefaultMarker key={object.object_id} coordinates={object.coordinates} />
                    ))}

                    {isChangeObjects && (
                        <YMapControls position="top left">
                            <MapInfoControl text="Чтобы добавить объект - кликните на нужное место на карте. Чтобы удалить объект - кликните на него. Максимум 10 объектов." />
                        </YMapControls>
                    )}
                </YMapLayout>
            </div>

            <button onClick={onClickHandler}>{isChangeObjects ? 'Сохранить изменения' : 'Изменить объекты'}</button>
        </div>
    );
}

export default ObjectGroupItem;
