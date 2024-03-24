import React from 'react';
import ReactDom from 'react-dom';
import type {
    LngLat,
    LngLatBounds,
    MapEventUpdateHandler,
    YMapProps,
    YMapLocationRequest,
    DrawingStyle
} from '@yandex/ymaps3';
import type {Geometry} from '@yandex/ymaps3/imperative/YMapFeature/types';
import * as ymaps3 from '@yandex/ymaps3';
import {YMapLocation} from '@yandex/ymaps3/imperative/YMap';
import * as YMapDefaultMarkerPrototype from '@yandex/ymaps3/packages/markers';
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

const {YMapDefaultMarker} = reactified.module(YMapDefaultMarkerPrototype);

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
    YMapMarker,
    YMapDefaultMarker,
    reactified
};

export type {
    YMapLocation,
    YMapLocationRequest,
    YMapProps,
    LngLat,
    LngLatBounds,
    MapEventUpdateHandler,
    DrawingStyle,
    Geometry
};
