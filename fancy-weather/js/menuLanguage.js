import { display } from './display';
import * as GLOBALS from './globals';
import { settings } from './userData';
import { ticker } from './ticker';

export const languageMenu = document.createElement('div');
languageMenu.classList.add('language-menu');

const languageButton = document.createElement('button');
languageButton.classList.add('button', 'drop-down-menu__face-button');
languageMenu.appendChild(languageButton);

export const languageButtonText = document.createElement('span');
languageButton.appendChild(languageButtonText);

const arrowDown = document.createElement('span');
arrowDown.classList.add('arrow-down');
languageButton.appendChild(arrowDown);

const menu = document.createElement('div');
menu.classList.add('drop-down-menu');

export const menuItems = {
  [GLOBALS.languages.english]: document.createElement('button'),
  [GLOBALS.languages.russian]: document.createElement('button'),
  [GLOBALS.languages.belarus]: document.createElement('button'),
};

Object.entries(menuItems).forEach(([key, item]) => {
  item.classList.add('drop-down-menu__item');
  item.classList.add('button');
  item.classList.add('inactive');
  // eslint-disable-next-line no-await-in-loop
  item.id = key;
  item.innerText = key;
  menu.appendChild(item);
});

languageMenu.appendChild(menu);

languageButton.addEventListener('click', () => {
  menu.classList.toggle('drop-down-menu--open');

  languageButton.classList.toggle('drop-down-menu__face-button--open');

  arrowDown.classList.toggle('arrow-down--open');
});

menu.addEventListener('click', (e) => {
  if (e.target.classList.contains('drop-down-menu__item')
    && e.target.classList.contains('inactive')) {
    settings.language = e.target.id;

    Object.values(menuItems).forEach((item) => {
      item.classList.add('inactive');
    });

    e.target.classList.remove('inactive');

    languageButtonText.innerText = e.target.id;

    display.drawSearchInput();
    display.drawMap();
    display.drawWeatherAndTicker();
  }
});
