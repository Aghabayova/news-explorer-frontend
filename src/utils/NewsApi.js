import configData from '../utils/Config';

export default function getNewsApi(params) {

  const date = new Date();
  const todayDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');
  date.setDate(date.getDate() - 7);
  const startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
    + '-' + date.getDate().toString().padStart(2, '0');

  const urlApi = configData.newsApiUrl
    + `apiKey=${configData.newsApiKey}&`
    + `q=${params}&`
    + `to=${todayDate}&`
    + `from=${startDate}&`
    + `pageSize=100`;
  return fetch(urlApi,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => response)
    .catch(error => error);

}