import React, {useContext} from 'react';
import classes from './style.module.css';
import {ReactComponent as WorkoutIcon} from './biceps.svg';
import {ReactComponent as HistoryIcon} from './history.svg';
import {ReactComponent as StatisticIcon} from './statistic.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import {ReactComponent as FooterIcon} from './blood.svg';
import {Link} from "react-router-dom";
import {StoreContext} from "../../store";
import PrimaryBtn from "../PrimaryBtn";

const DropDownMenu = ({menuOpen, setMenuOpen}) => {
    const ctx = useContext(StoreContext);

    return (
        <div className={menuOpen ? `${classes['drop-down-menu-wrapper']} ${classes.active}` : classes['drop-down-menu-wrapper']}>
            <div className={classes['drop-down-menu__content']}>
                <nav className={classes['drop-down-menu__nav']}>
                    <li className={classes.nav__item}>
                        <Link to="/workouts" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>Тренировка</Link>
                        <div className={classes['link__img-container']}>
                            <WorkoutIcon className={classes.link__img}/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to="/history" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>История</Link>
                        <div className={classes['link__img-container']}>
                            <HistoryIcon className={classes.link__img}/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to="/statistics" className={classes['drop-down-menu__link']} onClick={() => {
                            setMenuOpen(false)
                        }}>Статистика</Link>
                        <div className={classes['link__img-container']}>
                            <StatisticIcon className={classes.link__img}/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <PrimaryBtn isRed={false} onClick={() => {
                            ctx.AuthStore.logout();
                            ctx.RouterStore.push("/login")
                        }}>Выйти</PrimaryBtn>
                    </li>
                    {
                        ctx.AuthStore.isAdmin
                            ? <li>
                                <ul className={classes.submenu}>
                                    <li className={classes.list__item}>
                                        <Link to="/users" className={classes.submenu__link} onClick={() => {
                                            setMenuOpen(false)
                                        }}>Пользователи</Link>
                                        <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                                    </li>
                                    <li className={classes.list__item}>
                                        <Link to="/exercises" className={classes.submenu__link} onClick={() => {
                                            setMenuOpen(false)
                                        }}>Упражнения</Link>
                                        <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                                    </li>
                                </ul>
                            </li>
                            : null
                    }
                </nav>
            </div>
            <div className={!menuOpen ? classes['drop-down-menu__footer'] : `${classes['drop-down-menu__footer']} ${classes['menu-open']}`}>
                <FooterIcon/>
            </div>
        </div>
    );
};

export default DropDownMenu;
