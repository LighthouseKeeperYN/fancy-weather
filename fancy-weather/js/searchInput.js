import { dictionary } from './globals';
import { display } from './display';
import { settings } from './userData';

export function processSearchQuery() {
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
