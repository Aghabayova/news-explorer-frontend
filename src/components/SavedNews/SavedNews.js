import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { searchResult } from '../../utils/constants.js';


function SavedNews(props) {
    function isSaved(item) {
        return item.save === true;
    }
    
    let newsArray = Array.from(searchResult).filter(isSaved);

    return(
        <div className="saved-news">
            <SavedNewsHeader savedArticles={props.savedArticles} />
            <div className="main__cards">
                <NewsCardList  array={newsArray} />
            </div>
        </div>
    );
}
export default SavedNews;
