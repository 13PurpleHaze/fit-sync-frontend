import React, {useContext} from "react";
import classes from "./style.module.css";
import {ReactComponent as LogoIcon} from "./logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import Input from "../../components/Input";
import {Controller, useForm} from "react-hook-form";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

const Login = () => {
    const ctx = useContext(StoreContext);

    const {
        control,
        reset,
        handleSubmit,
        formState: {isValid, isDirty}
    } = useForm({
        mode: 'onChange'
    });

    const submit = async (data) => {
        try {
            await ctx.AuthStore.login(data['login'], data['password']);
            reset();
        } catch (error) {
            ctx.ErrorStore.setError(error);
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
                        name='login'
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[А-Яа-яA-Za-z_0-9\s]+$/).test(value) ||
                                    'Только символы кириллицы, латиницы, цифры и нижнее подчеркивание разрешены',
                            },
                        }}
                        defaultValue=''
                        render={({field: {ref, ...rest}, fieldState}) => (
                            <Input
                                {...rest}
                                error={fieldState.error?.message}
                                placeholder='Логин'
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name='password'
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                        }}
                        defaultValue=''
                        render={({field: {ref, ...rest}, fieldState}) => (
                            <Input
                                placeholder='Пароль'
                                type='password'
                                {...rest}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <div className='text text-white text-center'>Нет аккаунта? <div><Link to='/register' className='text text-white'>Зарегистрироваться</Link></div></div>
                <PrimaryBtn isRed={false} disabled={!isValid || !isDirty}>Войти</PrimaryBtn>
            </form>
        </div>
    );
};

export default observer(Login);
