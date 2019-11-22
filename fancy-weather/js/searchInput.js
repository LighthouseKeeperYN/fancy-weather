export const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.name = 'search-city';
searchInput.classList.add('search-input');
searchInput.placeholder = 'Search city or ZIP';

export const searchInputButton = document.createElement('button');
searchInputButton.classList.add('button', 'search-input__button');
searchInputButton.innerText = 'Search';
