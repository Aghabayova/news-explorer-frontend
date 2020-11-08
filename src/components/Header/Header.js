import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useLocation } from "react-router-dom";
import openIcon from '../../images/Header/burger_icon.svg';
import closeIcon from '../../images/Header/close_icon.svg';
import burgerIconWhite from  '../../images/Header/burgerwhite.svg';


function Header(props) {

    const { pathname } = useLocation();
    
    const mobileBurgerBtn = props.isMobile ? closeIcon : openIcon;
    const burgerBtnWhite = props.isMobile ? closeIcon : burgerIconWhite;

    let headerClass = (pathname === '/saved-news') ? "header header__black" : "header";
            headerClass = props.isMobile ? `${headerClass} header__mobile` : `${headerClass}`;
    
    return (
        <header className={headerClass} >
            <NavLink exact to='/' className="header__label" >NewsExplorer</NavLink>

            <Navigation onLogin={props.onLogin} isMobile={props.isMobile}/>

            <button className="header__burger" onClick={props.onMenuClick} >
                <img className="header__burger-menu" src={(pathname === '/saved-news') ? burgerBtnWhite :  mobileBurgerBtn} alt="бургер меню" />
            </button>

        </header>
    );
}
export default Header;
