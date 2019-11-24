import { settings, dictionary } from './globals';
import { display } from './display';

function processSearchQuery() {
  settings.location = searchInput.value;
  display.drawEverything();
  searchInput.value = '';
  searchInput.blur();
}

export const searchInput = document.createElement('input');
searchInput.classList.add('search-input');
searchInput.type = 'search';
searchInput.name = 'search-city';
searchInput.required = true;
searchInput.placeholder = dictionary.searchPlaceholder[settings.language];
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') processSearchQuery();
});

export const searchInputButton = document.createElement('button');
searchInputButton.classList.add('button', 'search-input__button');
searchInputButton.innerText = dictionary.search[settings.language];
searchInputButton.addEventListener('click', () => {
  if (searchInput.value.length !== 0) processSearchQuery();
});
