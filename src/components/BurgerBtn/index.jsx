import React from 'react';
import classes from './style.module.css';

const BurgerBtn = ({colorState , props}) => {
    return (
        <button className={colorState ? `${classes.burger} ${classes.burger_color_red}` : `${classes.burger} ${classes.burger_color_black}`}>
            <span className={classes.burger__line}></span>
            <span className={classes.burger__line}></span>
        </button>
    );
};

export default BurgerBtn;