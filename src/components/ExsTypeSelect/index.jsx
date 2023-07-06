import React from 'react';
import classes from './style.module.css';

const ExsTypeSelect = ({value = false, ...props}) => {
    return (
        <select name="type" className={classes.select} {...props} value={value.toString()}>
            <option value={true} className={classes.option} >Статическое</option>
            <option value={false} className={classes.option} >Динамическое</option>
        </select>
    );
};

export default ExsTypeSelect;
