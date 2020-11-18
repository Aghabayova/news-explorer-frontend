import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
  

    function validate() {
        setEmailError(emailRef.current.validationMessage);
        setPasswordError(passwordRef.current.validationMessage);

        if(!emailRef.current.validity.valid) {
            setEmailValid(false);
            setIsValid(false);
        }
        else {
            setEmailValid(true);
            setIsValid(true);
        }

        if(!passwordRef.current.validity.valid) {
            setPasswordValid(false);
            setIsValid(false);
        }
        else {
            setPasswordValid(true);
            setIsValid(true);
        }
    }

 

    function handleChange(e) {
        const { value } = e.target;
        if (e.target.name === 'email') {
            setEmail(value);
        }
        if (e.target.name === 'password') {
            setPassword(value);
        }
        validate();
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({ email, password })
    }

    return (

        <PopupWithForm 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit} 
            onSwitchToRegister={props.switchToRegisterPopup}
            isValid={isValid}
            name="login" 
            heading="Вход" 
            buttonText="Войти" 
        >
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
                maxLength="60"
                ref={emailRef} />
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
                id="password-login"
                placeholder="Введите пароль"
                type="password"
                required
                onChange={handleChange}
                value={password}
                name="password"
                minLength="6"
                maxLength="30"
                ref={passwordRef}
                />
                  <span
                    className={`popup__input-error ${!passwordValid && "popup__input-error_active "
                        }`}
                    id="password-input-error-register"
                >
                    {passwordError}
                </span>
                {props.authError &&
                    <span className="popup__registration-error">Неверные почта или пароль</span>
                }
        </PopupWithForm >
    )
}
export default Login
