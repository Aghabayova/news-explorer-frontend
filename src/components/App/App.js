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
import configData from '../../utils/Config';
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
  const [queryCat, setQueryCat] = React.useState('');
  const [startSearch, setstartSearch] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedArticle, setSavedArticle] = React.useState([]);
  const [sortedCats, setSortedCats] = React.useState([]);
  const [authError, setAuthError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resetForm, setResetForm] = React.useState(true);
  const [currentQueryResult, setCurrentQueryResult] = React.useState([]);
  const [storageQueryResult, sеtStorageQueryResult] = React.useState([]);
  const [searchError, setSearchQueryError] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const history = useHistory();
  const escape = require('escape-html');

  // проверка на мобильную версию
  function mobileMenuToggle() {
    isMobile ? setisMobile(false) : setisMobile(true);
  }

  // Зброс функций
  function handleResetForm() {
    setAuthError(false);
  }

  // обработчик кнопки регистрации
  function handleRegisterClick() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
    handleResetForm();
  }

  // переключение логина на регистрацию
  function handleSwitchToLogin() {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
    handleResetForm();
  }

  // обработчик кнопки входа
  function handleLoginClick() {
    setIsLoginPopupOpen(true);
    handleResetForm();
  }

  // обработчик успешной регистрации
  function handleInfoToolPopup() {
    setIsRegisterPopupOpen(false);
    setIsInfoToolTipOpen(true);
  }

  // обработчик перехода на логин
  function switchInfoToolToLogin() {
    setIsInfoToolTipOpen(false);
    setIsLoginPopupOpen(true);
  }

  // Регистрация
  function handleRegister({ email, password, name }) {
    setDisabled(true);
    return auth.register(email, escape(password), name)
      .then(res => {
        if (res.data) {
          handleInfoToolPopup();
        }
      })
      .catch((err) => {
        setAuthError(true);
      })
      .finally(() => setDisabled(false));
  }

  // логаут
  function handleLogOut() {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    history.push('/');
  }

  //обработчик входа на страницу
  function handleLogin({ email, password }) {
    setDisabled(true);
    auth.authorise(email, escape(password))
      .then(res => {
        if (res.data) {
          localStorage.setItem('loggedIn', true);
          setCurrentUser(res.data);
          setLoggedIn(true);
          setIsLoginPopupOpen(false);
        }
        else {
          setAuthError(true)
        }
      })
      .catch((err) => {
        setAuthError(true)
      })
      .finally(() => setDisabled(false));
  }

  // обработчик сохранения и удаления новостей на главной странице
  function saveArticle(data) {
    if (loggedIn) {
      if (!data.isSaved) {
        api.createArticle(searchQuery, data.publishedAt, data.title, data.description, data.source.name, data.url, data.urlToImage)
          .then(res => {
            if (res.data) {

              const tmpResults = [...currentQueryResult];
              const index = tmpResults.findIndex(item => {
                return item.title === data.title &&
                  item.description === data.description &&
                  item.publishedAt === data.publishedAt &&
                  item.source.name === data.source.name &&
                  item.url === data.url &&
                  item.urlToImage === data.urlToImage;
              });

              tmpResults[index].isSaved = true;
              tmpResults[index]._id = res.data._id;
              localStorage.setItem('currentQueryResult', JSON.stringify(tmpResults));
              setCurrentQueryResult(tmpResults);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => { })
      }
      else {
        api.deleteArticle(data._id)
          .then(res => {

            if (res) {
              const tmpResults = [...currentQueryResult];
              const index = tmpResults.findIndex(item => {
                return item.title === data.title &&
                  item.description === data.description &&
                  item.publishedAt === data.publishedAt &&
                  item.source.name === data.source.name &&
                  item.url === data.url &&
                  item.urlToImage === data.urlToImage;
              });

              tmpResults[index].isSaved = false;
              delete tmpResults[index]._id;
              localStorage.setItem('currentQueryResult', JSON.stringify(tmpResults));
              setCurrentQueryResult(tmpResults);
            }
          })
          .catch(error => console.log(error));
      }
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

  // обработчик клавиши esc
  function handleEscClose(e) {
    if (e.key === "Escape") {
      closePopups();
    }
  }

  // обработчик по нажатию на оверлей
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


  // обработчик ввода в поле поиска
  function handleSearchChange(evt) {
    if (!evt.target.value.trim()) {
      setSearchQueryError(true);
    } else {
      setSearchQueryError(false);
    }
    setSearchQuery(evt.target.value);
  }

  // обработчик поиска
  function onSearch(query) {
    if (query.trim()) {
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
              localStorage.setItem('currentQueryResult', JSON.stringify(response.articles.slice(0, configData.newsLimit)));
              localStorage.setItem('searchQuery', searchQuery);
            } else {
              localStorage.removeItem('currentQueryResult');
              localStorage.removeItem('searchQuery');
            }
            setCurrentQueryResult(response.articles.slice(0, configData.newsLimit));
            localStorage.setItem('storageQueryResult', JSON.stringify(response.articles.slice(configData.newsLimit)));
            sеtStorageQueryResult(response.articles.slice(configData.newsLimit));
            setIsLoading(false);
          } else {
            setAuthError(true);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setAuthError(true);
          setIsLoading(false);
        });
    }
    else {
      setSearchQueryError('Нужно ввести ключевое слово');
    }
  }
  // обработчик загрузки доп. статей
  function handleLoadMore() {
    localStorage.setItem('currentQueryResult', JSON.stringify([...currentQueryResult, ...storageQueryResult.slice(0, configData.newsLimit)]));
    setCurrentQueryResult([...currentQueryResult, ...storageQueryResult.slice(0, configData.newsLimit)]);
    localStorage.setItem('storageQueryResult', JSON.stringify(storageQueryResult.slice(configData.newsLimit)));
    sеtStorageQueryResult(storageQueryResult.slice(configData.newsLimit));
  }

  // получение сохраненых новостей из бакэнда
  function getSavedArticles() {
    api.getArticles()
      .then(res => {

        if (res.data) {
          const catMap = res.data.map(data => data = data.keyword)
            .reduce((articles, current) => {
              articles[current] = (articles[current] || 0) + 1;
              return articles;
            }, {});
          const sortedCats = Object.keys(catMap).sort((a, b) => catMap[b] - catMap[a]);
          setSavedArticle(res.data);
          setSortedCats(sortedCats);
        } else if (console.log('No Results')) {
          setSavedArticle([]);
          setSortedCats([]);
        }
      })
      .catch(error => console.log(error));
  }

  // обработчик удаления новостей с бэкенда
  function deleteArticle(data) {
    api.deleteArticle(data._id)
      .then(res => {
        if (res) {
          const tmpResults = [...currentQueryResult];
          const index = tmpResults.findIndex(item => item._id === data._id);
          console.log(index);
          if (index >= 0) {
            tmpResults[index].isSaved = false;
            delete tmpResults[index]._id;
            localStorage.setItem('currentQueryResult', JSON.stringify(tmpResults));
            setCurrentQueryResult(tmpResults);
          }
        }
        getSavedArticles();
      })
      .catch(error => console.log(error));
  }


  React.useEffect(() => {
    const currentQueryResult = JSON.parse(localStorage.getItem('currentQueryResult'));
    const storageQueryResult = JSON.parse(localStorage.getItem('storageQueryResult')) || [];
    
    const searchQuery = localStorage.getItem('searchQuery') || '';
    
    setCurrentQueryResult(currentQueryResult);
    sеtStorageQueryResult(storageQueryResult);
    setSearchQuery(searchQuery);
    
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
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
  }, []);

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
              currentQueryResult={currentQueryResult}
              storageQueryResult={storageQueryResult}
              searchQuery={searchQuery}
              searchError={searchError}
              onChange={handleSearchChange}
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
          authError={authError}
          resetForm={resetForm}
          disabled={disabled}
        />
        <Login
          onLogin={handleLogin}
          switchToRegisterPopup={handleRegisterClick}
          onClose={closePopups}
          isOpen={isLoginPopupOpen}
          authError={authError}
          resetForm={resetForm}
          disabled={disabled}
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
            openLogin={handleLoginClick}
            component={SavedNews}
            savedArticle={savedArticle}
            getArticles={getSavedArticles}
            currentResult={currentQueryResult}
            deleteArticle={deleteArticle}
            queryCat={searchQuery}
            sortedCats={sortedCats}
          />
          <Route exact path="/">
            <Main
              isLoading={isLoading}
              currentResult={currentQueryResult}
              startSearch={startSearch}
              loggedIn={loggedIn}
              saveArticle={saveArticle}
              storageQueryResult={storageQueryResult}
              handleLoadMore={handleLoadMore}
              authError={authError}
              queryCat={searchQuery}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
