import { settings, dictionary } from './globals';

export const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.name = 'search-city';
searchInput.classList.add('search-input');
searchInput.placeholder = dictionary.searchPlaceholder[settings.language];

export const searchInputButton = document.createElement('button');
searchInputButton.classList.add('button', 'search-input__button');
searchInputButton.innerText = dictionary.search[settings.language];
