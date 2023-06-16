import React from 'react';
import classes from './style.module.css';
import {ReactComponent as LogoIcon} from './logo.svg';
import PrimaryBtn from "../PrimaryBtn";
import BurgerBtn from "../BurgerBtn";

const NavBar = () => {
    return (
        <header className={classes.header}>
            <div className={classes.menu}>
                <div><LogoIcon className={classes.logo}/></div>
                <nav className={classes.nav}>
                    <ul className={classes.nav__list}>
                        <li className={classes.list__item}>
                            <a href="" className={classes.nav__link}>Тренировка</a>
                            <svg width="100%" height="9" viewBox="0 0 101 9" fill="none" className={classes.nav__link_underline_curve}>
                                <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path>
                            </svg>
                        </li>
                        <li className={classes.list__item}>
                            <a href="" className={classes.nav__link}>Баттл</a>
                            <svg width="100%" height="9" viewBox="0 0 101 9" fill="none" className={classes.nav__link_underline_curve}>
                                <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path>
                            </svg>
                        </li>
                        <li className={classes.list__item}>
                            <a href="" className={classes.nav__link}>Рейтинг</a>
                            <svg width="100%" height="9" viewBox="0 0 101 9" fill="none" className={classes.nav__link_underline_curve}>
                                <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"></path>
                            </svg>
                        </li>
                    </ul>
                    <PrimaryBtn colorState={true}>Выйти</PrimaryBtn>
                </nav>
                <BurgerBtn colorState={true}/>
            </div>
            <div className={classes['drop-down-menu']}>
                drop-down
            </div>
        </header>
    );
};

export default NavBar;