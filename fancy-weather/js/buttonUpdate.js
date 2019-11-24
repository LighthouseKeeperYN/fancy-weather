import { display } from './display';

export const updateButton = document.createElement('button');
updateButton.classList.add('button', 'button--update');

const spinner = document.createElement('div');
spinner.classList.add('spinner');

updateButton.appendChild(spinner);

updateButton.addEventListener('click', () => {
  display.drawWeather();
});
