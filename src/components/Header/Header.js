import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {

    return (
        <header className='header'>
            <NavLink exact to='/' className="header__label" >NewsExplorer</NavLink>
            <Navigation/>
        </header>
    );
}
export default Header;
