import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import { useLocation } from "react-router-dom";


function NewsCardList(props) {


    const { pathname } = useLocation();

    const data = props.newsArray;


    return (

        <div className="newscards">
            {pathname === '/' ? (
                <>
                    <h2 className="newscards__search-title">Результаты поиска</h2>
                    {props.newsArray.length > 0
                        ?
                        <section className="newscards__cards">
                            {data.map((item, i) =>
                                <NewsCard saveArticle={props.saveArticle} key={i} itemData={item} loggedIn={props.loggedIn} />
                            )}
                        </section>
                        :
                        <div>No Results</div>
                    }
                    {props.storageQueryResult.length > 0 &&
                        <button className="newscards__more-btn" type="button" onClick={props.handleLoadMore}>Показать еще</button>
                    }
                </>
            ) : (
                    <section className="newscards__cards">
                        {data.map((item, i) =>
                            <NewsCard key={i} itemData={item} queryCat={props.queryCat} deleteArticle={props.deleteArticle} />
                        )}
                    </section>
                )}
        </div>
    );
}
export default NewsCardList;
