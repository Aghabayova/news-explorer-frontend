import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from '../Preloader/Preloader';
import NotFoundNews from '../NotFoundNews/NotFoundNews';
import About from '../About/About';
import './Main.css';
import { searchResult } from '../../utils/constants.js';

function Main(props) {

    function isSaved(item) {
       return item.save === false;
    }
    
    let newsArray = Array.from(searchResult).filter(isSaved);

    return (
        <main className="main">
            {props.isLoading && <Preloader />}
            {newsArray.length === 0? <NotFoundNews />:

            <div className="main__cards">
                <NewsCardList  array={newsArray} />
            </div>
            }
            <About />
        </main>
    );
}
export default Main;
