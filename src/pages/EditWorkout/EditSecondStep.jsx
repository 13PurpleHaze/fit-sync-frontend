import React, {useContext, useEffect, useState} from 'react';
import classes from "../CreateWorkout/style.module.css";
import {StoreContext} from "../../store";
import {Navigate, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import PrimaryBtn from "../../components/PrimaryBtn";
import {observer} from "mobx-react";

const EditSecondStep = () => {
    const ctx = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!ctx.WorkoutStore?.workout?.exercises) {
            navigate("/");
        }
    },[])
    const {
        handleSubmit,
        control,
        reset,
        formState: {isValid}
    } = useForm({
        mode: "onChange",
    })

    const submit = async (data) => {
        await ctx.WorkoutStore.update(ctx.WorkoutStore.workout.workout_id, {...ctx.WorkoutStore.workout, exercises: data});
        reset();
        navigate("/workout");
        //await  ctx.WorkoutStore.addWorkout(null);
    }

    return (
        <div className={classes['create-workout']}>
            <div className={classes["create-workout__info"]}>
                <h3 className={classes['create-workout__title']}>Обновить тренировку</h3>
            </div>
            <form method="post" onSubmit={handleSubmit(submit)} className={classes['create-workout__form']}>
                {ctx.WorkoutStore?.workout?.exercises ? ctx.WorkoutStore.workout.exercises.map((exercise, index) =>
                    <div>
                        <label className="text text-white">{exercise.title}</label>
                        <Controller
                            name={String(exercise.exercise_id)}
                            control={control}
                            defaultValue={exercise?.reps || 0}
                            render={({field, fieldState}) => (
                                <Input
                                    error={fieldState.error?.message}
                                    {...field}
                                    placeholder={exercise.is_static ? 'Количество секунд' : "Количество повторений"}
                                />
                            )}
                        />
                    </div>
                ) : <Navigate to="/workouts"/>}
                <PrimaryBtn isRed={false} disabled={!isValid}>Обновить</PrimaryBtn>
            </form>
        </div>
    );
};

export default observer(EditSecondStep);
