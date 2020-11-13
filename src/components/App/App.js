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


function App(props) {

  const { pathname } = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isMobile, setisMobile] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [articles, setArticles] = React.useState([]);
  //const [currentUser, setCurrentUser] = React.useState({ name: '', _id: '' });
  const [email, setEmail] = React.useState('');


  const history = useHistory();
  const escape = require('escape-html');

  // Записать токен
  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('loggedIn');
    if (jwt) {
      auth.getContent()
        .then(res => {
          if (res.data && loggedIn === 'true') {

            setCurrentUser(res.data);
            setLoggedIn(true);
          } else if (loggedIn === 'true') {
            localStorage.removeItem('loggedIn');
          }
        })
        .catch(error => console.log(error));
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

  function handleLogOut() {
    console.log('logout');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    history.push('/');
  }

  //обработчик входа на страницу
  function handleLogin({ email, password }) {
    return auth.authorise(email, escape(password))
      .then(res => {
        if (res) {

          localStorage.setItem('loggedIn', 'true');
          setCurrentUser(res.data);
          setLoggedIn(true);
          setIsLoginPopupOpen(false);
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
              loggedIn={loggedIn}
              currentUser={currentUser}
              onLogOut={handleLogOut}
            />
            <SearchForm
              searchQuery={props.searchQuery}
              searchQueryError={props.searchQueryError}
              onChange={props.handleSearchQueryChange}
              onSearch={props.onSearch}
            />
          </div>
        ) :
          (<Header
            isMobile={isMobile}
            onMenuClick={mobileMenuToggle}
            loggedIn={loggedIn}
            currentUser={currentUser}
            onLogOut={handleLogOut} />)}
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
            <Main 
              isLoading = {false}
            />
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
