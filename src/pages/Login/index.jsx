import React from 'react';
import classes from "./style.module.css";
import {ReactComponent as LogoIcon} from "./logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import Input from "../../components/Input";

const Login = () => {
    return (
        <div className={classes.login}>
            <form method='post' className={classes.form}>
                <div className={classes.logo}>
                    <LogoIcon/>
                </div>
                <h3 className={classes.title}>Войти</h3>
                <div>
                    <Input placeholder="Логин"/>
                </div>
                <div>
                    <Input placeholder="Пароль"/>
                </div>
                <PrimaryBtn colorState={false}>Войти</PrimaryBtn>
            </form>
        </div>
    );
};

export default Login;