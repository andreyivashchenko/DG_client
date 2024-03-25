import {timeout} from './timeout';
import type {LngLat} from '../lib/ymaps';

export async function driveTheRoute(routeCoordinates: LngLat[], delay: number, cb: (point: LngLat) => void) {
    for (const point of routeCoordinates) {
        cb(point);
        await timeout(delay);
    }
}

export const mockGeolocationApi = async () => {
    let updateWatchPosition: (coordinates: LngLat) => void = () => {};

    navigator.geolocation.watchPosition = (successCallback) => {
        updateWatchPosition = (coordinates) => {
            successCallback({
                coords: {
                    longitude: coordinates[0],
                    latitude: coordinates[1]
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        };

        return 0;
    };

    navigator.geolocation.clearWatch = () => {
        updateWatchPosition = () => {};
    };

    return {
        get updateWatchPosition() {
            return updateWatchPosition;
        },
        reset() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (navigator.geolocation as any).watchPosition;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (navigator.geolocation as any).clearWatch;
        }
    };
};
