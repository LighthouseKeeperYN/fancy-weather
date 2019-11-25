import { display } from './display';
import * as GLOBALS from './globals';
import { settings } from './userData';

function toggleButtons() {
  fahrenheitButton.classList.toggle('inactive');
  celsiusButton.classList.toggle('inactive');
}

function triggerAnimation(el) {
  el.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight;
  el.style.animation = null;
}

export const fahrenheitButton = document.createElement('button');
fahrenheitButton.classList.add('button', 'button--f');
fahrenheitButton.innerText = '°F';

export const celsiusButton = document.createElement('button');
celsiusButton.classList.add('button', 'button--c');
celsiusButton.innerText = '°C';

fahrenheitButton.addEventListener('click', () => {
  if (settings.units === GLOBALS.units.si) {
    settings.units = GLOBALS.units.imperial;
    display.drawWeather();
    toggleButtons();
  }
});
celsiusButton.addEventListener('click', () => {
  if (settings.units === GLOBALS.units.imperial) {
    settings.units = GLOBALS.units.si;
    display.drawWeather();
    toggleButtons();
  }
});

export const updateButton = document.createElement('button');
updateButton.classList.add('button', 'button--update');

const spinner = document.createElement('div');
spinner.classList.add('spinner');

updateButton.appendChild(spinner);

updateButton.addEventListener('click', () => {
  triggerAnimation(spinner);
  display.drawBG();
});
