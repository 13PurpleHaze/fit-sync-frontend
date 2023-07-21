import React, {useContext, useEffect} from "react";
import classes from "../CreateWorkout/style.module.css";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PrimaryBtn from "../../components/PrimaryBtn";
import {StoreContext} from "../../store";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react";

const EditWorkout = () => {
    const ctx = useContext(StoreContext);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        ctx.ExerciseStore.fetch({});
        ctx.WorkoutStore.find(id);
    }, [])

    const {
        handleSubmit,
        control,
        reset,
        formState: {isValid}
    } = useForm({
        mode: 'onChange',
    })

    const submit = (data) => {
        const newExercises = data.exercises.map((exerciseId) => {
            const foundExercise = ctx.WorkoutStore.workout.exercises.find(
                (exercise) => exercise.exercise_id == exerciseId
            );

            const title = ctx.ExerciseStore.exercises.find(exercise => exercise.exercise_id == exerciseId).title;
            return foundExercise
                ? { exercise_id: foundExercise.exercise_id, reps: foundExercise.reps, title: foundExercise.title }
                : { exercise_id: exerciseId, title };
        });

        ctx.WorkoutStore.addWorkout({
            ...ctx.WorkoutStore.workout,
            exercises: newExercises,
            title: data.title
        });

        navigate(`/workouts/${id}/edit/step2`);
        reset();
    }

    return (
        <div className={classes['create-workout']}>
            {ctx.WorkoutStore?.workout &&
                <>
                    <div className={classes['create-workout__info']}>
                        <h3 className={classes['create-workout__title']}>Изменить тренировку #{ctx.WorkoutStore.workout.workout_id}</h3>
                    </div>
                    <form method='post' onSubmit={handleSubmit(submit)} className={classes['create-workout__form']}>
                        <div>
                            <Controller
                                name='title'
                                control={control}
                                defaultValue={ctx.WorkoutStore.workout.title}
                                rules={{
                                    required: 'Это поле обязательно',
                                    validate: {
                                        validCharacters: (value) =>
                                            (/^[А-Яа-яA-Za-z_0-9]+$/).test(value) ||
                                            'Только символы кириллицы, латиницы, цифры и нижнее подчеркивание разрешены',
                                    },
                                }}
                                render={({field: {ref, ...rest}, fieldState}) => (
                                    <Input
                                        {...rest}
                                        error={fieldState.error?.message}
                                        placeholder='Название'
                                    />
                                )}
                            />
                        </div>
                        {ctx.ExerciseStore?.exercises
                            && <div>
                                <div className='text text-white'>Выбирите упражение(я)</div>
                                <Controller
                                    name='exercises'
                                    control={control}
                                    defaultValue={[...ctx.WorkoutStore.workout.exercises.map(exercise => exercise.exercise_id)]}
                                    rules={{
                                        required: 'Это поле обязательно',
                                        validate: {
                                            checkLenght: (value) =>
                                                (value.length <= 5) || 'Можно выбрать только 5 упражнений'
                                        }
                                    }}
                                    render={({field: {ref, ...rest}, fieldState}) => (
                                        <Select
                                            {...rest}
                                            error={fieldState.error?.message}
                                            multiple={true}
                                        >
                                            {ctx.ExerciseStore.exercises.map(exercise =>
                                                <option value={exercise.exercise_id} className='text-white'>{exercise.title}</option>
                                            )}
                                        </Select>
                                    )}
                                />
                            </div>
                        }
                        <PrimaryBtn isRed={false} disabled={!isValid}>Далее</PrimaryBtn>
                    </form>
                </>
            }
        </div>
    );
};

export default observer(EditWorkout);
