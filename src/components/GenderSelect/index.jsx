import React from 'react';
import classes from "./style.module.css";
import {ReactComponent as FemaleIcon} from "./female.svg";
import {ReactComponent as MaleIcon} from "./male.svg";

const GenderSelect = ({error}) => {
    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Пол</h3>
            <input type="radio" className={classes.radio} id="male" value={true} name="gender"/>
            <label htmlFor="male" className={classes.label}>
                <MaleIcon className={classes.icon}/>
            </label>
            <input type="radio" className={classes.radio} id="female" value={false} name="gender"/>
            <label htmlFor="female" className={classes.label}>
                <FemaleIcon className={classes.icon}/>
            </label>
        </div>
    );
};

export default GenderSelect;