import type {LngLat} from '../lib/ymaps';
import type {Route} from '../types/Map';
import {findDistance} from './math';
import {driveTheRoute, mockGeolocationApi} from './mockNavigation';

const EPS = 1e-7;

export const navigation = async (
    route: Route,
    updateDriverCoordinates: React.Dispatch<React.SetStateAction<LngLat | undefined>>,
    driver_id: number
) => {
    const routeCoordinates = route.points;

    let navigatorWatchId: number;

    const geolocationMock = await mockGeolocationApi();
    driveTheRoute(routeCoordinates, 100, (position) => geolocationMock.updateWatchPosition(position));

    return new Promise<void>((resolve) => {
        let i = 0;

        navigatorWatchId = navigator.geolocation.watchPosition((position) => {
            const coordinates: LngLat = [position.coords.longitude, position.coords.latitude];

            updateDriverCoordinates(coordinates);

            if (i % 10 === 0) {
                fetch('http://localhost:4000/driver', {
                    method: 'POST',
                    body: JSON.stringify({driver_id, coordinates}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            const distanceToEndRoute = findDistance(coordinates, routeCoordinates[routeCoordinates.length - 1]);

            if (distanceToEndRoute < EPS) {
                // TODO: тут надо отправлять координаты драйвера на бэк, последнюю координату

                navigator.geolocation.clearWatch(navigatorWatchId);
                geolocationMock.reset();
                resolve();
            }

            i++;
        });
    });
};
