import React from "react";
import classes from "./style.module.css";

const Index = ({error, ...props}) => {
    return (
        <>
            <input {...props} className={classes.input} aria-invalid={Boolean(error)}/>
            <span className={classes.error}>{error??null}</span>
        </>
    );
};

export default Index;
