import React from "react";
import classes from "./style.module.css";

const Select = ({error, value, children, multiple = false, ...props}) => {
    const handleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedValues = selectedOptions.map(option => option.value);
        props.onChange(selectedValues);
    };

    return (
        <>
            <select
                className={classes.select}
                {...props}
                value={value || (multiple ? [] : '')}
                multiple={multiple}
                onChange={handleChange}
            >
                {children}
            </select>
            {error && <span className={classes.errorText}>{error}</span>}
        </>
    );
};

export default Select;
