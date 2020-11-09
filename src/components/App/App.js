//import logo from './logo.svg';
import React from 'react';
import { Route, Switch, } from 'react-router-dom';
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';
import { useLocation } from "react-router-dom";


function App() {

  const { pathname } = useLocation();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isMobile, setisMobile] = React.useState(false);


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

  //обработчик закрытия попапов
  function closePopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
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
          onMenuClick={mobileMenuToggle}/>)}
      <Register
        onClose={closePopups}
        isOpen={isRegisterPopupOpen}
        switchToLoginPopup={handleSwitchToLogin}
        onButton={handleInfoToolPopup}
      />
      <Login
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
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
