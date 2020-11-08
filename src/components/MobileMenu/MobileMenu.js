import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import './MobileMenu.css';



function MobileMenu(props) {


    let mobileMenuClass = "mobile_inactive";
    mobileMenuClass = `${props.isMobile ? "mobile" : "mobile_inactive"}`;
    

    return (
        <nav className={mobileMenuClass} >
            <Navigation onLogin={props.onLogin} />
        </nav>
    );
}
export default MobileMenu;