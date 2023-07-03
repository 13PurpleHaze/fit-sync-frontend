import React, {useState} from 'react';
import classes from './style.module.css';
import {ReactComponent as LogoIcon} from './logo.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import PrimaryBtn from "../PrimaryBtn";
import BurgerBtn from "../BurgerBtn";
import DropDownMenu from "../DropDownMenu";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className={classes.header}>
            <div className={classes.menu}>
                <div><LogoIcon className={classes.logo}/></div>
                <nav className={classes.nav}>
                    <ul className={classes.nav__list}>
                        <li className={classes.list__item}>
                            <NavLink to="/workout" className={classes.nav__link}>Тренировка</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                        <li className={classes.list__item}>
                            <NavLink to="/history" className={classes.nav__link}>История</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                        <li className={classes.list__item}>
                            <a href="" className={classes.nav__link}>Статистика</a>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                    </ul>
                    <PrimaryBtn colorState={!menuOpen}>Выйти</PrimaryBtn>
                </nav>
                <BurgerBtn colorState={!menuOpen} onClick={() => {
                    setMenuOpen(!menuOpen)
                }}/>
            </div>
            <DropDownMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        </header>
    );
};

export default NavBar;