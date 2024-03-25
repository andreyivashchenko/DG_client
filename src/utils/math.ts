import type {LngLat} from '../lib/ymaps';

export function findDistance(point1: LngLat, point2: LngLat) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function findNearestIndex(route: LngLat[], targetPoint: LngLat) {
    let nearestIndex = -1;
    let minDistance = Infinity;

    route.forEach((point, index) => {
        const distance = findDistance(point, targetPoint);

        if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = index;
        }
    });

    return Math.max(nearestIndex, 0);
}
