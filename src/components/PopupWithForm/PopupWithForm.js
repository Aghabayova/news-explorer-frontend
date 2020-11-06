import React from 'react';
import './PopupWithForm.css';


function PopupWithForm(props) {
   

    const loginPopup = (props.name === 'login');
    console.log(loginPopup);
    
    return (
        <section className={(props.isOpen ? "popup popup_opened" : "popup")} id={props.name}>
            <div className="popup__content">
                <button
                    className="popup__close"
                    onClick={props.onClose}
                    type="reset"
                >+</button>

                <form
                    onSubmit={props.onSubmit}
                    className="popup__form popup__form_registration"
                    name={props.name}
                >
                    <h3 className="popup__heading">{props.heading}</h3>
                    {props.children}
                    <button className="popup__save-btn" onClick={props.onSuccess} type="submit">{props.buttonText}</button>
                </form>
                <p className="popup__span-auth">
                    или{" "}
                    <span className="popup__span-auth_accent" onClick={loginPopup? (props.onSwitchToRegister) : (props.onSwitchToLogin)} >{loginPopup ? 'Зарегистрироваться' : 'Войти'}</span>
                </p>
            </div>
        </section>
    );
}
export default PopupWithForm;