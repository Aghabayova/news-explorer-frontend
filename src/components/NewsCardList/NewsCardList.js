import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import { useLocation } from "react-router-dom";


function NewsCardList(props) {
    

    const { pathname } = useLocation();


    return (

        <div className="newscards">
            {pathname === '/' ? (
                <>
                    <h2 className="newscards__search-title">Результаты поиска</h2>
                    <section className="newscards__cards">
                        {Array.from(props.array).map(item =>
                            <NewsCard itemData={item} key={item._id} />
                        )}
                    </section>

                    <button className="newscards__more-btn" type="button">Показать еще</button>
                </>
            ) : (
                    <section className="newscards__cards">
                        {Array.from(props.array).map(item =>
                            <NewsCard itemData={item} key={item._id} />
                        )}
                    </section>
                )}
        </div>
    );
}
export default NewsCardList;
