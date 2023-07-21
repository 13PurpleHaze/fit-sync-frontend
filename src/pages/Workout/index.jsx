import React, {useContext, useMemo, useState} from "react";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";
import classes from "./style.module.css";
import PrimaryBtn from "../../components/PrimaryBtn";
import {ReactComponent as EditIcon} from "./edit.svg";
import {ReactComponent as DeleteIcon} from "./delete.svg";
import {ReactComponent as MoreIcon} from "./more.svg";
import {Link} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {format} from "date-fns";

const Workout = () => {
    const ctx = useContext(StoreContext);
    const [currentWorkoutId, setCurrentWorkoutId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useMemo(() => {
        ctx.WorkoutStore.fetch({limit, page: currentPage})
    }, [currentPage]);

    const toggleExercises = (id) => {
        if (id === currentWorkoutId) {
            setCurrentWorkoutId(null);
        } else {
            setCurrentWorkoutId(id);
        }
    }

    return (
        <div className={classes.workouts}>
            <div className={classes.workouts__header}>
                <h3 className='title'>Мои тренировки</h3>
                {ctx.SessionStore?.session?.session_id && <Link to={`/session/${ctx.SessionStore?.session?.session_id}`}>
                    <PrimaryBtn isRed={false}>Текущая</PrimaryBtn>
                </Link>}
                <Link to='/workouts/create'><PrimaryBtn isRed={true}>Добавить</PrimaryBtn></Link>
            </div>
            {!ctx.WorkoutStore?.workouts?.length ?
                <h3 className='subtitle text-center'>Тренировок нет</h3>
                : <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                        <tr className='table__row'>
                            <th className='table__ceil text-bold'>Название</th>
                            <th className='table__ceil text-bold'>Дата создания</th>
                            <th className='table__ceil text-bold'>Дата обновления</th>
                            <th className='table__ceil text-bold'>Упражнения</th>
                            <th className='table__ceil text-bold'>Изменить</th>
                            <th className='table__ceil text-bold'>Удалить</th>
                            <th className='table__ceil text-bold'>Начать</th>
                        </tr>
                        </thead>
                        <tbody className={classes.workouts__body}>
                        {ctx.WorkoutStore?.workouts.map(workout =>
                            <>
                                <tr className='table__row'>
                                    <td className='table__ceil'>
                                        {workout.title}
                                    </td>
                                    <td className='table__ceil'>
                                        {format(new Date(workout.created_at), 'dd.MM.yyyy HH:mm:ss')}
                                    </td>
                                    <td className='table__ceil'>
                                        {format(new Date(workout.updated_at), 'dd.MM.yyyy HH:mm:ss')}
                                    </td>
                                    <td className='table__ceil'><MoreIcon
                                        className={workout.workout_id === currentWorkoutId ? `${classes.action__icon} ${classes.active}` : `${classes.action__icon}`}
                                        onClick={() => toggleExercises(workout.workout_id)}/></td>
                                    <td className='table__ceil'><Link
                                        to={`/workouts/${workout.workout_id}/edit`}><EditIcon
                                        className={classes.action__icon}/></Link></td>
                                    <td className='table__ceil'><DeleteIcon onClick={() => {
                                        ctx.WorkoutStore.delete(workout.workout_id)
                                    }} className={classes.action__icon}/></td>
                                    <td className='table__ceil'><PrimaryBtn onClick={() => {
                                        ctx.SessionStore.create(workout)
                                    }}>Начать</PrimaryBtn></td>
                                </tr>
                                <tr>
                                    <td colSpan={7}>
                                        <div
                                            className={currentWorkoutId === workout.workout_id ? `${classes.subtable} ${classes.active}` : `${classes.subtable}`}>
                                            {workout.exercises.map(exercise =>
                                                <div className={`table__row ${classes.exercise}`}
                                                     key={exercise.exercise_id}>
                                                    <div className={`${classes.exercise__title} text-white`}>{exercise.title}</div>
                                                    <div className='table__ceil'><img
                                                        className={classes.exercise__icon}
                                                        src={exercise.img} alt=''/>
                                                    </div>
                                                    <div className='table__ceil text-white'>
                                                        {exercise.reps} {exercise.is_static ? ' с.' : ' р.'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>

                            </>
                        )}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} onPageChange={setCurrentPage} limit={limit}
                                totalCount={ctx.WorkoutStore.totalCount} siblingCount={1}/>
                </div>

            }
        </div>
    );
};

export default observer(Workout);
