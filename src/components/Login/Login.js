import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function Login(props) {


    function handleSubmit(e) {

    }

    return (

        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}  onSubmit={handleSubmit} onSwitchToRegister={props.switchToRegisterPopup} name="login" heading="Вход" buttonText="Войти" >
            <span className="popup__input-title" lang="en">Email</span>
            <input
                className="popup__input popup__input_email"
                id="email-login"

                placeholder="Введите почту"
                type="email"
                name="email"

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
                name="password"
                minLength="6"
                maxLength="30" />
            <span className="popup__span-error"></span>
        </PopupWithForm >
    )
}
export default Login
