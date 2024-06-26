import type {YMapLocationRequest, LngLat, LngLatBounds} from '../lib/ymaps';

export const DEFAULT_LOCATION: YMapLocationRequest = {
    center: [37.623082, 55.75254], // starting position [lng, lat]
    zoom: 9 // starting zoom
};

export function bbox(points: LngLat[]): LngLatBounds {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;
    for (const point of points) {
        minLat = Math.min(minLat, point[1]);
        maxLat = Math.max(maxLat, point[1]);
        minLng = Math.min(minLng, point[0]);
        maxLng = Math.max(maxLng, point[0]);
    }
    return [
        [minLng, minLat],
        [maxLng, maxLat]
    ];
}
