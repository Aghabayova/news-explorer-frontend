import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function Register(props) {


    function handleSubmit(e) {

    }

    return (

        <PopupWithForm isOpen={props.isOpen} name="register" onSuccess={props.onButton} onClose={props.onClose} onSwitchToLogin={props.switchToLoginPopup} onSubmit={handleSubmit} heading="Регистрация" buttonText="Зарегистрироваться" >
            <span className="popup__input-title" lang="en">Email</span>
            <input
                className="popup__input popup__input_email"
                id="email"

                placeholder="Введите почту"
                type="email"
                name="email"
                required
                pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                minLength="6"
                maxLength="60" />
            <span className="popup__span-error"></span>
            <span className="popup__input-title" lang="en">Пароль</span>
            <input
                className="popup__input popup__input_password"


                id="password"
                placeholder="Введите пароль"
                type="password"
                required
                name="password"
                minLength="6" />
            <span className="popup__span-error"></span>
            <span className="popup__input-title" lang="en">Имя</span>
            <input
                className="popup__input popup__input_name"


                id="name"
                placeholder="Введите свое имя"
                type="text"
                required
                name="name"
                pattern="[A-Za-zА-Яа-яЁё -]*"
                minLength="2"
                maxLength="30" />
            <span className="popup__span-error"></span>
            <span className="popup__registration-error">Такой пользователь уже есть</span>
        </PopupWithForm >
    )
}
export default Register
