import React from 'react';
import classes from "./style.module.css";
import {ReactComponent as LogoIcon} from "./logo.svg";
import Input from "../../components/Input";
import PrimaryBtn from "../../components/PrimaryBtn";
import GenderSelect from "../../components/GenderSelect";

const Register = () => {
    return (
        <div className={classes.register}>
            <form method='post' className={classes.form}>
                <div className={classes.logo}>
                    <LogoIcon/>
                </div>
                <h3 className={classes.title}>Регистрация</h3>
                <div>
                    <Input placeholder="Имя"/>
                </div>
                <div>
                    <Input placeholder="Фамилия"/>
                </div>
                <div className={classes['form-group']}>
                    <Input placeholder="Возраст"/>
                    <GenderSelect/>
                </div>
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

export default Register;