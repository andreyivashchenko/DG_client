import React from 'react';
import {YMapControl} from '../../../lib/ymaps';
import infoIcon from '../../../img/info-icon.svg';

import classes from './index.module.scss';

interface MapInfoControlProps {
    text: string;
}

function MapInfoControl(props: MapInfoControlProps) {
    return (
        <YMapControl>
            <div className={classes.infoWindow}>
                <img src={infoIcon} alt="info icon" className={classes.infoIcon} />
                <div className={classes.infoText}>{props.text}</div>
            </div>
        </YMapControl>
    );
}

export default MapInfoControl;
