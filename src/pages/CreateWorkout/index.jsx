import React, {useContext, useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PrimaryBtn from "../../components/PrimaryBtn";
import {StoreContext} from "../../store";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";

const CreateWorkout = () => {
    const ctx = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        ctx.ExerciseStore.fetch();
    }, [])

    const {
        handleSubmit,
        control,
        reset,
        formState: {isValid, isDirty}
    } = useForm({
        mode: "onChange",
    })

    const submit = (data) => {
        ctx.WorkoutStore.addWorkout(data);
        navigate('/workouts/create/step2');
        reset();
    }

    return (
        <div className="card">
            <div className="card__header">
                <h3 className="title text-white">Создать тренировку</h3>
            </div>
            <form method="post" onSubmit={handleSubmit(submit)} className="card__content">
                <div>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Это поле обязательно',
                            validate: {
                                validCharacters: (value) =>
                                    (/^[А-Яа-яA-Za-z_0-9]+$/).test(value) ||
                                    'Только символы кириллицы, латиницы, цифры и нижнее подчеркивание разрешены',
                            },
                        }}
                        render={({field, fieldState}) => (
                            <Input
                                {...field}
                                error={fieldState.error?.message}
                                placeholder="Название"
                            />
                        )}
                    />
                </div>
                {ctx.ExerciseStore?.exercises
                    ? <div>
                        <div className="text text-white">Выбирите упражение(я)</div>
                        <Controller
                            name="exercises"
                            control={control}
                            rules={{
                                required: 'Это поле обязательно',
                                validate: {
                                    checkLenght: (value) =>
                                        (value.length <= 5) || 'Можно выбрать только 5 упражнений'
                                }
                            }}
                            render={({field, fieldState}) => (
                                <Select
                                    {...field}
                                    error={fieldState.error?.message}
                                    multiple={true}
                                >
                                    {ctx.ExerciseStore.exercises.map(exercise =>
                                        <option value={exercise.exercise_id}>{exercise.title}</option>
                                    )}
                                </Select>
                            )}
                        />
                    </div>
                    : null
                }
                <PrimaryBtn colorState={false} disabled={!isValid || !isDirty}>Далее</PrimaryBtn>
            </form>
        </div>
    );
};

export default observer(CreateWorkout);
