import React from 'react';
import FbIcon from '../../images/Footer/fb.png';
import GhIcon from '../../images/Footer/github.png';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {

    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
            <nav className="footer__nav">
                <ul className="footer__nav-links footer__nav-links_mobile">
                    <li><NavLink className="footer__nav-link footer__nav-link_main" to='/'>Главная</NavLink></li>
                    <li><a className="footer__nav-link footer__nav-link_mobile" href="https://praktikum.yandex.ru">Яндекс.Практикум</a></li>
                </ul>
                <ul className="footer__nav-links footer__nav-links_social">
                    <li><a className="footer__nav-link footer__nav-link_gb" href="https://github.com/Aghabayova" target="_blank" rel="noreferrer"><img className="footer__social-icon" src={GhIcon} alt="иконка Гитхаб" /></a></li>
                    <li><a className="footer__nav-link" href="https://www.facebook.com" target="_blank" rel="noreferrer"><img className="footer__social-icon" src={FbIcon} alt="иконка Фейсбук" /></a></li>
                </ul>
            </nav>
        </footer>
    );
}
export default Footer;
