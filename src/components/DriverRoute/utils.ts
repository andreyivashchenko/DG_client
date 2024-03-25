import type {LngLat, DrawingStyle, Geometry} from '../../lib/ymaps';

export function getFeatureCoordinates(route: LngLat[], separatingIndex: number, isRemainingRoute?: boolean) {
    if (separatingIndex === 0) {
        if (isRemainingRoute) {
            return route;
        } else {
            return [];
        }
    }

    if (separatingIndex === route.length - 1) {
        if (isRemainingRoute) {
            return [];
        } else {
            return route;
        }
    }

    if (isRemainingRoute) {
        return route.slice(separatingIndex);
    } else {
        return route.slice(0, separatingIndex);
    }
}

export function getFeatureGeometry(coordinates: LngLat[]): Geometry {
    return {
        type: 'LineString',
        coordinates
    };
}

export function getFeatureStyle(color: string): DrawingStyle {
    return {
        stroke: [
            {
                color,
                width: 8,
                opacity: 0.8
            }
        ],
        simplificationRate: 0
    };
}
