import React from 'react';
import classes from './index.module.scss';
import {LngLat, YMapMarker} from '../../lib/ymaps';

interface MapDriverMarkerProps {
    coordinates: LngLat;
}

function MapDriverMarker({coordinates}: MapDriverMarkerProps) {
    return (
        <YMapMarker coordinates={coordinates}>
            <div className={classes['driver-marker']}></div>
        </YMapMarker>
    );
}

export default MapDriverMarker;
