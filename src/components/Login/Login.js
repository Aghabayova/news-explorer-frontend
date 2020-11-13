import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChange(e) {
        const { value } = e.target;
        
        //e.target.name === 'email'
        //  ? setEmail(value)
        //  : setPassword(value);

        if (e.target.name === 'email') {
            setEmail(value)
        }
        if (e.target.name === 'password') {
            setPassword(value);
        }

      }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({email, password})
    }

    return (

        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}  onSubmit={handleSubmit} onSwitchToRegister={props.switchToRegisterPopup} name="login" heading="Вход" buttonText="Войти" >
            <span className="popup__input-title" lang="en">Email</span>
            <input
                className="popup__input popup__input_email"
                id="email-login"
                value={email}
                placeholder="Введите почту"
                type="email"
                name="email"
                onChange={handleChange}
                required
                maxLength="60" />
            <span className='popup__span-error'></span>
            <span className="popup__input-title" lang="en">Пароль</span>
            <input
                className="popup__input popup__input_password"
                id="password-login"
                placeholder="Введите пароль"
                type="password"
                required
                onChange={handleChange}
                value={password}
                name="password"
                minLength="6"
                maxLength="30" />
            <span className="popup__span-error"></span>
        </PopupWithForm >
    )
}
export default Login
