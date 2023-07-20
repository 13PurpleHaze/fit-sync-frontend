import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from "./style.module.css";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";
import {format, formatDistance} from "date-fns";
import {ru} from "date-fns/locale";
import { ReactComponent as MoreIcon } from './more.svg';
import Pagination from "../../components/Pagination";

const History = () => {
    const ctx = useContext(StoreContext);
    const [currHistory, setCurrHistory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10
    useMemo(() => {
        ctx.WorkoutStore.fetchHistory({
            limit,
            page: currentPage,
        });
        console.log(ctx.WorkoutStore?.history.length)
    }, [currentPage])

    const toggleExercises = (id) => {
        if (id === currHistory) {
            setCurrHistory(null);
        } else {
            setCurrHistory(id);
        }
    }
    return (
        <div className={classes.history}>
            <div className={classes.history__header}>
                <div className="title">История тренировок</div>
            </div>
            {!ctx.WorkoutStore?.history
                ? <h3 className="subtitle text-center">Тренировок нет</h3>
                : <div className="table-wrapper">
                    <table className="table">
                        <thead>
                        <tr className="table__row">
                            <th className="table__ceil text-bold">Название</th>
                            <th className="table__ceil text-bold">Дата проведения</th>
                            <th className="table__ceil text-bold">Общее время тренировки</th>
                            <th className="table__ceil text-bold">Упражнения</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ctx.WorkoutStore?.history.map(history =>
                                <>
                                    <tr className="table__row">
                                        <td className="table__ceil">{history.title}</td>
                                        <td className="table__ceil">{format(new Date(history.date_start), 'do MMMM yyyy HH:mm', {locale: ru})}</td>
                                        <td className="table__ceil">{formatDistance(new Date(history.date_end), new Date(history.date_start), {locale: ru})}</td>

                                        <td className="table__ceil"><MoreIcon
                                            className={history.session_id === currHistory ? `${classes.action__icon} ${classes.active}` : `${classes.action__icon}`}
                                            onClick={() => toggleExercises(history.session_id)}/></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={7}>
                                            <div className={currHistory === history.session_id ? `${classes.subtable} ${classes.active}` : `${classes.subtable}`}>
                                                {history.exercises.map(exercise =>
                                                    <div  className={`table__row ${classes.exercise}`}>
                                                        <div className={classes.exercise__title}>{exercise.title}</div>
                                                        <div className="table__ceil" className={classes.exercise__icon}><img src={exercise.img} alt=""/></div>
                                                        <div className="table__ceil">
                                                            Тренировка: {exercise.workout_reps} {exercise.is_static ? ' с.' : ' р.'}
                                                        </div>
                                                        <div className="table__ceil">
                                                            Результат: {exercise.user_reps} {exercise.is_static ? ' с.' : ' р.'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                        </tbody>
                    </table>
                    <Pagination siblingCount={1} totalCount={ctx.WorkoutStore.totalCount} currentPage={currentPage} onPageChange={setCurrentPage} limit={limit}/>
                </div>
            }
        </div>
    );
};

export default observer(History);
