import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css'


function SavedNews(props) {
    
    React.useEffect(() => {
        props.getArticles();
    }, []);

    
    return (

        <div className="saved-news">
            {props.savedArticle.length > 0?
            <>
            <SavedNewsHeader savedArticles={props.savedArticle} sortedCats={props.sortedCats} />
            <div className="main__cards">
                <NewsCardList newsArray={props.savedArticle} queryCat={props.queryCat} deleteArticle={props.deleteArticle} />
            </div>
            </>
            :
            <p className="saved-news__empty">Пока нет сохранённых статей</p>
            }
        </div>

    );
}
export default SavedNews;
