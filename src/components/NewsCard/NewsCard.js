import React from 'react';
import './NewsCard.css';

import { useLocation } from "react-router-dom";


function NewsCard(props) {
    const { pathname } = useLocation();

    const [infoSpan, setInfoSpan] = React.useState(false);
    const infoSpanClass = infoSpan ? 'newscard__info-span' : 'newscard__info-span_hidden';
    const textPath = props.loggedIn ? 'Нажмите чтобы сохранить статью' : 'Войдите, чтобы сохранять статьи';

    function showInfoSpan() {
        setInfoSpan(true);
    }
    function removeInfoSpan() {
        setInfoSpan(false);
    }

    function handleSaveBtn() {
        props.saveArticle(props.itemData);
    }

    function handleDeleteBtn() {
        props.deleteArticle(props.itemData);
    }

    

    
    const formatDate = (date) => {
        const articleDate = new Date(date);
        const newDate = `${articleDate.toLocaleString("ru-RU", { month: 'long', day: 'numeric' })}, ${articleDate.getFullYear()}`;
        return newDate;
    }
    
    

    return (
        <div className="newscard" key={props.itemData._id}>
            <a href={pathname === '/' ? props.itemData.url : props.itemData.link} target="_blank" rel="noopener noreferrer" >
            <img className="newscard__image" 
                src={pathname === '/' ? props.itemData.urlToImage : props.itemData.image} 
                alt="новостное изображение" />
            </a>
            {(pathname === '/saved-news') ?
            <>
            <button 
                className="newscard__trash-btn" 
                type="button"  
                onClick={handleDeleteBtn} 
                onMouseOver={showInfoSpan}
                onMouseOut={removeInfoSpan}
            />
            <span className={infoSpanClass} >Удалить из сохранённых</span>
            <span className="newscard__category" >{props.itemData.keyword}</span>
            </>
            :
            <>
            <button
                className={props.itemData.isSaved ? 'newscard__save-btn_active' : 'newscard__save-btn'}
                onClick={handleSaveBtn}
                onMouseOver={showInfoSpan}
                onMouseOut={removeInfoSpan}
            ></button>
            <span className={infoSpanClass} >{textPath}</span>
            </>
            }

            <div className="newscard__content">
                <div className="newscard__info">
                    <p className='newscard__date'>{pathname === '/' ? formatDate(props.itemData.publishedAt) : formatDate(props.itemData.date)}</p>
                    <h3 className="newscard__title">{props.itemData.title}</h3>
                    <p className="newscard__article">{pathname === '/' ? props.itemData.description : props.itemData.text}</p>
                </div>
                <a className="newscard__link" target="_blank" rel="noreferrer" href={pathname === '/' ? props.itemData.url : props.itemData.link}>{pathname === '/' ? props.itemData.source.name : props.itemData.source}</a>
            </div>
        </div>
    );
}
export default NewsCard;