import React, {useContext, useState} from 'react';
import classes from './style.module.css';
import {ReactComponent as LogoIcon} from './logo.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import PrimaryBtn from "../PrimaryBtn";
import BurgerBtn from "../BurgerBtn";
import DropDownMenu from "../DropDownMenu";
import {Link, NavLink} from "react-router-dom";
import {observer} from "mobx-react";
import {StoreContext} from "../../store";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const ctx = useContext(StoreContext);

    return (
        <header className={classes.header}>
            <div className={classes.header__menu}>
                <div>
                    <NavLink to="/workout" >
                        <LogoIcon className={classes.logo} onClick={() => {setMenuOpen(false)}}/>
                    </NavLink>
                </div>
                <nav className={classes.header__nav}>
                    <ul className={classes.nav__list}>
                        <li className={classes.list__item}>
                            <NavLink to={`/session/${ctx.SessionStore?.session?.session_id}`} className={classes.nav__link}>Текущая</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                        <li className={classes.list__item}>
                            <NavLink to="/workouts" className={classes.nav__link}>Тренировка</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                        <li className={classes.list__item}>
                            <NavLink to="/history" className={classes.nav__link}>История</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                        <li className={classes.list__item}>
                            <NavLink to="/statistics" className={classes.nav__link}>Статистика</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                    </ul>
                    <PrimaryBtn
                        isRed={!menuOpen} onClick={() => {
                        ctx.AuthStore.logout();
                        ctx.RouterStore.push("/login")
                    }}>Выйти</PrimaryBtn>
                </nav>
                <BurgerBtn
                    colorState={!menuOpen}
                    onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}
                />
            </div>
            <DropDownMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        </header>
    );
};

export default observer(NavBar);
