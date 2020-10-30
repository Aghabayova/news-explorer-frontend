import React from 'react';
function NotFoundNews() {

    return(
        <section class="not-found">
        <div class="not-found__container">
          <img
            src=""
            alt="Изображение: Ничего не найдено"
            class="not-found__icon"
          />
          <h2 class="content-title not-found__title">Ничего не найдено</h2>
          <p class="not-found__text">
            К сожалению по вашему запросу ничего не найдено.
          </p>
        </div>
      </section>

    );
}
export default NotFoundNews;
