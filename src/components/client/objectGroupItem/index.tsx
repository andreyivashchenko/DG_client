import React, {useMemo, useState} from 'react';
import YMapLayout from '../../ymapLayout';
import {YMapDefaultMarker, YMapControls, YMapListener} from '../../../lib/ymaps';
import type {Margin, BehaviorType, DomEventHandler, LngLat} from '../../../lib/ymaps';
import type {IGroup, INewObject} from '../../../types/Object';
import {DEFAULT_LOCATION, bbox} from '../../../utils/map';
import MapInfoControl from '../mapInfoControl';
import {useCreateObjectMutation} from '../../../api/ObjectService';

const MAP_MARGIN = [75, 75, 75, 75] as Margin;
const STATIC_MAP_BEHAVIORS: BehaviorType[] = [];
const RESPONSIVE_MAP_BEHAVIORS: BehaviorType[] = ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'];

interface ObjectGroupItemProps {
    group: IGroup;
}

function ObjectGroupItem({group}: ObjectGroupItemProps) {
    const [isChangeObjects, setIsChangeObjects] = useState(false);
    const [unsavedNewObjects, setUnsavedNewObjects] = useState<INewObject[]>([]);

    const [createObject] = useCreateObjectMutation();

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

    const onMapClickHandler: DomEventHandler = (_, event) => {
        if (!isChangeObjects) {
            return;
        }

        setUnsavedNewObjects((prev) => [...prev, {coordinates: event.coordinates}]);
    };

    const onClickHandler = () => {
        if (isChangeObjects) {
            unsavedNewObjects.forEach((unsavedNewObject) => {
                createObject({coordinates: unsavedNewObject.coordinates, object_group_id: group.object_group_id});
            });
        }

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

                    {unsavedNewObjects.map((unsavedNewObject, index) => (
                        <YMapDefaultMarker key={index} coordinates={unsavedNewObject.coordinates} />
                    ))}

                    <YMapListener onClick={onMapClickHandler} />

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
