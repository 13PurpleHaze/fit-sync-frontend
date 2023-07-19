import React from 'react';
import classes from './style.module.css';
import {ReactComponent as SendIcon} from "./send.svg";

const TextArea = ({onClick, children, ...props}) => {
    return (
        <>
            <textarea {...props} className={classes['chat-textarea']}>{children}</textarea>
            <SendIcon className={classes['send-icon']} onClick={onClick}/>
        </>
    );
};

export default TextArea;
