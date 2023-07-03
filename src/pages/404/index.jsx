import React from 'react';
import classes from './style.module.css';
import PrimaryBtn from "../../components/PrimaryBtn";
import {Link} from "react-router-dom";

const Error404 = () => {
    return (
        <div className={classes.error}>
            <h3 className={classes.error__title}>Упс...</h3>
            <div className={classes.error__subtitle}>Такой страницы не существует</div>
            <Link to="/users"><PrimaryBtn colorState={true}>Вернуться на главную</PrimaryBtn></Link>
        </div>
    );
};

export default Error404;