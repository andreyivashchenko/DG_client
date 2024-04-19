import React, {Dispatch, FC, SetStateAction} from 'react';
import {UseFormReset} from 'react-hook-form';
import {DriverForm} from '../../../pages/mainPages/newDriversPage';
import classes from './PopupWindow.module.scss';

interface PopupWindowProps {
    popupActive: boolean;
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
    resetForm?: UseFormReset<DriverForm>;
}

const PopupWindow: FC<PopupWindowProps> = ({popupActive, setPopupActive, children, resetForm}) => {
    if (popupActive) {
        return (
            <div
                onClick={() => {
                    setPopupActive(false);
                    if (resetForm) resetForm();
                }}
                className={classes.searchPopup}
            >
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
