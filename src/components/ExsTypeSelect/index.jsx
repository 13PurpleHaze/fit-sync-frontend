import React from 'react';
import classes from './style.module.css';

const ExsTypeSelect = ({value, ...props}) => {
    return (
        <select name="type" className={classes.select} {...props}>
            <option value={true} className={classes.option} selected={value}>Статическое</option>
            <option value={false} className={classes.option} selected={!value}>Динамическое</option>
        </select>
    );
};

export default ExsTypeSelect;