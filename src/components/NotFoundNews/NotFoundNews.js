import React from 'react';
import NotFound from '../../images/NotFound/notfound.png';
import './NotFoundNews.css';
function NotFoundNews() {

    return (
        <section className="not-found">
                <img src={NotFound} className="not-found__icon" alt="Изображение: Ничего не найдено"/>
                <h2 className="not-found__title">Ничего не найдено</h2>
                <p className="not-found__text">
                    К сожалению по вашему запросу ничего не найдено.
          </p>
        </section>

    );
}
export default NotFoundNews;
