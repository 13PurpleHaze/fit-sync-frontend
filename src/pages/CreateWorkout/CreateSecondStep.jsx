import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../store";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import PrimaryBtn from "../../components/PrimaryBtn";

const CreateSecondStep = () => {
    const ctx = useContext(StoreContext);
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if(!ctx.WorkoutStore?.workout?.exercises) {
            navigate('/');
        }
        const fetch = async () => {
            const exercises = await Promise.all(
                ctx.WorkoutStore?.workout?.exercises.map(async exerciseId => {
                    return await (await ctx.ExerciseStore.find(exerciseId)).data
                })
            )
            setExercises(exercises);
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
        mode: 'onChange',
    })

    const submit = async (data) => {
        ctx.WorkoutStore.addWorkout({...ctx.WorkoutStore.workout, exercises: data});
        await ctx.WorkoutStore.add(ctx.WorkoutStore.workout);
        reset();
        navigate('/workout');
    }

    return (
        <div className='card'>
            <div className='card__header'>
                <h3 className='title text-white'>Создать тренировку</h3>
            </div>
            <form method='post' onSubmit={handleSubmit(submit)} className='card__content'>
                {exercises.length && exercises.map(exercise =>
                    <div key={exercise.exercise_id}>
                        <label className='text text-white'>{exercise.title}</label>
                        <Controller
                            name={exercise.exercise_id}
                            control={control}
                            defaultValue=''
                            render={({field: {ref, ...rest}, fieldState}) => (
                                <Input
                                    error={fieldState.error?.message}
                                    {...rest}
                                    placeholder={exercise.is_static ? 'Количество секунд' : 'Количество повторений'}
                                />
                            )}
                        />
                    </div>
                )}
                <PrimaryBtn isRed={false} disabled={!isValid || !isDirty}>Создать</PrimaryBtn>
            </form>
        </div>
    );
};

export default CreateSecondStep;
