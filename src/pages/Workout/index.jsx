import React, {useState} from 'react';
import classes from './style.module.css'
import PrimaryBtn from "../../components/PrimaryBtn";
import ExsResultInput from "../../components/ExsResultInput";
import TextArea from "../../components/TextArea";
import {ReactComponent as SendIcon} from './send.svg';
import Input from "../../components/Input";
import Modal from "../../components/Modal";

const Workout = () => {
    const [workout, setWorkout] = useState({
        id: 1,
        title: 'Новая тренировка',
        exercises: [
            {
                id: 32,
                title: 'Отжмания',
                url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
                isStatic: false,
                createdAt: '2009-12-12',
                updatedAt: '2009-12-12',
            },
            {
                id: 2,
                title: 'Отжмания',
                url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
                isStatic: false,
                createdAt: '2009-12-12',
                updatedAt: '2009-12-12',
            },
            {
                id: 12,
                title: 'Отжмания',
                url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
                isStatic: false,
                createdAt: '2009-12-12',
                updatedAt: '2009-12-12',
            },
            {
                id: 11,
                title: 'Подтягивания в висе на одной руке',
                url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
                isStatic: false,
                createdAt: '2009-12-12',
                updatedAt: '2009-12-12',
            },
            {
                id: 19,
                title: 'Отжмания',
                url: 'https://icon-library.com/images/pull-up-icon/pull-up-icon-29.jpg',
                isStatic: false,
                createdAt: '2009-12-12',
                updatedAt: '2009-12-12',
            }
        ],
        createdAt: '2009-12-12',
        updatedAt: '2009-12-12',
    });
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className={classes['workout-wrapper']}>
                <div className={classes['workout-main']}>
                    <div className={classes.workout}>
                        <h3 className="title">{workout.title}</h3>
                        <form method="post" className={classes.workout__content}>
                            <div className={classes.exercises}>
                                {workout.exercises.map(exs =>
                                    <div className={classes.exercise}>
                                        <img className={classes.exercise__img} src={exs.url} alt=""/>
                                        <label
                                            className={classes.exercise__text}>{exs.title} 28 {exs.isStatic ? 'с.' : 'р.'}</label>
                                        <ExsResultInput/>
                                    </div>
                                )}
                            </div>
                            <PrimaryBtn colorState={true}>Закончить</PrimaryBtn>
                        </form>
                    </div>
                    <div className={classes.players}>
                        <h3 className="title">Команда</h3>
                        <div className={classes.players__list}>
                            <div className={classes.player}>
                                <div className={classes.player__name}>Добавить нового</div>
                                <button className={classes['plus-icon']} onClick={() => {
                                    setShowModal(true)
                                }}/>
                            </div>
                            <div className={classes.player}>
                                <div className={classes.player__name}>Ivan</div>
                                <div className={classes.player__results}>
                                    <span>1</span>
                                    <span>12</span>
                                    <span>13</span>
                                    <span>14</span>
                                    <span>15</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.start}>
                            <PrimaryBtn colorState={true}>Начать тренировку</PrimaryBtn>
                        </div>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.messages}>
                        <div className={`${classes.message} ${classes.me}`}>
                            <div className={classes['message-info']}>
                                <div className={classes.message__name}>Linor234</div>
                                <div className={classes.message__date}>12:22</div>
                            </div>
                            <div
                                className={classes.message__text}>Привdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffет
                            </div>
                        </div>
                        <div className={`${classes.message} ${classes.other}`}>
                            <div className={classes['message-info']}>
                                <div className={classes.message__name}>Linor234</div>
                                <div className={classes.message__date}>12:22</div>
                            </div>
                            <div
                                className={classes.message__text}>Привdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffет
                            </div>
                        </div>
                        <div className={`${classes.message} ${classes.me}`}>
                            <div className={classes['message-info']}>
                                <div className={classes.message__name}>Linor234</div>
                                <div className={classes.message__date}>12:22</div>
                            </div>
                            <div
                                className={classes.message__text}>Привdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffет
                            </div>
                        </div>
                        <div className={`${classes.message} ${classes.other}`}>
                            <div className={classes['message-info']}>
                                <div className={classes.message__name}>Linor234</div>
                                <div className={classes.message__date}>12:22</div>
                            </div>
                            <div
                                className={classes.message__text}>Привdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffет
                            </div>
                        </div>
                    </div>
                    <div className={classes.chat__input}>
                        <Input/>
                        <SendIcon className={classes.chat__icon}/>
                    </div>
                </div>
            </div>
            {
                showModal
                    ?
                    <Modal setShowModal={setShowModal} title="Пригласить пользователя">
                        <div className={classes['active-players']}>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                            <div className={classes['active-player']}>
                                <div className="text">Имя</div>
                                <PrimaryBtn>Пригласить</PrimaryBtn>
                            </div>
                        </div>
                    </Modal>
                    : null
            }
        </>
    )
        ;
};

export default Workout;