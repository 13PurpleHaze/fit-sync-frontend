import React from 'react';
import classes from './style.module.css';

const Modal = ({setShowModal, title, children}) => {
    return (
        <div className={classes['modal-wrapper']} onClick={(e) => {
            setShowModal(false)
        }}>
            <div className={classes.modal} onClick={e => e.stopPropagation()}>
                <div className={classes.header}>
                    <h3 className="subtitle text-white">{title}</h3>
                    <button className={classes.close} onClick={() => {
                        setShowModal(false)
                    }}></button>
                </div>
                <div className={classes.modal__content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
