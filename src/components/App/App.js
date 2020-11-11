//import logo from './logo.svg';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import { useLocation } from "react-router-dom";
import api from '../../utils/Api';
import * as auth from '../../utils/auth.js';


function App() {

  const { pathname } = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isMobile, setisMobile] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: '', _id: '' });
  const [email, setEmail] = React.useState('');

  const history = useHistory();
  const escape = require('escape-html');

  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, articles]) => {
        setArticles(articles);
        setCurrentUser(userData);

      })
      .catch(err => console.log(err));

  }, []);

  // Записать токен
  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.getContent(jwt).then((res) => {
        if (res) {
          //setLoggedIn(true);
          setEmail({
            email: res.data.email
          });
          setLoggedIn(true);
          
        }
      })
        .catch((err) => {
          console.log(err);
         
        })
    }
  }

  // Проверить токен
  React.useEffect(() => {
    tokenCheck();
  }, []);


  function mobileMenuToggle() {
    isMobile ? setisMobile(false) : setisMobile(true);
  }

  function handleRegisterClick() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }

  function handleSwitchToLogin() {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleLoginClick() {
    setIsLoginPopupOpen(true);
  }
  function handleInfoToolPopup() {
    setIsRegisterPopupOpen(false);
    setIsInfoToolTipOpen(true);
  }
  function switchInfoToolToLogin() {
    setIsInfoToolTipOpen(false);
    setIsLoginPopupOpen(true);
  }
  // Регистрация
  function handleRegister({ email, password, name }) {
    console.log('register');
    //   setIsLoading(true);
    return auth.register(email, escape(password), name)
      .then(res => {
        if (res) {
          handleInfoToolPopup();
        } else {
          // handleRegisterSuccess(false);
        }
      });
  }

  //обработчик входа на страницу
  function handleLogin({ email, password }) {
 
    return auth.authorise(email, escape(password))
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('jwt', res.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
       
      })
  }

  //обработчик закрытия попапов
  function closePopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">


        {pathname === '/' ? (
          <div className="App__helper">

            <Header
              onLogin={handleLoginClick}
              isMobile={isMobile}
              onMenuClick={mobileMenuToggle}
            />
            <SearchForm />
          </div>
        ) :
          (<Header
            isMobile={isMobile}
            onMenuClick={mobileMenuToggle} />)}
        <Register
          onClose={closePopups}
          onRegister={handleRegister}
          isOpen={isRegisterPopupOpen}
          switchToLoginPopup={handleSwitchToLogin}
          onConfirm={handleInfoToolPopup}
        />
        <Login
         onLogin={handleLogin}
          switchToRegisterPopup={handleRegisterClick}
          onClose={closePopups}
          isOpen={isLoginPopupOpen}
        />
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closePopups}
          onLogin={switchInfoToolToLogin}
        />
        <Switch>
          <ProtectedRoute
            path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
          />
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
