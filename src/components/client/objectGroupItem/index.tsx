import React, {useCallback, useEffect, useMemo, useState} from 'react';
import YMapLayout from '../../ymapLayout';
import {YMapDefaultMarker, YMapControls, YMapListener} from '../../../lib/ymaps';
import type {Margin, BehaviorType, DomEventHandler, YMapLocationRequest} from '../../../lib/ymaps';
import type {IGroup, INewObject} from '../../../types/Object';
import {DEFAULT_LOCATION, bbox} from '../../../utils/map';
import MapInfoControl from '../mapInfoControl';
import {useCreateObjectMutation, useDeleteObjectByIdMutation} from '../../../api/ObjectService';

const MAP_MARGIN = [75, 75, 75, 75] as Margin;
const STATIC_MAP_BEHAVIORS: BehaviorType[] = [];
const RESPONSIVE_MAP_BEHAVIORS: BehaviorType[] = ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'];

interface ObjectGroupItemProps {
    group: IGroup;
}

function ObjectGroupItem({group}: ObjectGroupItemProps) {
    const [isChangeObjects, setIsChangeObjects] = useState(false);
    const [unsavedObjects, setUnsavedNewObjects] = useState<INewObject[]>([]);

    const [createObject] = useCreateObjectMutation();
    const [deleteObject] = useDeleteObjectByIdMutation();
    const [mapLocation, setMapLocation] = useState<YMapLocationRequest>(DEFAULT_LOCATION);

    const onMapClickHandler: DomEventHandler = (object, event) => {
        if (!isChangeObjects || object?.type === 'marker') {
            return;
        }

        if (unsavedObjects.length + group.objects.length >= 10) {
            alert('В одной группе может быть максимум 10 объектов!');
            return;
        }

        setUnsavedNewObjects((prev) => [...prev, {coordinates: event.coordinates}]);
    };

    const onClickObjectHandler = useCallback((objectId: number) => {
        deleteObject(objectId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickUnsavedObjectsHandler = useCallback((unsavedObject: INewObject) => {
        setUnsavedNewObjects((prev) => prev.filter((newObject) => newObject.coordinates !== unsavedObject.coordinates));
    }, []);

    const onClickChangeMapBtnHandler = useCallback((isChangeObjects: boolean, unsavedObjects: INewObject[]) => {
        if (isChangeObjects) {
            unsavedObjects.forEach((unsavedNewObject) => {
                createObject({coordinates: unsavedNewObject.coordinates, object_group_id: group.object_group_id});
            });

            setUnsavedNewObjects([]);
        }

        setIsChangeObjects(!isChangeObjects);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isChangeObjects) {
            return;
        }

        if (group.objects.length === 0) {
            setMapLocation(DEFAULT_LOCATION);
        }

        if (group.objects.length === 1) {
            setMapLocation({
                center: group.objects[0].coordinates,
                zoom: 14
            });
        }

        setMapLocation({
            bounds: bbox(group.objects.map((object) => object.coordinates))
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group, isChangeObjects]);

    return (
        <div>
            <div>Группа #{group.object_group_id}</div>
            <div style={{width: '50%', height: '350px'}}>
                <YMapLayout
                    location={mapLocation}
                    behaviors={isChangeObjects ? RESPONSIVE_MAP_BEHAVIORS : STATIC_MAP_BEHAVIORS}
                    margin={MAP_MARGIN}
                >
                    <YMapListener onClick={onMapClickHandler} />

                    {group.objects.map((object) => (
                        <YMapDefaultMarker
                            key={object.object_id}
                            coordinates={object.coordinates}
                            onClick={() => onClickObjectHandler(object.object_id)}
                        />
                    ))}

                    {unsavedObjects.map((unsavedObject, index) => (
                        <YMapDefaultMarker
                            key={index}
                            coordinates={unsavedObject.coordinates}
                            color="#FFFF00"
                            onClick={() => onClickUnsavedObjectsHandler(unsavedObject)}
                        />
                    ))}

                    {isChangeObjects && (
                        <YMapControls position="top left">
                            <MapInfoControl text="Чтобы добавить объект - кликните на нужное место на карте. Чтобы удалить объект - кликните на него. Максимум 10 объектов." />
                        </YMapControls>
                    )}
                </YMapLayout>
            </div>

            <button onClick={() => onClickChangeMapBtnHandler(isChangeObjects, unsavedObjects)}>
                {isChangeObjects ? 'Сохранить изменения' : 'Изменить объекты'}
            </button>
        </div>
    );
}

export default ObjectGroupItem;
