import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
    return props.map(item => {

        const { image, date, title, content, link, url } = item;

        return (
            <div className="newscard">
                <img className="newscard__image" src={image.default} alt="новостное изображение" />
                <img className="newscard__save-btn" alt="" src="" />
                <div className="newscard__content">
                    <div>
                        <p className='newscard__date'>{date}</p>
                        <h3 className="newscard__title">{title}</h3>
                        <p className="newscard__article">{content}</p>
                    </div>
                    <a className="newscard__link" target="_blank" rel="noreferrer" href={url}>{link}</a>
                </div>
            </div>
        );
    });
}
export default NewsCard;
