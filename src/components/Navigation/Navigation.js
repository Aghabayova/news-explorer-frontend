import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Navigation(props) {

    const { name } = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');

    React.useEffect(() => {
        setUserName(name);
      }, [name])
    
    const textPath = (props.loggedIn === true) ? userName : 'Авторизоваться';
    const logOut = (props.loggedIn === true) ? 'navigation__auth-logout' : 'navigation__auth-logout_hidden';
    
    const navigation = (props.isMobile === true ) ? 'navigation__mobile' : "navigation";

    return (
        <nav className={navigation}>
            
            <NavLink exact to='/' className="navigation__link" >Главная</NavLink>
            {props.loggedIn? <NavLink to='/saved-news' className="navigation__link" >Сохранённые статьи</NavLink> : <></>}
            <NavLink
                className="navigation__auth"
                onClick={props.loggedIn? props.onLogOut:  props.onLogin}
                exact
                to="/"
            >
                {textPath}
                <span className={logOut} onClick={props.onLogout} />
            </NavLink>
        </nav>
    );
}
export default Navigation;
