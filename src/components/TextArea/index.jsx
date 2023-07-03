import React from 'react';
import classes from './style.module.css';

const TextArea = ({children, ...props}) => {
    return (
        <textarea {...props} className={classes['chat-textarea']}>{children}</textarea>
    );
};

export default TextArea;