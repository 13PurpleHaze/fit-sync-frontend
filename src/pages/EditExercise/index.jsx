import React from 'react';
import classes from "./style.module.css";
import Input from "../../components/Input";
import ExsTypeSelect from "../../components/ExsTypeSelect";
import FileInput from "../../components/FileInput";
import PrimaryBtn from "../../components/PrimaryBtn";

const EditExercises = () => {
    // dummy
    const exercise = {
        id: 11,
        title: 'Пустышка',
        url: 'https://img1.picmix.com/output/stamp/normal/3/1/1/9/2349113_b752b.png',
        isStatic: true,
        createdAt: '2002-12-12',
        updatedAt: '2002-12-12',
    }
    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Упражнение #{exercise.id}</h3>
            <form method="post" className={classes.form}>
                <div>
                    <Input placeholder="Название" value={exercise.title}/>
                </div>
                <div>
                    <ExsTypeSelect value={exercise.isStatic}/>
                </div>
                <div>
                    <FileInput value={exercise.url}/>
                </div>
                <PrimaryBtn>Изменить</PrimaryBtn>
            </form>
        </div>
    );
};

export default EditExercises;