import React, {useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import {StoreContext} from "../../store";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import PrimaryBtn from "../../components/PrimaryBtn";

const SecondStep = () => {
    const ctx = useContext(StoreContext);
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if(!ctx.WorkoutStore?.workout?.exercises) {
            navigate("/");
        }
        const fetch = async () => {
            const exercises = await Promise.all(
                ctx.WorkoutStore?.workout?.exercises.map(async exerciseId => {
                    console.log(exerciseId);
                    return await (await ctx.ExerciseStore.find(exerciseId)).data
                })
            )
            setExercises(exercises);
            console.log(exercises)
        }
        if(ctx.WorkoutStore?.workout) {
            fetch();
        }
    }, []);

    const {
        handleSubmit,
        control,
        reset,
        formState: {isValid, isDirty}
    } = useForm({
        mode: "onChange",
    })

    const submit = async (data) => {
        ctx.WorkoutStore.addWorkout({...ctx.WorkoutStore.workout, exercises: data});
        await ctx.WorkoutStore.add(ctx.WorkoutStore.workout);
        reset();
        navigate("/workout");
    }

    return (
        <div className={classes['create-workout']}>
            <div className={classes["create-workout__info"]}>
                <h3 className={classes['create-workout__title']}>Создать тренировку</h3>
            </div>
            <form method="post" onSubmit={handleSubmit(submit)} className={classes['create-workout__form']}>
                {exercises.length && exercises.map(exercise =>
                    <div>
                        <label className="text text-white">{exercise.title}</label>
                        <Controller
                            name={exercise.exercise_id}
                            control={control}
                            render={({field, fieldState}) => (
                                <Input
                                    error={fieldState.error?.message}
                                    {...field}
                                    placeholder={exercise.is_static ? 'Количество секунд' : "Количество повторений"}
                                />
                            )}
                        />
                    </div>
                )}
                <PrimaryBtn colorState={false} disabled={!isValid || !isDirty}>Создать</PrimaryBtn>
            </form>
        </div>
    );
};

export default SecondStep;
