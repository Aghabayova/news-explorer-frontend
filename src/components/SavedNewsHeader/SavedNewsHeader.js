import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
    const currentUser = React.useContext(CurrentUserContext);
      
      function getCatsText(number) {
        let text = '-и другим';
        if (number.toString().endsWith('1') && !number.toString().endsWith('11')) {
          text = '-му другому';
        } else if (number.toString().endsWith('2') && !number.toString().endsWith('12')) {
          text = '-м другим';
        } else if (number.toString().endsWith('3') && !number.toString().endsWith('13')) {
          text = '-м другим';
        } else if (number.toString().endsWith('4') && !number.toString().endsWith('14')) {
          text = '-м другим';
        }
        return text;
      }

    function numWord(value, words) {
        value = Math.abs(value) % 100;
        var num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num === 1) return words[0];
        return words[2];
    }

    let savedArticlesCount = numWord(props.savedArticles.length, ['сохраненная статья', 'сохраненные статьи', 'сохраненных статей']);

    

    return (
        <section className="saved-info">
        	<p className="saved-info__header">Сохранённые статьи</p>
            <h3 className="saved-info__title">{`${currentUser.name}, у вас ${props.savedArticles.length} ${savedArticlesCount}`}</h3>
            
            {props.sortedCats.length <= 3
            ?
            <span className="saved-info__span">
            По ключевым словам:
            {
                props.sortedCats.map((cat, i) => {
                return i < props.sortedCats.length - 1
                    ? <strong key={i}> {cat},</strong>
                    : <strong key={i}> {cat}</strong>
                })
            }
            </span>
            :
            <span className="saved-info__span">
            По ключевым словам:
            {
                props.sortedCats.map((cat, i) => {
                  if (i === 0) {
                      return <strong key={i}> {cat},</strong>
                  } else if (i === 1) {
                      return <strong key={i}> {cat} </strong>
                  }
                })
            }
            и {props.sortedCats.length - 2}{getCatsText(props.sortedCats.length - 2)}
            </span>
            }
        </section>
    )
}
export default SavedNewsHeader;
