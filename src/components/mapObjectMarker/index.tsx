import clsx from 'clsx';
import {YMapMarker} from '../../lib/ymaps';
import type {YMapMarkerProps} from '../../lib/ymaps';
import type {Status} from '../../types/Object';
import {ReactComponent as ObjectIcon} from '../../img/object-icon.svg';

import classes from './index.module.scss';

interface MapObjectMarkerProps extends YMapMarkerProps {
    status?: Status | 'new';
    isOptimal?: boolean;
}

const objectStatus = {
    working: classes.working,
    waiting: classes.waiting,
    repair: classes.repair,
    new: classes.new
};

function MapObjectMarker({status = 'working', isOptimal = false, ...markerProps}: MapObjectMarkerProps) {
    return (
        <YMapMarker {...markerProps}>
            <div className={clsx(classes['object-point'], objectStatus[status], isOptimal && classes.optimal)}>
                <ObjectIcon />
            </div>
        </YMapMarker>
    );
}

export default MapObjectMarker;
