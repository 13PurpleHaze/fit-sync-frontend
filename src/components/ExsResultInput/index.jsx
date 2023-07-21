import React from "react";
import classes from "./style.module.css";

const ExsResultInput = (props) => {
    const validate = (e) => {
        const allowedKeys = /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Home|End/;
        if (!e.key.match(allowedKeys)) {
            e.preventDefault();
        }
    }
    return (
        <input onKeyPress={validate} type='text' {...props} className={classes['esx-result-input']}/>
    );
};

export default ExsResultInput;
