import React, {Dispatch, FC, SetStateAction} from 'react';
import classes from './PopupWindow.module.scss';

interface PopupWindowProps {
    popupActive: boolean;
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

const PopupWindow: FC<PopupWindowProps> = ({popupActive, setPopupActive, children}) => {
    if (popupActive) {
        return (
            <div onClick={() => setPopupActive(false)} className={classes.searchPopup}>
                <div onClick={(e) => e.stopPropagation()} className={classes.searchPopup__content}>
                    {children}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default PopupWindow;
