import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useLocation } from "react-router-dom";

function Header(props) {

    const { pathname } = useLocation();
    

    const headerClass = (pathname === '/saved-news')?"header header__black":"header";

    return (
        <header className={headerClass}>
            <NavLink exact to='/' className="header__label" >NewsExplorer</NavLink>
            <Navigation onLogin={props.onLogin} onLogOut={props.signOut}/>
        </header>
    );
}
export default Header;
