import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {

    return (
        <section className="saved-info">
            <p className="saved-info__header">Сохранённые статьи</p>
            <h3 className="saved-info__title">Грета, у вас 5 сохранённых статей</h3>
            <span className="saved-info__span">
                По ключевым словам: <strong>Природа, Тайга</strong> и{" "}
                <strong>2-м другим</strong></span>
        </section>
    )
}
export default SavedNewsHeader;
