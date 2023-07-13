import React, {useContext} from 'react';
import classes from './style.module.css';
import {ReactComponent as WorkoutIcon} from './biceps.svg';
import {ReactComponent as HistoryIcon} from './history.svg';
import {ReactComponent as StatisticIcon} from './statistic.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import {ReactComponent as FooterIcon} from './blood.svg';
import {NavLink} from "react-router-dom";
import {StoreContext} from "../../store";

const DropDownMenu = ({menuOpen, setMenuOpen}) => {
    const ctx = useContext(StoreContext);

    return (
        <div
            className={menuOpen ? `${classes['drop-down-menu-wrapper']} ${classes.active}` : classes['drop-down-menu-wrapper']}>
            <div className={classes.modal__content}>
                <nav className={classes['drop-down-menu__nav']}>
                    <li className={classes.nav__item}>
                        <NavLink to="/workout" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>Тренировка</NavLink>
                        <div className={classes.link__img}>
                            <WorkoutIcon/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <NavLink to="/history" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>История</NavLink>
                        <div className={classes.link__img}>
                            <HistoryIcon/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <NavLink to="/statistics" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>Статистика</NavLink>
                        <div className={classes.link__img}>
                            <StatisticIcon/>
                        </div>
                    </li>
                    {
                        ctx.AuthStore.isAdmin
                            ? <li>
                                <ul className={classes.submenu}>
                                    <li className={classes.list__item}>
                                        <NavLink to="/users" className={classes.submenu__link} onClick={() => {
                                            setMenuOpen(false)
                                        }}>Пользователи</NavLink>
                                        <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                                    </li>
                                    <li className={classes.list__item}>
                                        <NavLink to="/exercises" className={classes.submenu__link} onClick={() => {
                                            setMenuOpen(false)
                                        }}>Упражнения</NavLink>
                                        <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                                    </li>
                                </ul>
                            </li>
                            : null
                    }
                </nav>
            </div>
            <div className={!menuOpen ? classes.modal__footer : `${classes.modal__footer} ${classes['menu-open']}`}>
                <FooterIcon/>
            </div>
        </div>
    );
};

export default DropDownMenu;
