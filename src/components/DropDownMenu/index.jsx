import React from 'react';
import classes from './style.module.css';
import {ReactComponent as WorkoutIcon} from './biceps.svg';
import {ReactComponent as HistoryIcon} from './history.svg';
import {ReactComponent as StatisticIcon} from './statistic.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import {ReactComponent as FooterIcon} from './blood.svg';

const DropDownMenu = ({menuOpen}) => {
    return (
        <div
            className={menuOpen ? `${classes['drop-down-menu-wrapper']} ${classes.active}` : classes['drop-down-menu-wrapper']}>
            <div className={classes.modal__content}>
                <nav className={classes['drop-down-menu__nav']}>
                    <li className={classes.nav__item}>
                        <a href="" className={classes['drop-down-menu__link']}>Тренировка</a>
                        <div className={classes.link__img}>
                            <WorkoutIcon/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <a href="" className={classes['drop-down-menu__link']}>История</a>
                        <div className={classes.link__img}>
                            <HistoryIcon/>
                        </div>
                    </li>
                    <li className={classes.nav__item}>
                        <a href="" className={classes['drop-down-menu__link']}>Статистика</a>
                        <div className={classes.link__img}>
                            <StatisticIcon/>
                        </div>
                    </li>
                    <li>
                        <ul className={classes.submenu}>
                            <li className={classes.list__item}>
                                <a href="" className={classes.submenu__link}>Пользователи</a>
                                <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                            </li>
                            <li className={classes.list__item}>
                                <a href="" className={classes.submenu__link}>Упражнения</a>
                                <UnderlineIcon className={classes.submenu__link_underline_curve}/>
                            </li>
                        </ul>
                    </li>
                </nav>
            </div>
            <div className={!menuOpen ? classes.modal__footer : `${classes.modal__footer} ${classes['menu-open']}`}>
                <FooterIcon/>
            </div>
        </div>
    );
};

export default DropDownMenu;