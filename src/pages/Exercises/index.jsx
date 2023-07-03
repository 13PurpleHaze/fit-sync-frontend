import React, {useState} from 'react';
import classes from "./style.module.css";
import PrimaryBtn from "../../components/PrimaryBtn";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {ReactComponent as DeleteIcon} from "./delete.svg";
import {ReactComponent as EditIcon} from "./edit.svg";
import ExsTypeSelect from "../../components/ExsTypeSelect";
import FileInput from "../../components/FileInput";
import {Link} from "react-router-dom";

const Exercises = () => {
    /*
    * состояние exersice - это новое упражнение
    * состояние editExs - это то, которое мы изменяем
    * */
    const [exercises, setExercises] = useState([
        {
            id: 1,
            title: 'Отжимания',
            url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 2,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 3,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 4,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 5,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 6,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 7,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 8,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 9,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        },
        {
            id: 10,
            title: 'Отжимания',
            url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
            isStatic: true,
            createdAt: '2009-12-12',
            updatedAt: '2009-12-12',
        }
    ]);
    const addNewExs = (e) => {
        e.preventDefault();
        setShowModal(false);
        setExercises([...exercises, exercise]);
    }
    const deleteExercise = (exs) => {;
        setExercises(exercises.filter(exercise => exercise.id !== exs.id));
    }
    const [showModal, setShowModal] = useState(false);
    const [exercise, setExercise] = useState(false);
    return (
        <div className={classes.exercises}>
            <div className={classes.header}>
                <h3 className={classes.title}>Упражнения</h3>
                <PrimaryBtn colorState={true} onClick={() => {
                    setShowModal(true)
                }}>Добавить упражнение</PrimaryBtn>
            </div>
            <table className="table">
                <tr className="table__row">
                    <th className="table__ceil text-bold">Название</th>
                    <th className="table__ceil text-bold">Тип</th>
                    <th className="table__ceil text-bold">Иконка</th>
                    <th className="table__ceil text-bold">Дата создания</th>
                    <th className="table__ceil text-bold">Дата обновления</th>
                    <th className="table__ceil text-bold">Изменить</th>
                    <th className="table__ceil text-bold">Удалить</th>
                </tr>
                {exercises.map(exs =>
                    <tr key={exs.id} className="table__row">
                        <td className="table__ceil">{exs.title}</td>
                        <td className="table__ceil">{exs.isStatic ? 'статичное' : 'динамическое'}</td>
                        <td className="table__ceil"><img src={exs.url} alt="" className={classes.exercise__icon}/></td>
                        <td className="table__ceil">{exs.createdAt}</td>
                        <td className="table__ceil">{exs.updatedAt}</td>
                        <td className="table__ceil"><Link to={`/exercises/${exs.id}`}><EditIcon className={classes.action__icon} onClick={() => setExercise(exs)}/></Link></td>
                        <td className="table__ceil"><DeleteIcon className={classes.action__icon} onClick={() => {deleteExercise(exs)}}/></td>
                    </tr>
                )}
            </table>
            {
                showModal ?
                    <Modal title="Добавить упражнение" setShowModal={setShowModal}>
                        <form method="post">
                            <div>
                                <Input placeholder="Название" value={exercise?.title} onChange={(e) => {setExercise({...exercise, title: e.target.value})}}/>
                            </div>
                            <div>
                                <ExsTypeSelect onSelect={(e) => {setExercise({...exercise, isStatic: e.target.value})}}/>
                            </div>
                            <div>
                                <FileInput value={null} setNewFile={(link) => {setExercise({...exercise, url: link})}}/>
                            </div>
                            <PrimaryBtn onClick={(e) => {addNewExs(e)}}>Добавить</PrimaryBtn>
                        </form>
                    </Modal> : null
            }
        </div>
    );
};

export default Exercises;