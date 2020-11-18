import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';
import About from '../About/About';
import './Main.css';

function Main(props) {
    
    return (
        <main className="main">
            {props.startSearch &&
            <>
                {props.isLoading && <Preloader />}
                {props.authError && <span className="main__span-error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
                {!props.currentResult || props.currentResult.length === 0
                    ?
                    <NotFoundNews />
                    :
                    <div className="main__cards">
                        <NewsCardList 
                            newsArray={props.currentResult} 
                            saveArticle={props.saveArticle} 
                            loggedIn={props.loggedIn} 
                            storageQueryResult={props.storageQueryResult} 
                            handleLoadMore={props.handleLoadMore}  
                        />
                    </div>
                }
                </>
            }
            <About />
        </main>
        
    );
}
export default Main;
