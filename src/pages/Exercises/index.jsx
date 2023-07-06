import React, {useContext, useEffect, useState} from 'react';
import classes from "./style.module.css";
import PrimaryBtn from "../../components/PrimaryBtn";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {ReactComponent as DeleteIcon} from "./delete.svg";
import {ReactComponent as EditIcon} from "./edit.svg";
import ExsTypeSelect from "../../components/ExsTypeSelect";
import FileInput from "../../components/FileInput";
import {Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {observer} from "mobx-react";
import {StoreContext} from "../../store";
import moment from "moment";

const Exercises = () => {
    const ctx = useContext(StoreContext);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        ctx.ExerciseStore.get();
    }, []);

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid , isDirty},
    } = useForm({
        mode: 'onChange',
    })
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data['title']);
        formData.append('is_static', data['is_static']);
        formData.append('file', data['file']);
        await ctx.ExerciseStore.add(formData);
        reset();
        setShowModal(false);
    }

    return (
        <div className={classes.exercises}>
            <div className={classes.header}>
                <h3 className={classes.title}>Упражнения</h3>
                <PrimaryBtn colorState={true} onClick={() => {
                    setShowModal(true)
                }}>Добавить упражнение</PrimaryBtn>
            </div>
            <table className="table">
                <tr className="table__row">
                    <th className="table__ceil text-bold">Название</th>
                    <th className="table__ceil text-bold">Тип</th>
                    <th className="table__ceil text-bold">Иконка</th>
                    <th className="table__ceil text-bold">Дата создания</th>
                    <th className="table__ceil text-bold">Дата обновления</th>
                    <th className="table__ceil text-bold">Изменить</th>
                    <th className="table__ceil text-bold">Удалить</th>
                </tr>
                {ctx.ExerciseStore?.exercises.map(exs =>
                    <tr key={exs.id} className="table__row">
                        <td className="table__ceil">{exs.title}</td>
                        <td className="table__ceil">{exs.is_static ? 'Статическое' : 'Динамичесское'}</td>
                        <td className="table__ceil"><img src={`http://localhost:8080/api/storage/${exs.img}`} alt="" className={classes.exercise__icon}/></td>
                        <td className="table__ceil">{moment(exs.created_at).format('DD.MM.YY-HH:mm:ss')}</td>
                        <td className="table__ceil">{moment(exs.updated_at).format('DD.MM.YY-HH:mm:ss')}</td>
                        <td className="table__ceil"><Link to={`/exercises/${exs.exercise_id}`}><EditIcon className={classes.action__icon} onClick={() => {}}/></Link></td>
                        <td className="table__ceil"><DeleteIcon className={classes.action__icon} onClick={() => {ctx.ExerciseStore.delete(exs.exercise_id)}}/></td>
                    </tr>
                )}
            </table>
            {
                showModal ?
                    <Modal title="Добавить упражнение" setShowModal={setShowModal}>
                        <form method="post" onSubmit={handleSubmit(submit)}>
                            <div>
                                <Controller
                                    name="title"
                                    control={control}
                                    rules={{
                                        required: 'Это поле обязательно',
                                        validate: {
                                            validCharacters: (value) =>
                                                (/^[А-Яа-яA-Za-z_]+$/).test(value) ||
                                                'Только символы кириллицы, латиницы и нижнее подчеркивание разрешены',
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
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
                                    name='is_static'
                                    control={control}
                                    defaultValue={true}
                                    render={({field, fieldState}) => (
                                        <ExsTypeSelect {...field}/>
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name='file'
                                    control={control}
                                    rules={{
                                        required: 'Это поле обязательно',
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
                                            oldFileUrl={null}
                                            setNewFile={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                            <PrimaryBtn disabled={!isValid || !isDirty}>Добавить</PrimaryBtn>
                        </form>
                    </Modal> : null
            }
        </div>
    );
};

export default observer(Exercises);
