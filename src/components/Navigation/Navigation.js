import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import signout from "../../images/Navigation/signout.svg"

function Navigation() {

    return (
        <nav className="navigation">
            <NavLink exact to='/' className="navigation__link" >Главная</NavLink>
            <NavLink to='/saved-news' className="navigation__link" >Сохранённые статьи</NavLink>
            <button className="navigation__auth">
                <p className="navigation__auth-status">Грета</p>
                <img className="navigation__auth-logout" alt="" src={signout}/>
            </button>
        </nav>
    );
}
export default Navigation;
