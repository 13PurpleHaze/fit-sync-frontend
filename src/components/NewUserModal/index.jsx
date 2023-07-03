import React, {useEffect, useRef} from 'react';
import classes from "./style.module.css";
import Input from "../Input";
import GenderSelect from "../GenderSelect";
import PrimaryBtn from "../PrimaryBtn";

const NewUserModal = ({setShowModal}) => {
    return (
        <div className={classes.wrapper} onClick={(e) => {setShowModal(false)}}>
            <div className={classes.modal} onClick={e => e.stopPropagation()}>
                <div className={classes.header}>
                    <h3 className={classes.title}>Добавить пользователя</h3>
                    <button className={classes.close} onClick={() => {setShowModal(false)}}></button>
                </div>
                <div className={classes.content}>
                    <form method="post">
                        <div>
                            <Input placeholder="Имя" />
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
                        <PrimaryBtn>Добавить</PrimaryBtn>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewUserModal;