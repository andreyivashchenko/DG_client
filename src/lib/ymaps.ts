import React from 'react';
import ReactDom from 'react-dom';
import type {LngLat, LngLatBounds, MapEventUpdateHandler, YMapProps, YMapLocationRequest} from '@yandex/ymaps3';
import * as ymaps3 from '@yandex/ymaps3';
import {YMapLocation} from '@yandex/ymaps3/imperative/YMap';
import {reactify} from '@yandex/ymaps3/reactify';

const reactified = reactify.bindTo(React, ReactDom);
const {
    YMap,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapControlButton,
    YMapMarker,
    YMapFeature,
    YMapListener,
    YMapContainer,
    YMapControl
} = reactified.module(ymaps3);

export {
    YMap,
    ymaps3 as map,
    YMapContainer,
    YMapControl,
    YMapControlButton,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapFeature,
    YMapListener,
    YMapMarker as MapMarker,
    reactified
};

export type {YMapLocation, YMapLocationRequest, YMapProps, LngLat, LngLatBounds, MapEventUpdateHandler};
