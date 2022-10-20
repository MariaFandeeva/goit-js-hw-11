import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
  const name = inputEl.value.trim();
  if (name === '') {
    return (listEl.innerHTML = ''), (infoEl.innerHTML = '');
  }
  fetchCountries(name)
    .then(countries => {
      listEl.innerHTML = '';
      infoEl.innerHTML = '';

      if (countries.length === 1) {
        infoEl.insertAdjacentHTML('beforeend', markupCountry(countries));
      } else if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else {
        listEl.insertAdjacentHTML('beforeend', markupList(countries));
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function markupList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class = "country-list_item">
      <img class = "list-item_flag" src = "${flags.svg}" alt = "Flag of ${name.official}">
        <h2 class = "list-item_name">${name.official}</h2>
        </li>`;
    })
    .join('');

  listEl.insertAdjacentHTML('afterbegin', markup);
  return markup;
}
function markupCountry(countries) {
  const markupOneCountry = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<ul class = "country-info_list">
        <li class = "country-info_item">
        <img class = "info_item-flag" src = "${flags.svg}" alt = "Flag of ${
        name.official
      }">
        <h2 class = "info_item-name">${name.official}</h2>
        </li>
        <li class = "country-info_item"><span class = "info_item-description">Capital:</span>${capital}</li>
        <li class = "country-info_item"><span class = "info_item-description">Population:</span>${population}</li>
        <li class = "country-info_item"><span class = "info_item-description">Languages:</span>${Object.values(
          languages || {}
        ).join(',')}</li>
        </ul>`;
    })
    .join('');
  return markupOneCountry;
}
