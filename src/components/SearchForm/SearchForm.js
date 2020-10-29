import React from 'react';
import "./SearchForm.css"
function SearchForm() {

    return (
        <seaction className="search">
            <h1 className="search__title">Что творится в мире?</h1>
            <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <form className="search__form">
            <input className="search__input" placeholder="Введите тему новости"/>
            <button className="search__btn">Искать</button>
            </form>
        </seaction>
    );
}
export default SearchForm;
