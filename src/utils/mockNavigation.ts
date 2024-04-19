import {timeout} from './timeout';
import type {LngLat} from '../lib/ymaps';

export const mockGeolocationApi = () => {
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

export const mockGeolocation = mockGeolocationApi();

export async function mockDrive(routeCoordinates: LngLat[]) {
    for (const point of routeCoordinates) {
        mockGeolocation.updateWatchPosition(point);
        await timeout(50);
    }
}
