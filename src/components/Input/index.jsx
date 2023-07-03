import React from 'react';
import classes from "./style.module.css";

const Index = ({error, ...props}) => {
    return (
        <>
            {
                error
                    ? <>
                        <input {...props} className={`${classes.input} ${classes.error}`}/>
                        <span className={classes.error}>{error}</span>
                      </>
                    : <input {...props} className={classes.input}/>
            }
        </>
    );
};

export default Index;