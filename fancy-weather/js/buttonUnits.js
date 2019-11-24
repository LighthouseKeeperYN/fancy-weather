import { settings, units } from './globals';
import { display } from './display';

export const fahrenheitButton = document.createElement('button');
fahrenheitButton.classList.add('button', 'button--f', 'inactive');
fahrenheitButton.innerText = '°F';

export const celsiusButton = document.createElement('button');
celsiusButton.classList.add('button', 'button--c');
celsiusButton.innerText = '°C';

function toggleButtons() {
  fahrenheitButton.classList.toggle('inactive');
  celsiusButton.classList.toggle('inactive');
}

fahrenheitButton.addEventListener('click', e => {
  if (settings.units === units.si) {
    settings.units = units.imperial;
    display.drawWeather();
    toggleButtons();
  }
})
celsiusButton.addEventListener('click', e => {
  if (settings.units === units.imperial) {
    settings.units = units.si;
    display.drawWeather();
    toggleButtons();
  }
})
