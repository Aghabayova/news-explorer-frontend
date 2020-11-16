import React from 'react';
import "./SearchForm.css"



function SearchForm(props) {

    const [query, setQuery] = React.useState('');

    function handleChange(e) {
        const { value } = e.target;
        setQuery(value);
      }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSearch(query);
    }


    return (
        <section className="search">
            <div className="search__container"> 
                <h1 className="search__title">Что творится в мире?</h1>
                <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form className="search__form" onSubmit={handleSubmit}>
                    <input className="search__input" placeholder="Введите тему новости" value={query} onChange={handleChange} required  minLength={1}/>
                    <button className="search__btn" type='button' onClick={handleSubmit}>Искать</button>
                </form>
            </div>
        </section>
    );
}
export default SearchForm;
