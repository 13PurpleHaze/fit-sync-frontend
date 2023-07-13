import React, {useContext, useEffect, useState} from 'react';
import classes from './style.module.css';
import {ReactComponent as LogoIcon} from './logo.svg';
import {ReactComponent as UnderlineIcon} from './underline.svg';
import PrimaryBtn from "../PrimaryBtn";
import BurgerBtn from "../BurgerBtn";
import DropDownMenu from "../DropDownMenu";
import {Link, NavLink} from "react-router-dom";
import {observer} from "mobx-react";
import {StoreContext} from "../../store";
import RouterStore from "../../store/RouterStore";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const ctx = useContext(StoreContext);
    return (
        <header className={classes.header}>
            <div className={classes.menu}>
                <div><Link to="/workout" onClick={() => {setMenuOpen(false)}}><LogoIcon className={classes.logo}/></Link></div>
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
                            <NavLink to="/statistics" className={classes.nav__link}>Статистика</NavLink>
                            <UnderlineIcon className={classes.nav__link_underline_curve}/>
                        </li>
                    </ul>
                    <PrimaryBtn colorState={!menuOpen} onClick={() => {
                        ctx.AuthStore.logout();
                        ctx.RouterStore.push("/login")
                    }}>Выйти</PrimaryBtn>
                </nav>
                <BurgerBtn colorState={!menuOpen} onClick={() => {
                    console.log(ctx.AuthStore.user)
                    console.log(ctx.AuthStore.isAdmin)
                    setMenuOpen(!menuOpen)
                }}/>
            </div>
            <DropDownMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        </header>
    );
};

export default observer(NavBar);
