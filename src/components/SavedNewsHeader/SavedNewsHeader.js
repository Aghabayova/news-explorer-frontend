import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
    const currentUser = React.useContext(CurrentUserContext);

    function num_word(value, words) {
        value = Math.abs(value) % 100;
        var num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num === 1) return words[0];
        return words[2];
    }

    let savedArticlesCount = num_word(props.savedArticles.length, ['сохраненная статья', 'сохраненные статьи', 'сохраненных статей']);

    return (
        <section className="saved-info">
            <p className="saved-info__header">Сохранённые статьи</p>
            <h3 className="saved-info__title">{`${currentUser.name}, у вас ${props.savedArticles.length} ${savedArticlesCount}`}</h3>
            {(props.savedArticles.length > 0) ?
                <span className="saved-info__span">
                    По ключевым словам: <strong>Природа, Тайга</strong> и{" "}
                    <strong>2-м другим</strong></span> :
                null}
        </section>
    )
}
export default SavedNewsHeader;
