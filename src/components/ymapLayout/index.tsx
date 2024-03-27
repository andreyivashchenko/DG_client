import React, {useEffect} from 'react';
import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} from '../../lib/ymaps';
import type {YMapLocationRequest, YMapProps} from '../../lib/ymaps';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type MapContextType = {
    mapProps: YMapProps;
    setMapProps: React.Dispatch<React.SetStateAction<YMapProps>>;
};

const defaultContext: MapContextType = {
    mapProps: {} as YMapProps,
    setMapProps: () => {}
};

export const MapContext = React.createContext<MapContextType>(defaultContext);

const LOCATION: YMapLocationRequest = {
    center: [37.623082, 55.75254], // starting position [lng, lat]
    zoom: 9 // starting zoom
};

function YMapLayout(props: React.PropsWithChildren<PartialBy<YMapProps, 'location'>>) {
    const {children, ...initialMapProps} = props;

    const [mapProps, setMapProps] = React.useState<YMapProps>({
        location: LOCATION,
        ...initialMapProps
    });

    return (
        <MapContext.Provider value={{mapProps, setMapProps}}>
            <YMap {...mapProps}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {props.children}
            </YMap>
        </MapContext.Provider>
    );
}

export default YMapLayout;
