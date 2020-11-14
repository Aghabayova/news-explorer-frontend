export function declOfArticles(n, article_forms) {  
    article_forms = ['статья', 'статьи', 'статей']

    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return article_forms[2]; }
    if (n1 > 1 && n1 < 5) { return article_forms[1]; }
    if (n1 === 1) { return article_forms[0]; }

    return article_forms;

    console.log(article_forms[0]);
}


function declOfNum(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}




