import {useMemo} from 'react';
import {YMapFeature, YMapMarker} from '../../lib/ymaps';
import type {LngLat} from '../../lib/ymaps';
import type {Route} from '../../types/Map';
import {getFeatureStyle, getFeatureGeometry, getFeatureCoordinates} from './utils';
import {findNearestIndex} from '../../utils/math';

import classes from './index.module.scss';

interface DriverPointProps {
    point: LngLat;
}

function DriverPoint({point}: DriverPointProps) {
    return (
        <YMapMarker coordinates={point}>
            <div className={classes['driver-point']}></div>
        </YMapMarker>
    );
}

interface DriverRouteProps {
    route: Route;
    driverCoordinates?: LngLat;
}

function DriverRoute({route, driverCoordinates}: DriverRouteProps) {
    const routeFeatures = useMemo(() => {
        const nearIndexToDriver = driverCoordinates ? findNearestIndex(route.points, driverCoordinates) : 0;

        return {
            remaining: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver, true)),
                style: getFeatureStyle('#83C753')
            },
            past: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver)),
                style: getFeatureStyle('#808080')
            }
        };
    }, [route, driverCoordinates]);

    return (
        <>
            <YMapFeature geometry={routeFeatures.remaining.geometry} style={routeFeatures.remaining.style} />
            <YMapFeature geometry={routeFeatures.past.geometry} style={routeFeatures.past.style} />
            {driverCoordinates && <DriverPoint point={driverCoordinates} />}
        </>
    );
}

export default DriverRoute;
