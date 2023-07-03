import React, {useState} from 'react';
import classes from "./style.module.css";
import {ReactComponent as MaleIcon} from "./male.svg";
import {ReactComponent as FemaleIcon} from "./female.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import NewUserModal from "../../components/NewUserModal";
import Status from "../../components/Status";
import Input from "../../components/Input";
import GenderSelect from "../../components/GenderSelect";
import Modal from "../../components/Modal";

const Users = () => {
    const [users, setUsers] = useState([
        {
            id: 0,
            firstName: 'Никита',
            lastName: 'Иванов',
            age: 24,
            gender: true,
            status: false,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 1,
            firstName: 'Никита',
            lastName: 'Иванов',
            age: 24,
            gender: true,
            status: false,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 2,
            firstName: 'Никита',
            lastName: 'Иванов',
            age: 24,
            gender: true,
            status: false,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 3,
            firstName: 'Никита',
            lastName: 'Иванов',
            age: 24,
            gender: true,
            status: false,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 4,
            firstName: 'Никита',
            lastName: 'Иванов',
            age: 24,
            gender: true,
            status: false,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        }
    ]);

    const [showModal, setShowModal] = useState(false);

    const changeStatus = (user) => {
        const i = users.findIndex(u => u.id === user.id);
        users[i].status = !users[i].status;
        setUsers([...users]);
    }
    const [user, setUser] = useState(null);
    const addNewUser = (e) => {
        e.preventDefault();
        setShowModal(false);
        setUsers([...users, user]);
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
                {users.map(user =>
                    <div key={user.id} className={classes.user}>
                        <div className={classes.user__field}>{user.firstName}</div>
                        <div className={classes.user__field}>{user.lastName}</div>
                        <div className={classes.user__field}>{user.age}</div>
                        <div className={classes.user__field}>
                            {
                                user.gender ? <MaleIcon className={classes.icon}/> :
                                    <FemaleIcon className={classes.icon}/>
                            }
                        </div>
                        <div className={`${classes.user__field} ${classes.status}`}><Status isBlock={!user.status}/>
                        </div>
                        <div className={classes.user__field}>{user.createdAt}</div>
                        <div className={classes.user__field}>{user.updatedAt}</div>
                        <div className={`${classes.user__field} ${classes.user__btn__block}`}>
                            {
                                user.status ? <PrimaryBtn onClick={() => {
                                    changeStatus(user)
                                }}>Block</PrimaryBtn> : <PrimaryBtn onClick={() => {
                                    changeStatus(user)
                                }}>Unblock</PrimaryBtn>
                            }
                        </div>
                    </div>
                )}
            </div>
            {
                showModal ?
                    <Modal setShowModal={setShowModal} title="Добавить пользователя">
                        <form method="post">
                            <div>
                                <Input placeholder="Имя" value={user?.firstName} onChange={(e) => {setUser({...user, firstName: e.target.value})}}/>
                            </div>
                            <div>
                                <Input placeholder="Фамилия" value={user?.surName} onChange={(e) => {setUser({...user, lastName: e.target.value})}}/>
                            </div>
                            <div className={classes['form-group']}>
                                <Input placeholder="Возраст" value={user?.age} onChange={(e) => {setUser({...user, age: e.target.value})}}/>
                                <GenderSelect value={user?.gender} onChange={(e) => {setUser({...user, gender: e.target.value})}}/>
                            </div>
                            <div>
                                <Input placeholder="Логин" value={user?.login} onChange={(e) => {setUser({...user, login: e.target.value})}}/>
                            </div>
                            <div>
                                <Input placeholder="Пароль" value={user?.password} onChange={(e) => {setUser({...user, password: e.target.value})}}/>
                            </div>
                            <PrimaryBtn onClick={(e) => {addNewUser(e)}}>Добавить</PrimaryBtn>
                        </form>
                    </Modal>
                    : null
            }
        </div>
    );
};

export default Users;