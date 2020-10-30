//import logo from './logo.svg';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SavedNews from '../SavedNews/SavedNews';
import Main from '../Main/Main';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App__helper">
    <Header />
    <SearchForm />
    </div>
   
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route  path="/saved-news">
        <SavedNews/>
      </Route>
      
    </Switch>
    <About/>
    <Footer />
    </div>
  );
}

export default App;
