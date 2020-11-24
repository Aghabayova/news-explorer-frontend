import React from 'react';
import "./SearchForm.css"



function SearchForm(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        if(!props.searchError) {
            props.onSearch(props.searchQuery);
        }
    }

    return (
        <section className="search">
            <div className="search__container"> 
                <h1 className="search__title">Что творится в мире?</h1>
                <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className="search__form" onSubmit={handleSubmit}>
                    <input className="search__input" placeholder="Введите тему новости" value={props.searchQuery} onChange={props.onChange} required  minLength={1}/>
                    <button className="search__btn" type='button' onClick={handleSubmit}>Искать</button>
                </form>
                {props.searchError && <p className="search__input-error">Нужно ввести ключевое слово</p>}
            </div>
        </section>
    );
}
export default SearchForm;
