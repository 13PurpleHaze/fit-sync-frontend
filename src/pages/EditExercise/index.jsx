import React, {useContext, useEffect, useState} from 'react';
import Input from "../../components/Input";
import ExsTypeSelect from "../../components/ExsTypeSelect";
import FileInput from "../../components/FileInput";
import PrimaryBtn from "../../components/PrimaryBtn";
import {StoreContext} from "../../store";
import {useNavigate, useParams} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";

const EditExercises = () => {
    const ctx = useContext(StoreContext);
    const {id} = useParams();
    const [exercise, setExercise] = useState(null);
    useEffect(() => {
        ctx.ExerciseStore.find(id).then((res) => {
            setExercise(res.data)
            console.log(res.data)
        });
    }, []);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: {isValid, isDirty},
    } = useForm({
        mode: "onChange",
        defaultValues: {
            is_static: exercise?.is_static,
            title: exercise?.title,
        },
    });

    const submit = async (data) => {
        data.exercise_id = id;
        const formData = new FormData();
        for (let key in data) {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        }
        await ctx.ExerciseStore.update(formData.get('exercise_id'), formData);
        navigate('/exercises');
    }

    return (
        <div className="card">
            <div className="card__header">
                <h3 className="title text-white">Упражнение #{exercise?.exercise_id}</h3>
            </div>
            {
                exercise
                    ?
                    <form method="post" onSubmit={handleSubmit(submit)} className="card__content">
                        <div>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue={exercise.title}
                                rules={{
                                    required: 'Это поле обязательно',
                                    validate: {
                                        validCharacters: (value) =>
                                            (/^[А-Яа-яA-Za-z_]+$/).test(value) ||
                                            'Только символы кириллицы, латиницы и нижнее подчеркивание разрешены',
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
                        <div>
                            <Controller
                                name="is_static"
                                control={control}
                                defaultValue={exercise.is_static}
                                render={({field}) => (
                                    <ExsTypeSelect {...field}/>
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="img"
                                control={control}
                                rules={{
                                    validate: {
                                        fileSize: (value) =>
                                            !value || (value.size <= 5000000) || 'Размер файла не должен превышать 5 МБ',
                                        fileType: (value) => {
                                            if (!value) return true;

                                            const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
                                            return (
                                                acceptedFileTypes.includes(value.type) ||
                                                'Допустимые типы файлов: JPEG, PNG, SVG'
                                            );
                                        },
                                    },
                                }}
                                render={({field, fieldState}) => (
                                    <FileInput
                                        {...field}
                                        error={fieldState.error}
                                        oldFileUrl={exercise.img}
                                        setNewFile={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <PrimaryBtn disabled={!isValid || !isDirty}>Изменить</PrimaryBtn>
                    </form>
                    : null
            }
        </div>
    );
};

export default EditExercises;
