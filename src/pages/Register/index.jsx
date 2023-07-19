import React, {useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import {ReactComponent as LogoIcon} from "./logo.svg";
import Input from "../../components/Input";
import PrimaryBtn from "../../components/PrimaryBtn";
import GenderSelect from "../../components/GenderSelect";
import {Controller, useForm} from "react-hook-form";
import {StoreContext} from "../../store";
import {Link} from "react-router-dom";

const Register = () => {
    const ctx = useContext(StoreContext);
    const {
        control,
        reset,
        handleSubmit,
        formState: {isValid, isDirty}
    } = useForm({
        mode: "onChange",
    })

    const submit = async (data) => {
        try {
            await ctx.AuthStore.register(data);
            reset();
        } catch (error) {
            ctx.ErrorStore.setError(error);
        }
    }

    return (
        <div className={classes.register}>
            <form method='post' className={classes.form} onSubmit={handleSubmit(submit)}>
                <div className={classes.logo}>
                    <LogoIcon/>
                </div>
                <h3 className="title text-white">Регистрация</h3>
                <div>
                    <Controller
                        name="first_name"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[А-Яа-яA-Za-z_\s]+$/).test(value) ||
                                    'Только символы кириллицы, латиницы и нижнее подчеркивание разрешены',
                            },
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                error={fieldState.error?.message}
                                placeholder="Имя"
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="sur_name"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[А-Яа-яA-Za-z_\s]+$/).test(value) ||
                                    'Только символы кириллицы, латиницы и нижнее подчеркивание разрешены',
                            },
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                error={fieldState.error?.message}
                                placeholder="Фамилия"
                            />
                        )}
                    />
                </div>
                <div className={classes['form-group']}>
                    <Controller
                        name="age"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[0-9]+$/).test(value) ||
                                    'Только целые числа разрешены',
                            },
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                error={fieldState.error?.message}
                                placeholder="Возраст"
                            />
                        )}/>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                        }}
                        render={({field, fieldState}) => (
                            <GenderSelect
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="login"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[А-Яа-яA-Za-z_0-9\s]+$/).test(value) ||
                                    'Только символы кириллицы, латиницы, цифры и нижнее подчеркивание разрешены',
                            },
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                error={fieldState.error?.message}
                                placeholder="Логин"
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                placeholder="Пароль"
                                type="password"
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className="text text-white text-center">Уже есть аккаунт? <div><Link to="/login" className="text text-white">Войти</Link></div></div>
                <PrimaryBtn disabled={!isValid || !isDirty}>Зарегистрироваться</PrimaryBtn>
            </form>
        </div>
    );
};

export default Register;
