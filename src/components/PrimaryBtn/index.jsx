import React from 'react';
import classes from "./style.module.css";

const PrimaryBtn = ({colorState, children, props}) => {
    return (
        <>
            {
                colorState
                    ? <button {...props} className={`${classes.btn} ${classes.btn_color_red}`}>{ children }</button>
                    : <button {...props} className={`${classes.btn} ${classes.btn_color_black}`}>{ children }</button>
            }
        </>
    );
};

export default PrimaryBtn;