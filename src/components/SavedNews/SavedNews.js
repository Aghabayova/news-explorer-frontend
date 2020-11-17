import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { searchResult } from '../../utils/constants.js';


function SavedNews(props) {
    function isSaved(item) {
        return item.save === true;
    }

    let newsArray = props.currentResult;
    return (

        <div className="saved-news">
            {props.savedArticles.length > 0?
            <>
            <SavedNewsHeader savedArticlecs={props.savedArticlecs} />
            <div className="main__cards">
                <NewsCardList newsArray={newsArray} queryCat={props.queryCat} />
            </div>
            </>
            :
            <p>Пока нет сохранённых статей</p>
            }
        </div>

    );
}
export default SavedNews;
