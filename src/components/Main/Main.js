import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";
import './Main.css';

function Main() {

    return (
        <main className="main">
            <section className="main__cards">
                <NewsCardList />
            </section>
        </main>
    );
}
export default Main;
