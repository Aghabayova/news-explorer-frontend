import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useLocation } from "react-router-dom";


function Navigation(props) {
    const { pathname } = useLocation();
    const textPath = `${pathname === '/saved-news' ? 'Грета' : 'Авторизоваться'}`;
    const logOut = `${pathname === '/saved-news' ? 'navigation__auth-logout' : 'navigation__auth-logout_hidden'}`;
    
    console.log(props.isMobile);
    const navigation = (props.isMobile === true ) ? 'navigation__mobile' : "navigation";

    return (
        <nav className={navigation}>
            
            <NavLink exact to='/' className="navigation__link" >Главная</NavLink>
            <NavLink to='/saved-news' className="navigation__link" >Сохранённые статьи</NavLink>
            <NavLink
                className="navigation__auth"
                onClick={props.onLogin}
                exact
                to="/"
            >
                {textPath}
                <span className={logOut} />
            </NavLink>
        </nav>
    );
}
export default Navigation;
