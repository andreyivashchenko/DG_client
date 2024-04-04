import React, {useCallback, useEffect, useState} from 'react';
import MapLayout from '../../mapLayout';
import {YMapControls, YMapListener} from '../../../lib/ymaps';
import type {Margin, BehaviorType, DomEventHandler, YMapLocationRequest, LngLat} from '../../../lib/ymaps';
import type {INewObject, IObject} from '../../../types/Object';
import type {IObjectGroup} from '../../../types/ObjectGroup';
import {DEFAULT_LOCATION, bbox} from '../../../utils/map';
import MapInfoControl from '../mapInfoControl';
import {
    useCreateObjectMutation,
    useDeleteObjectByIdMutation,
    useGetObjectsByObjectGroupIdQuery
} from '../../../api/ObjectService';
import {useDeleteObjectGroupByIdMutation, useSetOptimalObjectMutation} from '../../../api/ObjectGroupService';
import MapObjectMarker from '../../mapObjectMarker';
import {useLazyGetMatrixQuery} from '../../../api/RouteService';

const MAP_MARGIN = [75, 75, 75, 75] as Margin;
const STATIC_MAP_BEHAVIORS: BehaviorType[] = [];
const RESPONSIVE_MAP_BEHAVIORS: BehaviorType[] = ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'];

interface ObjectGroupItemProps {
    group: IObjectGroup;
}

function ObjectGroupItem({group}: ObjectGroupItemProps) {
    const [isChangeObjects, setIsChangeObjects] = useState(false);
    const [objects, setObject] = useState<IObject[]>([]);
    const [unsavedObjects, setUnsavedNewObjects] = useState<INewObject[]>([]);
    const [optimalObjectId, setOptimalObjectId] = useState<number | null>(group.optimal_object_id);

    const [createObject] = useCreateObjectMutation();
    const [deleteObject] = useDeleteObjectByIdMutation();
    const [mapLocation, setMapLocation] = useState<YMapLocationRequest>(DEFAULT_LOCATION);

    const {data, isLoading} = useGetObjectsByObjectGroupIdQuery(group.object_group_id);

    const [deleteObjectGroup] = useDeleteObjectGroupByIdMutation();
    const [setOptimalObject] = useSetOptimalObjectMutation();

    const [getMatrix] = useLazyGetMatrixQuery(undefined);

    const findOptimalObjectId = useCallback(async (objects: IObject[]) => {
        if (objects.length === 0) {
            setOptimalObject({object_group_id: group.object_group_id, optimal_object_id: null});
            return;
        }

        if (objects.length === 1) {
            setOptimalObject({object_group_id: group.object_group_id, optimal_object_id: objects[0].object_id});
            return;
        }

        const objectsCoordinates = objects.map((object) => object.coordinates);

        const optimalObjectCoordinates = (
            await getMatrix({
                origins: objectsCoordinates,
                destinations: objectsCoordinates
            }).unwrap()
        ).matrix.origin;

        for (const object of objects) {
            if (
                optimalObjectCoordinates[0] === object.coordinates[0] &&
                optimalObjectCoordinates[1] === object.coordinates[1]
            ) {
                setOptimalObjectId(object.object_id);
                setOptimalObject({object_group_id: group.object_group_id, optimal_object_id: object.object_id});
                break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data) {
            setObject(data.data);
            findOptimalObjectId(data.data);
        }
    }, [data, findOptimalObjectId]);

    useEffect(() => {
        if (isChangeObjects) {
            return;
        }

        if (objects.length === 0) {
            setMapLocation(DEFAULT_LOCATION);
            return;
        }

        if (objects.length === 1) {
            setMapLocation({
                center: objects[0].coordinates,
                zoom: 14
            });
            return;
        }

        setMapLocation({
            bounds: bbox(objects.map((object) => object.coordinates))
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objects, isChangeObjects]);

    const onMapClickHandler: DomEventHandler = (object, event) => {
        if (!isChangeObjects || object?.type === 'marker') {
            return;
        }

        if (unsavedObjects.length + objects.length >= 10) {
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

    const onClickDeleteObjectGroupHandler = useCallback((objectGroupId: number) => {
        deleteObjectGroup(objectGroupId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <div>Loading object group</div>;
    }

    return (
        <div>
            <div>Группа #{group.object_group_id}</div>
            <div style={{width: '50%', height: '350px'}}>
                <MapLayout
                    location={mapLocation}
                    behaviors={isChangeObjects ? RESPONSIVE_MAP_BEHAVIORS : STATIC_MAP_BEHAVIORS}
                    margin={MAP_MARGIN}
                >
                    <YMapListener onClick={onMapClickHandler} />

                    {objects.map((object) => (
                        <MapObjectMarker
                            key={object.object_id}
                            coordinates={object.coordinates}
                            onClick={() => onClickObjectHandler(object.object_id)}
                            status={object.status}
                            isOptimal={object.object_id === optimalObjectId}
                        />
                    ))}

                    {unsavedObjects.map((unsavedObject, index) => (
                        <MapObjectMarker
                            key={index}
                            coordinates={unsavedObject.coordinates}
                            onClick={() => onClickUnsavedObjectsHandler(unsavedObject)}
                            status="new"
                        />
                    ))}

                    {isChangeObjects && (
                        <YMapControls position="top left">
                            <MapInfoControl text="Чтобы добавить объект - кликните на нужное место на карте. Чтобы удалить объект - кликните на него. Максимум 10 объектов." />
                        </YMapControls>
                    )}
                </MapLayout>
            </div>

            <button onClick={() => onClickChangeMapBtnHandler(isChangeObjects, unsavedObjects)}>
                {isChangeObjects ? 'Сохранить изменения' : 'Изменить объекты'}
            </button>
            <br />
            <button onClick={() => onClickDeleteObjectGroupHandler(group.object_group_id)}>Удалить группу</button>
        </div>
    );
}

export default ObjectGroupItem;
