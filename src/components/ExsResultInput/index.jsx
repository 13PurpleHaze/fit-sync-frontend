import React from 'react';
import classes from './style.module.css';

const ExsResultInput = (props) => {
    return (
        <input type="text" {...props} className={classes['esx-result-input']}/>
    );
};

export default ExsResultInput;