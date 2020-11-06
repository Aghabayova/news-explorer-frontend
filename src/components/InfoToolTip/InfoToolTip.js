import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function InfoToolTip(props) {



    return (

        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose}  name="infotooltip" heading="Пользователь успешно зарегистрирован!" >
   
            <span className="popup__infotool">Войти</span>
        </PopupWithForm >
    )
}
export default InfoToolTip