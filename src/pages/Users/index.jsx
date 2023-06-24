import React, {useState} from 'react';
import classes from "./style.module.css";
import {ReactComponent as MaleIcon} from "./male.svg";
import {ReactComponent as FemaleIcon} from "./female.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import NewUserModal from "../../components/NewUserModal";
import Status from "../../components/Status";

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
    return (
        <div className={classes.users}>
            <div className={classes.header}>
                <h3 className={classes.title}>Пользователи</h3>
                <PrimaryBtn colorState={true} onClick={() => {setShowModal(true)}}>Добавить игрока</PrimaryBtn>
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
                        <div className={`${classes.user__field} ${classes.status}`}><Status isBlock={!user.status}/></div>
                        <div className={classes.user__field}>{user.createdAt}</div>
                        <div className={classes.user__field}>{user.updatedAt}</div>
                        <div className={`${classes.user__field} ${classes.user__btn__block}`}>
                            {
                                user.status ? <PrimaryBtn onClick={() => {changeStatus(user)}}>Block</PrimaryBtn> : <PrimaryBtn onClick={() => {changeStatus(user)}}>Unblock</PrimaryBtn>
                            }
                        </div>
                    </div>
                )}
            </div>
            {
                showModal ? <NewUserModal setShowModal={setShowModal}/> : null
            }
        </div>
    );
};

export default Users;