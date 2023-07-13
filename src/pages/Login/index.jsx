import React, {useContext} from 'react';
import classes from "./style.module.css";
import {ReactComponent as LogoIcon} from "./logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import Input from "../../components/Input";
import {Controller, useForm} from "react-hook-form";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";

const Login = () => {
    const ctx = useContext(StoreContext);

    const {
        control,
        reset,
        handleSubmit,
        formState: {isValid, isDirty}
    } = useForm({
        mode: "onChange"
    });

    const submit = async (data) => {
        try {
            await ctx.AuthStore.login(data);
            reset();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className={classes.login}>
            <form method='post' className={classes.form} onSubmit={handleSubmit(submit)}>
                <div className={classes.logo}>
                    <LogoIcon/>
                </div>
                <h3 className={classes.title}>Войти</h3>
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
                <PrimaryBtn colorState={false} disabled={!isValid || !isDirty}>Войти</PrimaryBtn>
            </form>
        </div>
    );
};

export default observer(Login);
