import React from 'react';
import "./SearchForm.css"
function SearchForm(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSearch();
    }

    return (
        <section className="search">
            <div className="search__container"> 
                <h1 className="search__title">Что творится в мире?</h1>
                <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className="search__form" onSubmit={handleSubmit}>
                    <input className="search__input" placeholder="Введите тему новости" value={props.query} onChange={props.onChange} required />
                    <button className="search__btn" type='button'>Искать</button>
                </form>
            </div>
        </section>
    );
}
export default SearchForm;
