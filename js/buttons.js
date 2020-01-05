import { display } from './display';
import * as GLOBALS from './globals';
import { settings } from './userData';
import * as utilities from './utilities';

function toggleButtons() {
  fahrenheitButton.classList.toggle('inactive');
  celsiusButton.classList.toggle('inactive');
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
    display.drawWeatherAndTicker();
    toggleButtons();
  }
});
celsiusButton.addEventListener('click', () => {
  if (settings.units === GLOBALS.units.imperial) {
    settings.units = GLOBALS.units.si;
    display.drawWeatherAndTicker();
    toggleButtons();
  }
});

export const updateButton = document.createElement('button');
updateButton.classList.add('button', 'button--update');

const spinner = document.createElement('div');
spinner.classList.add('spinner');

updateButton.appendChild(spinner);

updateButton.addEventListener('click', () => {
  utilities.triggerAnimation(spinner);
  display.drawBG();
});
