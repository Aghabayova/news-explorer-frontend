import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const nameRef = React.useRef();
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [nameValid, setNameValid] = React.useState(false);
    

    function validate() {
        setEmailError(emailRef.current.validationMessage);
        setPasswordError(passwordRef.current.validationMessage);
        setNameError(nameRef.current.validationMessage);

        !emailRef.current.validity.valid
            ? setEmailValid(false)
            : setEmailValid(true);
        !passwordRef.current.validity.valid
            ? setPasswordValid(false)
            : setPasswordValid(true);
        !nameRef.current.validity.valid 
        ? setNameValid(false) 
        : setNameValid(true);
    }

    function handleChange(e) {

        const { value } = e.target;
        if (e.target.name === 'email') {
            setEmail(value)
        }
        if (e.target.name === 'password') {
            setPassword(value);
        }
        if (e.target.name === 'name') {
            setName(value);
        }
        validate();

    }
   
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({ email, password, name })

            .then(() => {
                props.onConfirm(true);

            })
            .catch(() => {
                props.onConfirm(false);
            });

    }

    return (

        <PopupWithForm isOpen={props.isOpen} name="register" onClose={props.onClose} onSwitchToLogin={props.switchToLoginPopup} onSubmit={handleSubmit} heading="Регистрация" buttonText="Зарегистрироваться" >
            <span className="popup__input-title" lang="en">Email</span>
            <input
                className="popup__input popup__input_email"
                id="email"
                value={email}
                onChange={handleChange}
                placeholder="Введите почту"
                type="email"
                name="email"
                required
                pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                minLength="6"
                maxLength="60"
                ref={emailRef}
            />
            <span
                className={`popup__input-error ${!emailValid && "popup__input-error_active "
                    }`}
                id="email-input-error-register"
            >
                {emailError}
            </span>
            <span className="popup__input-title" lang="en">Пароль</span>
            <input
                className="popup__input popup__input_password"
                value={password}
                onChange={handleChange}
                id="password"
                placeholder="Введите пароль"
                type="password"
                required
                name="password"
                minLength="6"
                ref={passwordRef}
            />
              <span
                className={`popup__input-error ${!passwordValid && "popup__input-error_active "
                    }`}
                id="password-input-error-register"
            >
                {passwordError}
            </span>
            <span className="popup__input-title" lang="en">Имя</span>
            <input
                className="popup__input popup__input_name"
                value={name}
                onChange={handleChange}
                id="name"
                placeholder="Введите свое имя"
                type="text"
                required
                name="name"
                pattern="[A-Za-zА-Яа-яЁё -]*"
                minLength="2"
                maxLength="30"
                ref={nameRef}
            />
              <span
                className={`popup__input-error ${!nameValid && "popup__input-error_active "
                    }`}
                id="password-input-error-register"
            >
                {nameError}
            </span>
            <span className="popup__registration-error">Такой пользователь уже есть</span>
        </PopupWithForm >
    )
}
export default Register
