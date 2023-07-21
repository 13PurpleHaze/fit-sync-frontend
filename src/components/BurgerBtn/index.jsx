import React from "react";
import classes from "./style.module.css";

const BurgerBtn = ({colorState , ...props}) => {
    return (
        <button className={colorState ? `${classes.burger} ${classes.burger_color_red}` : `${classes.burger} ${classes.burger_color_white}`} {...props}>
            <span className={colorState ? classes.burger__line : `${classes.burger__line} ${classes.burger__line_color_white} ${classes['menu-open']}`}></span>
            <span className={colorState ? classes.burger__line : `${classes.burger__line} ${classes.burger__line_color_white} ${classes['menu-open']}`}></span>
            <span className={colorState ? classes.burger__line : `${classes.burger__line} ${classes.burger__line_color_white} ${classes['menu-open']}`}></span>
            <span className={colorState ? classes.burger__line : `${classes.burger__line} ${classes.burger__line_color_white} ${classes['menu-open']}`}></span>
        </button>
    );
};

export default BurgerBtn;
