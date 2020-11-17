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
import newsApi from '../../utils/NewsApi';


function App(props) {

  const { pathname } = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isMobile, setisMobile] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [localStData, setLocalStData] = React.useState(false);
  const [queryCat, setQueryCat] = React.useState('');
  const [startSearch, setstartSearch] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [currentResult, setCurrentResult] = React.useState({});
  
  //const [articles, setArticles] = React.useState([]);
  //const [currentUser, setCurrentUser] = React.useState({ name: '', _id: '' });
  //const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const history = useHistory();
  const escape = require('escape-html');

  React.useEffect(() => {
    const localStData = localStorage.getItem('loggedIn');
    function tokenCheck() {
      if (localStorage.getItem('token')) {
        setLoggedIn(true);
        setCurrentUser(JSON.parse(localStorage.getItem('loggedIn')));
      }
    }
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
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    history.push('/');
  }

  //обработчик входа на страницу
  function handleLogin({ email, password }) {
    auth.authorise(email, escape(password))
    .then((res) => {
      if(res && res.token) {
         localStorage.setItem('loggedIn', true);
          setCurrentUser(res.data);
          setLoggedIn(true);
          setIsLoginPopupOpen(false);
          return res.token;
        }
      })
      .then((token) => {
        if (localStData === true) {
        auth.getContent(token)
          .then((data) => {
            if (data) { 
              localStorage.setItem('name', JSON.stringify(data.data));
              setCurrentUser(data.data);
            }
          })
          .catch(err => console.log(err));
        }
    })
      .finally(() => {
      })
  
  }
  
  function saveArticle(data){
    console.log(data);
    if(loggedIn) {
      api.createArticle(
        queryCat, 
        data.publishedAt,
        data.title,
        data.description,
        data.source.name,
        data.url,
        data.urlToImage
      ).then(res => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      })
    }
    else {
      handleRegisterClick();
    }
  
  }
  //обработчик закрытия попапов
  function closePopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }
  function handleEscClose(e) {
    if (e.key === "Escape") {
      closePopups();
    }
  }

  function handlerOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      closePopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("mousedown", handlerOverlayClick);

    return () => {
      window.removeEventListener("mousedown", handlerOverlayClick);
      window.removeEventListener("keydown", handleEscClose);
    };
  });

  function onSearch(query) {
    setIsLoading(true);
    setstartSearch(true);
    setQueryCat(query);

    newsApi(query)
      .then(response => {
        if (response.status === 'ok') {
          response.articles = response.articles.map(item => ({
            ...item,
            isSaved: false
          }));
          if (response.articles.length > 0) {
            const res = response.articles.slice(0, 9);
            setCurrentResult(res);
            setIsLoading(false);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
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
              onSearch={onSearch}
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
            localStData = {localStData}
            component={SavedNews}
            savedArticles={savedArticles}
            currentResult={currentResult}
            queryCat={queryCat}
          />
          <Route exact path="/">
            <Main
              isLoading={isLoading}
              currentResult={currentResult}
              startSearch={startSearch}
              loggedIn={loggedIn}
              saveArticle = {saveArticle}
            />
          </Route>

        </Switch>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
