import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const searchResult = [
    { 
        image: require("../../images/NewsCard/card1.jpg"),
        date: '2 августа, 2019',
        title: 'Национальное достояние – парки',
        content: 'В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.',
        link: 'ЛЕНТА.РУ',
        url: 'https://lenta.ru/',
    },

    { 
        image: require('../../images/NewsCard/card2.jpg'), 
        date: '2 августа, 2019',
        title: 'Лесные огоньки: история одной фотографии',
        content: 'Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.',
        link: 'МЕДУЗА',
        url: 'https://meduza.io/',
    },
    { 
        image: require('../../images/NewsCard/card3.jpg'), 
        date: '2 августа, 2019',
        title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
        content: 'Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...',
        link: 'РИА',
        url: 'https://www.ria.ru',
    }, 
 ]

 

function NewsCardList() {


    const items = NewsCard(searchResult);

    return (
        
        <div className="newscards">
            <h2 className="newscards__search-title">Результаты поиска</h2>
            <section className="newscards__cards">
           {items}
            </section>
         
            <button className="newscards__more-btn">Показать еще</button>
        </div>
    );
}
export default NewsCardList;
