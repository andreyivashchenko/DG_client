import React from 'react';
import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} from '../../lib/ymaps';
import type {YMapLocationRequest, YMapProps} from '../../lib/ymaps';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const LOCATION: YMapLocationRequest = {
    center: [37.623082, 55.75254], // starting position [lng, lat]
    zoom: 9 // starting zoom
};

function YMapLayout(props: React.PropsWithChildren<PartialBy<YMapProps, 'location'>>) {
    return (
        <YMap location={LOCATION}>
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            {props.children}
        </YMap>
    );
}

export default YMapLayout;
