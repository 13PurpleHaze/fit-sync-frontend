import React, {useContext, useEffect, useState} from "react";
import classes from "./style.module.css"
import PrimaryBtn from "../../components/PrimaryBtn";
import ExsResultInput from "../../components/ExsResultInput";
import TextArea from "../../components/TextArea";
import Modal from "../../components/Modal";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";
import {formatDistance} from "date-fns";
import {ru} from "date-fns/locale";
import LoaderIcon from "./loader.gif";
import {useNavigate, useParams} from "react-router-dom";

const Session = () => {
    const [showChat, setShowChat] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const ctx = useContext(StoreContext);

    const [text, setText] = useState('');
    const submit = () => {
        if (text) {
            ctx.SessionStore.send(text);
        }
        setText('');
    }

    const convertDate = (createdAt) => {
        return formatDistance(new Date(createdAt), new Date(), {locale: ru});
    }

    return (
        <>
            <div className={classes['workout-wrapper']}>
                <div className={classes['workout-main']}>
                    <div className={classes.workout}>
                        <h3 className='title'>{ctx.SessionStore?.session?.workout?.title}</h3>
                        <form method='post' className={classes.workout__content}>
                            <div className={classes.exercises}>
                                {ctx.SessionStore?.session?.workout?.exercises.map(exercise =>
                                    <div className={classes.exercise} key={exercise.exercise_id}>
                                        <img className={classes.exercise__img}
                                             src={exercise.img} alt=''/>
                                        <label
                                            className={classes.exercise__text}>{exercise.title} {exercise.reps} {exercise.is_static ? 'с.' : 'р.'}</label>
                                        <ExsResultInput
                                            disabled={!ctx.SessionStore.isStarted || ctx.SessionStore.isFinished}
                                            onChange={(e) => {
                                                ctx.SessionStore.doExs(e.target.value, exercise.exercise_id)
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <PrimaryBtn
                                isRed={true}
                                disabled={!ctx.SessionStore.isStarted || ctx.SessionStore.isFinished}
                                onClick={() => {
                                    ctx.SessionStore.finish()
                                }}
                            >Закончить</PrimaryBtn>
                        </form>
                    </div>
                    <div className={classes.players}>
                        <h3 className='title'>Команда</h3>
                        <div className={classes.players__list}>
                            <div className={classes.player}>
                                <div className={classes.player__name}>Добавить нового (до 5 чел.)</div>
                                <button className={classes['plus-icon']}
                                        disabled={ctx.SessionStore?.session?.users.length >= 5} onClick={() => {
                                    setShowModal(true)
                                }}/>
                            </div>
                            {
                                ctx.SessionStore?.session?.users.map(user =>
                                    <div className={classes.player}>
                                        <div className={classes.player__name}>{user.login}</div>
                                        <div className={classes.player__results}>
                                            {user.results.map((result) =>
                                                <div id={Object.keys(result)[0]}>{Object.values(result)[0]}</div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className={classes.start}>
                            <PrimaryBtn
                                isRed={true}
                                disabled={!(!ctx.SessionStore.isStarted && !ctx.SessionStore.isFinished)}
                                onClick={() => {
                                    ctx.SessionStore.start()
                                }}
                            >Начать тренировку</PrimaryBtn>
                        </div>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={showChat ? `${classes.chat__header} ${classes.active}` : `${classes.chat__header}`}>
                        <h3 className='text text-white'>Chat</h3>
                        <div className={classes.chat__minimize} onClick={() => {
                            setShowChat(!showChat)
                        }}></div>
                    </div>
                    <div className={showChat ? `${classes.chat__body} ${classes.active}` : `${classes.chat__body}`}>
                        <div className={classes.messages}>
                            {ctx.SessionStore?.messages.map(msg =>
                                <div
                                    className={msg.user_id === ctx.AuthStore.user.user_id ? `${classes.message} ${classes.me}` : `${classes.message} ${classes.other}`}>
                                    <div className={classes['message-info']}>
                                        <div className={classes.message__name}>{msg.user.login}</div>
                                        <div className={classes.message__date}>{convertDate(msg.created_at)}</div>
                                    </div>
                                    <div className={classes.message__text}>
                                        {msg.text}
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <div className={classes.chat__input}>
                            <TextArea onChange={(e) => {
                                setText(e.target.value)
                            }} value={text} onClick={(e) => {
                                submit(e)
                            }}></TextArea>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal &&
                <Modal setShowModal={setShowModal} title='Пригласить пользователя'>
                    {!ctx.ActiveUsersStore.invitation &&
                        <div className={classes['active-players']}>
                            {
                                !ctx.ActiveUsersStore.users.length ?
                                    <div className='text text-white'>Нет активных пользователей</div> :
                                    ctx.ActiveUsersStore.users.map(user =>
                                        <div className={classes['active-player']} key={user.userId}>
                                            <div className='text text-white'>{user.login}</div>
                                            <PrimaryBtn onClick={() => {
                                                ctx.ActiveUsersStore.invite(ctx.SessionStore.session, user)
                                                setShowModal(false);
                                            }}>Пригласить</PrimaryBtn>
                                        </div>
                                    )
                            }
                        </div>
                    }
                </Modal>
            }

            {
                ctx.ActiveUsersStore?.awaitTimeout &&
                <div className={classes['modal-wrapper']}>
                    <div className={classes.modal}>
                        <img src={LoaderIcon} alt='' className={classes.loader}/>
                    </div>
                </div>
            }
        </>
    )
        ;
};

export default observer(Session);
