import React, {useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import {ReactComponent as MaleIcon} from "./male.svg";
import {ReactComponent as FemaleIcon} from "./female.svg";
import loader from "./loader.gif";
import PrimaryBtn from "../../components/PrimaryBtn";
import Status from "../../components/Status";
import Input from "../../components/Input";
import GenderSelect from "../../components/GenderSelect";
import Modal from "../../components/Modal";
import {StoreContext} from "../../store";
import moment from "moment";
import {observer} from "mobx-react";
import {Controller, useForm} from "react-hook-form";

const Users = () => {
    const ctx = useContext(StoreContext);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await ctx.UserStore.fetch();
        };

        fetchData();
    }, []);
    const blockUser = (user_id) => {
        ctx.UserStore.block(user_id);
    }

    const unBlockUser = (user_id) => {
        ctx.UserStore.unblock(user_id);
    }
    const [user, setUser] = useState(null);
    const addNewUser = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    const {
        control,
        reset,
        handleSubmit,
        formState: {isValid, isDirty}
    } = useForm({
        mode: "onChange",
    })

    const submit = async (data) => {
        await ctx.UserStore.add(data);
        reset();
        setShowModal(false);
    }

    return (
        <div className={classes.users}>
            <div className={classes.header}>
                <h3 className={classes.title}>Пользователи</h3>
                <PrimaryBtn colorState={true} onClick={() => {
                    setShowModal(true)
                }}>Добавить игрока</PrimaryBtn>
            </div>
            <div className={classes.list}>
                {ctx.UserStore?.users.map(user =>
                    <div key={user.user_id} className={classes.user}>
                        <div className={classes.user__field}>{user.first_name} {user.sur_name}</div>
                        <div className={classes.user__field}>{user.age}</div>
                        <div className={classes.user__field}>
                            {
                                user.gender ? <MaleIcon className={classes.icon}/> :
                                    <FemaleIcon className={classes.icon}/>
                            }
                        </div>
                        <div className={`${classes.user__field} ${classes.status}`}><Status isBlock={!user.status}/>
                        </div>
                        <div className={classes.user__field}>{moment(user.created_at).format('DD.MM.YY-HH:mm:ss')}</div>
                        <div className={classes.user__field}>{moment(user.updated_at).format('DD.MM.YY-HH:mm:ss')}</div>
                        <div className={`${classes.user__field} ${classes.user__btn__block}`}>
                            {
                                !user.status ? <PrimaryBtn onClick={() => {
                                    unBlockUser(user.user_id)
                                }}>Unblock</PrimaryBtn> : <PrimaryBtn onClick={() => {
                                    blockUser(user.user_id)
                                }}>Block</PrimaryBtn>
                            }
                        </div>
                    </div>
                ) || <img src={loader}/>}
            </div>
            {
                showModal ?
                    <Modal setShowModal={setShowModal} title="Добавить пользователя">
                        <form method="post" onSubmit={handleSubmit(submit)}>
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
                            <PrimaryBtn disabled={!isValid || !isDirty}>Добавить</PrimaryBtn>
                        </form>
                    </Modal>
                    : null
            }
        </div>
    );
};

export default observer(Users);
