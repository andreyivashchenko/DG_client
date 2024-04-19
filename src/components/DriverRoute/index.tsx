import {useMemo} from 'react';
import type {LngLat} from '../../lib/ymaps';
import {YMapFeature} from '../../lib/ymaps';
import type {Route} from '../../types/Map';
import {findNearestIndex} from '../../utils/math';
import {getFeatureCoordinates, getFeatureGeometry, getFeatureStyle} from './utils';

interface DriverRouteProps {
    route: Route;
    driverCoordinates?: LngLat;
    color?: string;
}

function DriverRoute({route, driverCoordinates, color}: DriverRouteProps) {
    const routeFeatures = useMemo(() => {
        const nearIndexToDriver = driverCoordinates ? findNearestIndex(route.points, driverCoordinates) : 0;

        return {
            remaining: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver, true)),
                style: getFeatureStyle(color ? color : '#83C753')
            },
            past: {
                geometry: getFeatureGeometry(getFeatureCoordinates(route.points, nearIndexToDriver)),
                style: getFeatureStyle('#808080')
            }
        };
    }, [route, driverCoordinates, color]);

    return (
        <>
            <YMapFeature geometry={routeFeatures.remaining.geometry} style={routeFeatures.remaining.style} />
            <YMapFeature geometry={routeFeatures.past.geometry} style={routeFeatures.past.style} />
        </>
    );
}

export default DriverRoute;
