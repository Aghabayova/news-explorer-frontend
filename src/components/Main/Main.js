import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';
import About from '../About/About';
import './Main.css';

function Main(props) {

    let newsArray = props.currentResult;
    
    return (
        <main className="main">
            {props.startSearch &&
            <>
                {props.isLoading && <Preloader />}
                {newsArray.length === 0
                    ?
                    <NotFoundNews />
                    :
                    <div className="main__cards">
                        <NewsCardList newsArray={newsArray} saveArticle={props.saveArticle} />
                    </div>
                }
                </>
            }
            <About />
        </main>
        
    );
}
export default Main;
