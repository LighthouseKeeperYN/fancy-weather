import { settings } from './userData';
import { display } from './display';

export const languageMenu = document.createElement('div');
languageMenu.classList.add('language-menu');

const languageButton = document.createElement('button');
languageButton.classList.add('button', 'drop-down-menu__face-button');
languageMenu.appendChild(languageButton);

const languageButtonText = document.createElement('span');
languageButtonText.innerText = settings.language;
languageButton.appendChild(languageButtonText);

const arrowDown = document.createElement('span');
arrowDown.classList.add('arrow-down');
languageButton.appendChild(arrowDown);

const menu = document.createElement('div');
menu.classList.add('drop-down-menu');

const menuItems = {
  en: document.createElement('button'),
  ru: document.createElement('button'),
  be: document.createElement('button')
};

Object.entries(menuItems).forEach(([key, item]) => {
  item.classList.add('drop-down-menu__item');
  item.classList.add('button')
  item.classList.add('inactive');
  item.id = key;
  item.innerText = key;
  menu.appendChild(item);
});
menuItems.en.classList.remove('inactive');

languageMenu.appendChild(menu);

languageButton.addEventListener('click', function openMenu() {
  menu.classList.toggle('drop-down-menu--open');

  languageButton.classList.toggle('drop-down-menu__face-button--open');
  // languageButton.classList.toggle('drop-down-menu__face-button--close');
});

menu.addEventListener('click', function chooseLanguage(e) {
  if (e.target.classList.contains('drop-down-menu__item')
    && e.target.classList.contains('inactive')) {
    settings.language = e.target.id;

    Object.values(menuItems).forEach(item => {
      item.classList.add('inactive');
    });

    e.target.classList.remove('inactive');

    languageButtonText.innerText = e.target.id;

    display.drawSearchInput();
    display.drawMap()
    display.drawWeather();
  }
});