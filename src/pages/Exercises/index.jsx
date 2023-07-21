import React, {useContext, useMemo, useState} from "react";
import classes from "./style.module.css";
import PrimaryBtn from "../../components/PrimaryBtn";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import {ReactComponent as DeleteIcon} from "./delete.svg";
import {ReactComponent as EditIcon} from "./edit.svg";
import FileInput from "../../components/FileInput";
import {Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {observer} from "mobx-react";
import {StoreContext} from "../../store";
import Pagination from "../../components/Pagination";
import Select from "../../components/Select";
import {format} from "date-fns";

const Exercises = () => {
    const ctx = useContext(StoreContext);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useMemo(() => {
        ctx.ExerciseStore.fetch({limit, page: currentPage});
    }, [currentPage]);

    const {
        control,
        handleSubmit,
        reset,
        formState: {isValid, isDirty},
    } = useForm({
        mode: 'onChange',
    })
    const submit = async (data) => {
        const formData = new FormData();
        formData.append('title', data['title']);
        formData.append('is_static', data['is_static']);
        formData.append('img', data['img']);
        reset();
        setShowModal(false);
        await ctx.ExerciseStore.add(formData);
    }

    return (
        <div className={classes.exercises}>
            <div className={classes.exercises__header}>
                <h3 className='title'>Упражнения</h3>
                <PrimaryBtn isRed={true} onClick={() => {
                    setShowModal(true)
                }}>Добавить</PrimaryBtn>
            </div>
            {!ctx.ExerciseStore?.exercises?.length ?
                <h3 className='subtitle text-center'>Упражнений нет</h3>
                : <div className='table-wrapper'>
                    <table className='table'>
                        <thead>
                        <tr className='table__row'>
                            <th className='table__ceil text-bold'>Название</th>
                            <th className='table__ceil text-bold'>Тип</th>
                            <th className='table__ceil text-bold'>Иконка</th>
                            <th className='table__ceil text-bold'>Дата создания</th>
                            <th className='table__ceil text-bold'>Дата обновления</th>
                            <th className='table__ceil text-bold'>Изменить</th>
                            <th className='table__ceil text-bold'>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ctx.ExerciseStore.exercises.map(exercise =>
                            <tr key={exercise.exercise_id} className='table__row'>
                                <td className='table__ceil'>{exercise.title}</td>
                                <td className='table__ceil'>{exercise.is_static ? 'Статическое' : 'Динамичесское'}</td>
                                <td className='table__ceil'><img src={exercise.img}
                                                                 alt=''
                                                                 className={classes.exercise__icon}/></td>
                                <td className='table__ceil'>{format(new Date(exercise.created_at), 'dd.MM.yyyy HH:mm:ss')}</td>
                                <td className='table__ceil'>{format(new Date(exercise.updated_at), 'dd.MM.yyyy HH:mm:ss')}</td>
                                <td className='table__ceil'><Link to={`/exercises/${exercise.exercise_id}`}><EditIcon
                                    className='icon'/></Link></td>
                                <td className='table__ceil'><DeleteIcon className='icon' onClick={() => {
                                    ctx.ExerciseStore.delete(exercise.exercise_id)
                                }}/></td>
                            </tr>
                        )
                        }
                        </tbody>
                    </table>
                    <Pagination onPageChange={setCurrentPage} limit={limit} currentPage={currentPage} totalCount={ctx.ExerciseStore.totalCount} siblingCount={1}/>
                </div>
            }
            {
                showModal &&
                    <Modal title='Добавить упражнение' setShowModal={setShowModal}>
                        <form method='post' onSubmit={handleSubmit(submit)}>
                            <div>
                                <Controller
                                    name='title'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Это поле обязательно',
                                        validate: {
                                            validCharacters: (value) =>
                                                (/^[А-Яа-яA-Za-z_\s]+$/).test(value) ||
                                                'Только символы кириллицы, латиницы и нижнее подчеркивание разрешены',
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
                            <div>
                                <Controller
                                    name='is_static'
                                    control={control}
                                    defaultValue={true}
                                    render={({field: {ref, ...rest}, fieldState}) => (
                                        <Select {...rest} multiple={false}>
                                            <option value={true} className='text-black'>Статическое</option>
                                            <option value={false} className='text-black'>Динамическое</option>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div>
                                <Controller
                                    name='img'
                                    control={control}
                                    defaultValue=''
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
                                    render={({field: {ref, ...rest}, fieldState}) => (
                                        <FileInput
                                            {...rest}
                                            error={fieldState.error}
                                            oldFileUrl={null}
                                            setNewFile={rest.onChange}
                                        />
                                    )}
                                />
                            </div>
                            <PrimaryBtn disabled={!isValid || !isDirty}>Добавить</PrimaryBtn>
                        </form>
                    </Modal>
            }
        </div>
    );
};

export default observer(Exercises);
