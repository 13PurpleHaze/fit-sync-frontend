import React from "react";
import classes from "./style.module.css";

const PrimaryBtn = ({isRed, children, ...props}) => {
    return (
        <>
            {
                isRed
                    ? <button {...props} className={`${classes.btn} bg_color_red`}>{ children }</button>
                    : <button {...props} className={`${classes.btn} bg_color_black`}>{ children }</button>
            }
        </>
    );
};

export default PrimaryBtn;
