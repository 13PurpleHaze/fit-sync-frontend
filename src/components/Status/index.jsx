import React from "react";
import classes from "./style.module.css";

const Status = ({isBlock}) => {
    return (
        <>
            {
                isBlock
                    ? <div className={classes.block}>заблокирован</div>
                    : <div className={classes.active}>активен</div>
            }
        </>
    );
};

export default Status;
