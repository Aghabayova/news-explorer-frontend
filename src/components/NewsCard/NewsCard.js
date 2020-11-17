import React from 'react';
import './NewsCard.css';

import { useLocation } from "react-router-dom";


function NewsCard(props) {

    const [isSaved, setIsSaved] = React.useState("");
    const [infoSpan, setInfoSpan] = React.useState(false);

    const handleToggle = () => {
        setIsSaved(!isSaved);
        props.saveArticle(props.itemData);
    }

    const { pathname } = useLocation();

    const infoSpanClass = infoSpan ? 'newscard__info-span' : 'newscard__info-span_hidden';
    let btnStatus = 'newscard__save-btn';
    let btnStatusActive = 'newscard__save-btn_active';


    if (pathname === '/saved-news') {
        btnStatus = 'newscard__trash-btn';
        btnStatusActive = 'newscard__trash-btn';
    }
    const buttonToggle = isSaved ? btnStatusActive : btnStatus;
    const textPath = `${pathname === '/saved-news' ? 'Убрать из сохранённых' : 'Войдите, чтобы сохранять статьи'}`;


    function showInfoSpan() {
        setInfoSpan(true);
    }
    function removeInfoSpan() {
        setInfoSpan(false);
    }
    
    
    const formatDate = (date) => {
        const articleDate = new Date(date);
        const newDate = `${articleDate.toLocaleString("ru-RU", { month: 'long', day: 'numeric' })}, ${articleDate.getFullYear()}`;
        return newDate;
    }

    return (
        <div className="newscard" key={props.itemData._id}>
            <img className="newscard__image" src={props.itemData.urlToImage} alt="новостное изображение" />

            <button
                className={buttonToggle}

                onMouseOver={showInfoSpan}
                onMouseOut={removeInfoSpan}
                onClick={() => handleToggle()}
            ></button>
            {(pathname === '/saved-news') ?
                <span className="newscard__category" >{props.itemData.category}</span>
                :
                <></>
            }
            <span className={infoSpanClass} >{textPath}</span>

            <div className="newscard__content">
                <div className="newscard__info">
                    <p className='newscard__date'>{formatDate(props.itemData.publishedAt)}</p>
                    <h3 className="newscard__title">{props.itemData.title}</h3>
                    <p className="newscard__article">{props.itemData.description}</p>
                </div>
                <a className="newscard__link" target="_blank" rel="noreferrer" href={props.itemData.url}>{props.itemData.source.name}</a>
            </div>
        </div>
    );
}
export default NewsCard;
